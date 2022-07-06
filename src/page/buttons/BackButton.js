import {Link } from 'react-router-dom'

function BackButton(){
    return(
        <div>
            <Link to='/colors'>
                <button 
                    className="button"
                    style={{margin:15}}
                >Back</button>
            </Link>
        </div>
    )
}

export default BackButton