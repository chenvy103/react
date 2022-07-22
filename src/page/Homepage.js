import { Link } from "react-router-dom"
import { LoadingButton } from '@mui/lab'
import { useSelector, useDispatch } from 'react-redux'
import {logoutUser} from '../redux/userSlice'
import {logout} from '../features/LogoutService'

function Homepage(){
    const user = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const handleLogout = async() =>{
        await logout()
        dispatch(logoutUser())
    }

    return(
        <>
            <LoadingButton 
                variant='contained' 
                sx={{float: 'right', mr: 10}}
                onClick={handleLogout}
            >
                Logout
            </LoadingButton>
            <h1>Welcome! {user.name}</h1>
            { user.isAdmin ? <Link to='/manager'>User Management Tab</Link> : ''}
            
        </>
    )
}

export default Homepage