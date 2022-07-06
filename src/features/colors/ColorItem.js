import {Routes, Route, Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import EditColor from '../../page/EditColor'
import { lowerCase } from '../filters/colors'
import {deleteColor} from './colorsSlice'

function ColorItem({id, name}){
    const dispatch = useDispatch()
    return (
        
        <tr >
            <td>{id}</td>
            <td>
                <span 
                    className='color-block'
                    style={{background: lowerCase(name)}}
                ></span>
                {name}
            </td>
            <td>
                <Link to={`/colors/${id}`}>
                    <button>Edit</button>
                </Link>
            </td>
            <td>
                <button className="destroy" onClick={()=>{dispatch(deleteColor(id))}}>
                    &times;
                </button>
            </td>
            <Routes>
                <Route path={`/colors/${id}`} element={<EditColor/>}/>
            </Routes>
        </tr >
        
    )

}

export default ColorItem