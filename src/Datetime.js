import {useState} from 'react'

function Datetime(){
    const [datetime, setDatetime] = useState()
    setInterval(() => {
        setDatetime(
           new Date().toLocaleString()
        )
    })
      
    return(
        <>{datetime}</>
    )
}
export default Datetime