import {useState} from 'react'
import {capitalize} from '../filters/colors'
import Modal from '../../page/modal/Modal'
import CreateModal from '../../page/modal/CreateModal'


function HeaderColors ({onChange}){
    const [text, setText] = useState('')

    const handleSubmit = () => {
        /*
        const findedColor = colorsObj.find(item => item.name === capitalize(text))
        console.log(findedColor.id)
        dispatch(getColors(findedColor.id))
        */
        onChange(capitalize(text))
        setText('')
    }

    const dataName = 'create'
    const dataButton = '+'
    const dataContent = <CreateModal/>

    const modalData = {dataName, dataButton, dataContent}



    return(
        <header>
            <Modal value={modalData}/>
            
            <form>
                <div style={{float:'left', padding:18}}>
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
            
        
        </header>
    )
}

export default HeaderColors