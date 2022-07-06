import {useState} from 'react'
import {Routes, Route, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CreateColor from '../../page/CreateColor'
import {getColors} from '../colors/colorsSlice'
import {capitalize} from '../filters/colors'


function HeaderColors ({value: colorsObj}){
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = () => {
        const findedColor = colorsObj.find(item => item.name === capitalize(text))
        console.log(findedColor.id)
        dispatch(getColors(findedColor.id))
        setText('')
    }


    return(
        <header>
            <Link to='/colors/create'>
            <button 
                className="button"
                style={{margin:15}}
            >
                +
            </button>
            </Link>
            
            <form>
                <div style={{float:'left', margin: 20}}>
                    <input
                        placeholder='What color are you looking for?'
                        type="text" 
                        value={text}
                        autoFocus={true}
                        onChange={(e) => {setText(e.target.value)}}
                        style={{width:'100%', padding:10}}
                        required
                    />
                </div>    
                
                <button 
                    className="button"
                    type="submit"
                    style={{margin:15}}
                    onClick={handleSubmit}
                >
                    Search
                </button>
            </form> 
            
        <Routes>
            <Route path='/colors/create' element={<CreateColor/>}/>
        </Routes>
        </header>
    )
}

export default HeaderColors