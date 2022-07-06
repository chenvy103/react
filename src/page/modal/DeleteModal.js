import {useDispatch} from 'react-redux'
import {deleteColor} from '../../features/colors/colorsSlice'

function DeleteModal({value: id}){
    const dispatch = useDispatch()

    return(
        <div>
            <main className="modal-body">
                <p>Are you sure to delete item id {id}?</p>
            </main>
            <footer className="modal-footer">
                
                <button 
                    style={{float:'right'}}
                    onClick={()=>{dispatch(deleteColor(id))}} 
                    className="buttonModal"
                >Delete
                </button>
            </footer>
        </div>
        
    )
}

export default DeleteModal