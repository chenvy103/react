import {Routes, Route, Link } from 'react-router-dom'
import EditColor from '../../page/EditColor'
import { lowerCase } from '../filters/colors'
import Modal from '../../page/modal/Modal'
import DeleteModal from '../../page/modal/DeleteModal'

function ColorItem({id, name}){
    
    const dataName = 'delete'
    const dataButton = 'X'
    const dataContent = <DeleteModal value={id}/>

    const modalData = {dataName, dataButton, dataContent}

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
                
                <Modal value={modalData}/>
            </td>
            <Routes>
                <Route path={`/colors/${id}`} element={<EditColor/>}/>
            </Routes>
        </tr >
        
    )

}

export default ColorItem