import {Box, Typography, Grid} from '@mui/material';
import FormSignUp from '../components/form/FormSignUp';
//import Datetime from './Datetime';
import Pic from "../illustration-signup.jpeg"
import React from 'react';
import { useParams, useNavigate } from "react-router-dom";

import {getInvitation} from '../service/RegisterService'
  
function SignUpPage(){
  const [time,setTime] = React.useState('')
  const { invitationToken } = useParams();
  const navigate = useNavigate();

  
  React.useEffect(()=>{
    (async () => {
      const data = await getInvitation(invitationToken)
      if(data.success == true){
        console.log(data)
        const timer = data.data['expiresAt']
        setTime(timer)
      } else {
        navigate('/*')
      }
   })()
  },[])


  return (
    <div style={{overflow: 'hidden'}}>
    <Grid container>
      <Grid item md={6}>
        <Box component="img" src={Pic} alt='pic' sx={{maxWidth: '100%', height: '100vh'}}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ maxWidth: '50%', margin: 'auto' }} >
          <Typography variant='h3' component='h2' sx={{ m: '2vh 0' , color:'DodgerBlue' , fontWeight: 'bold'} }>
            Sign Up
          </Typography>
          <Typography variant='p' component='p' sx={{ mb: '4vh' }}>
            Welcome to <b>the TNF Cloud !</b> <br/>
            Please enter your email and password to register!
          </Typography>
          <Typography variant='p' component='p' sx={{ mb: '2vh' }}>
            This invitation link expires on <b> {time} </b>
          </Typography>
          <FormSignUp/>
        </Box>
      </Grid>
    </Grid>
    </div>
  );
};

export default SignUpPage;
  
