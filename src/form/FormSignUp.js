import {Box, FormGroup, FormHelperText, Typography, Link} from '@mui/material'
import { useForm } from 'react-hook-form'
import React from 'react'
import { yupResolver  } from '@hookform/resolvers/yup'
import {registerSchema} from '../validate/registerSchema'
import InputText from '../form-components/InputText'
import RequiredCheckbox from '../form-components/RequiredCheckbox'
import LoadingButtonSubmit from '../form-components/LoadingButtonSubmit'
import {register as registerAsync} from '../features/RegisterService'
import {useNavigate} from 'react-router-dom';
import {showError} from '../validate/validateUtils'

function FormSignUp(){
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema)
  });
/*
  React.useEffect(() => {
    if (isSubmitSuccessful) {

      reset()
    };
  }, [isSubmitSuccessful])
*/
  const onSubmitHandler = async(values) => {
    const data = await registerAsync(values)
    console.log(data)
    
    if(data.success == true){
      console.log(data.data)
      reset()
      navigate('/Loading')
    } else {
      console.log(data);
      showError(data.error, setError, {passwordConfirmation : 'pwconfirm'});
    }
  }


  /*
  React.useEffect(() => {
    if (Object.keys(err).length !== 0) {
      Object.keys(err).map((key)=>{
        console.log(key,err[key][0])
        setError(key,{message: err[key][0]})
      })
    }

  }, [err])
  */


  return(
    <>
      <Box
        component='form'
        noValidate
        autoComplete='off' //suggest when inputting
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Typography component={'span'} sx={{ mb: '2vh', color:'red' }}>
          {(Object.keys(errors).length !== 0) ? <p><b>Input error! </b> Please check your inputs and make sure that they are all valid </p>: null}
          
        </Typography>

        <InputText name={register('name')} label='Name' error={errors['name']} />
        <InputText name={register('email')} label='Email' type='email' error={errors['email']} />
        <InputText name={register('password')} label='Password' type='password' error={errors['password']} />
        <InputText name={register('pwconfirm')} label='Password confirmation' type='password' error={errors['pwconfirm']} />
        
        <FormGroup>
          <RequiredCheckbox name={register('terms')} error={errors['terms']} text= {<p>I agree the <b>Terms and Conditions</b></p>} />
          
          <FormHelperText error={!!errors['terms']}>
            {errors['terms'] ? errors['terms'].message : ''}
          </FormHelperText>
        </FormGroup>

        <LoadingButtonSubmit value='Sign Up' />
        
      </Box>
      <Typography variant='p' component='p' sx={{ mt: '3vh' , textAlign: 'center'}}>
        Already have an account? 
        <Link href="/Login" underline="none" sx={{fontWeight: 'bold'}}> Sign In </Link>
      </Typography>
    </>
  )

}

export default FormSignUp