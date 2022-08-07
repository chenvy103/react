import FormLogIn from "../components/form/FormLogIn"
import {Box, Typography, Link, Paper, CssBaseline, Container} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function LoginPage(){
    const theme = createTheme();

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
        
            <Container maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Box>
                <Typography variant='h4' component='h2' sx={{ m: '2vh 0' , color:'DodgerBlue' , fontWeight: 'bold'} }>
                    Welcome to TNF Cloud
                </Typography>
                <Typography variant='p' component='p' sx={{ mb: '4vh' }}>
                    Enter your email and password to sign in
                </Typography>
                <FormLogIn/>
                <Typography variant='p' component='p' sx={{ mt: '3vh' }}>
                    If you have an ivitation code 
                    <Link href="/register" underline="none" sx={{fontWeight: 'bold'}}> Register </Link>
                    <br/>
                    Contact t the Administrator to get an account.
                </Typography>
                
            </Box>
            </Paper>
            </Container>
        </ThemeProvider>
    )
}

export default LoginPage