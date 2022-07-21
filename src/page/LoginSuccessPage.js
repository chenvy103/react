import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../redux/userSlice';
import {useNavigate} from 'react-router-dom';

function LoginSuccessPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.userInfo)
    
    React.useEffect(()=>{
        dispatch(getUser())

        /*
        (async()=>{
            const data = await getCurrentUser()
            if (data.success == true) {
                setStatus(data.success)
                setUser(data.data)
            }
        })()
        */
    },[])
    console.log('account',user)
    if(user) {
        console.log('ok',user)
        navigate('/Home')
    }

    return(
        <h1>Error</h1>
    )
}

export default LoginSuccessPage