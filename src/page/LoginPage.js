import {Box, Typography} from '@mui/material'
import { useForm } from 'react-hook-form'
import React from 'react'
import { yupResolver  } from '@hookform/resolvers/yup'
import {registerSchema} from '../validate/registerSchema'
import InputText from '../form-components/InputText'
import LoadingButtonSubmit from '../form-components/LoadingButtonSubmit'
import {showError} from '../validate/validateUtils'
import {useNavigate} from 'react-router-dom';

import {login} from '../features/LoginService'

function LoginPage(){
    const navigate = useNavigate();
    const [mess, setMess] = React.useState(null)

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const onSubmitHandler = async(values) => {
        const data = await login(values)
        console.log(data)
        
        if(data.success == true){
            console.log(data.data)
            setMess(null)
            reset()
            navigate('/Loading')

        } else {
            console.log(data);
            data.error ? showError(data.error, setError) : setMess(data.message)
        }
    }
    

    return(
        <>
            <Box
                component='form'
                noValidate
                autoComplete='off'
                sx={{ width: '400px', margin: 'auto', mt:'50px' }}
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <Typography component={'span'} sx={{ mb: '2vh', color:'red' }}>
                    {(Object.keys(errors).length !== 0) ? <p><b>Input error! </b> Please check your email address and password </p>: null}
                    {(mess == null) ? null : <p>{mess}</p>}
                </Typography>

                <InputText name={register('email')} label='Email' type='email' error={errors['email']} />
                <InputText name={register('password')} label='Password' type='password' error={errors['password']} />

                <LoadingButtonSubmit value='Login' />
            </Box>
        </>

    )
}

export default LoginPage