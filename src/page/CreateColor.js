import {useState} from 'react'
import {useDispatch} from 'react-redux'

import BackButton from './buttons/BackButton'
import {addColor} from '../features/colors/colorsSlice'


function CreateColor(){
    const [text, setText] = useState('')
    const dispatch = useDispatch()


    const handleKeyDown = e => {
        if (e.which === 13 && text) {
            console.log(text)
            dispatch(addColor(text))
            setText('')
        }
    }

    return(
        <div className="App">
          <main>
            <section className="medium-container">
              <h2>Create a new color</h2>
              <div className="todoapp">
                <BackButton/>
                <div>
                    <input
                      className="new-todo"
                      placeholder="Enter color name"
                      value={text}
                      autoFocus={true}
                      onChange={(e) => {setText(e.target.value)}}
                      onKeyDown={handleKeyDown}
                      required
                    />
                </div>
              </div>
            </section>
          </main>
        </div>
    )
}

export default CreateColor