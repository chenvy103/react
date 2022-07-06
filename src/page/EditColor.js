import BackButton from './buttons/BackButton'
import {useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {updateColor, selectColorById} from '../features/colors/colorsSlice'

function EditColor(){
    const {colorId} = useParams()
    const navigate = useNavigate()
    const color = useSelector(state => selectColorById(state, colorId))
    const [text, setText] = useState(color.name)
    const dispatch = useDispatch()


    const handleSubmit = () => {
        dispatch(updateColor({colorId, newName: text}))
        navigate('/colors')
    }

    return(
        <div className="App">
          <main>
            <section className="medium-container">
              <h2>Edit Color id {colorId}</h2>
              <div className="todoapp">
                <BackButton/>

                <div>
                  <input
                    style={{padding: 15, margin:10}}
                    value={text}
                    autoFocus={true}
                    onChange={(e) => {setText(e.target.value)}}
                  />
                  <button
                    className='button'
                    to='/colors'
                    onClick={handleSubmit}
                    >submit
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
    )
}

export default EditColor