import {Box, Typography, Grid} from '@mui/material';
import FormSignUp from '../form/FormSignUp';
//import Datetime from './Datetime';
import Pic from "../illustration-signup.jpeg"
import React from 'react';

import {getInvitation} from '../features/RegisterService'
  
function SignUpPage(){
  const [time,setTime] = React.useState('')
  
  React.useEffect(()=>{
    (async () => {
      const data = await getInvitation()
      if(data){
        console.log(data)
        const timer = data['expiresAt']
        setTime(timer)
      }
   })()
  },[])


  return (
    <Grid container >
      <Grid item md={6}>
        <Box component="img" src={Pic} alt='pic' sx={{maxWidth: '100%'}}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ maxWidth: '60%', margin: 'auto' }} >
          <Typography variant='h2' component='h2' sx={{ m: '2vh 0' , color:'DodgerBlue' , fontWeight: 'bold'} }>
            Sign Up
          </Typography>
          <Typography variant='p' component='p' sx={{ mb: '4vh' }}>
            Welcome to <b>the TNF Cloud !</b> <br/>
            Please enter your email and password to register!
          </Typography>
          <Typography variant='p' component='p' sx={{ mb: '2vh' }}>
            This invitation link express on <b> {time} </b>
          </Typography>
          <FormSignUp/>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
  
