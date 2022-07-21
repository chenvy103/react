import { Link } from "react-router-dom"
function Homepage(){
    return(
        <>
            <h1>Welcome!</h1>
            <Link to='/Manager'>User Management Tab</Link>
        </>
    )
}

export default Homepage