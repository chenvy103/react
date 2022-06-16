//fake in-memory REST API
import { Server, Model, Factory, hasMany, RestSerializer } from 'miragejs'

import {faker} from '@faker-js/faker'
import seedrandom from 'seedrandom'

const IdSerializer = RestSerializer.extend({
  serializeIds: 'always'
})

// get a consistent set of users or entries each time the page loads.
// reset by deleting this localStorage value | turn off 'useSeededRNG' to false
let useSeededRNG = false

//a seeded random number generator
let rng = seedrandom()

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem('randomTimestampSeed')
  let seedDate

  if (randomSeedString) {
    seedDate = new Date(randomSeedString)
  } else {
    seedDate = new Date()
    randomSeedString = seedDate.toISOString()
    localStorage.setItem('randomTimestampSeed', randomSeedString)
  }

  rng = seedrandom(randomSeedString)
  faker.seed(seedDate.getTime())
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(rng() * (max - min + 1)) + min
}

const randomFromArray = (array) => {
  const index = getRandomInt(0, array.length - 1)
  return array[index]
}

const todoTemplates = [
  { base: '', values: [] },
]

const generateTodoText = () => {
  const template = randomFromArray(todoTemplates)
  const value = randomFromArray(template.values)
  const text = template.base.replace('$THING', value)
  return text
}

new Server({
  routes() {
    this.namespace = 'fakeApi'
    this.timing = 0

    this.resource('todos')
    this.resource('lists')

    const server = this

    this.post('/todos', function (schema, req) {
      const data = this.normalizedRequestAttrs()

      if (data.text === 'error') {
        throw new Error('Could not save the todo!')
      }

      const result = server.create('todo', data)
      return result
    })
  },
  models: {
    todo: Model.extend({}),
    list: Model.extend({
      todos: hasMany(),
    }),
  },
  factories: {
    todo: Factory.extend({
      id(i) {
        return Number(i)
      },
      text() {
        return generateTodoText()
      },
      completed() {
        return false
      },
      color() {
        return ''
      },
    }),
  },
  serializers: {
    todo: IdSerializer.extend({
      serialize(object, request) {
        // store integer IDs as strings
        const numerifyId = (todo) => {
          todo.id = Number(todo.id)
        }
        let json = IdSerializer.prototype.serialize.apply(this, arguments)

        if (json.todo) {
          numerifyId(json.todo)
        } else if (json.todos) {
          json.todos.forEach(numerifyId)
        }

        return json
      },
    }),
    list: IdSerializer,
  },
  seeds(server) {
    server.createList('todo', 0)
  }
})
