import {useState} from 'react'
import { useDispatch } from 'react-redux'
import {addColor} from '../../features/colors/colorsSlice'


function CreateModal(){
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    return(
        <div>
            <main className="modal-body">
                <input
                    className="new-todo"
                    placeholder="Enter color name"
                    value={text}
                    autoFocus={true}
                    onChange={(e) => {setText(e.target.value)}}
                    required
                />
            </main>
            <footer className="modal-footer">
                <button 
                    style={{float:'right'}}
                    onClick={()=>{dispatch(addColor(text))}} 
                    className="buttonModal"
                >Create
                </button>
            </footer>

        </div>
    )
}

export default CreateModal