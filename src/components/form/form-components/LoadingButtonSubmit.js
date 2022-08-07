import { LoadingButton } from '@mui/lab'

function LoadingButtonSubmit({value}){
    return(
        <LoadingButton
            variant='contained'
            fullWidth
            type='submit'
            sx={{ py: '2vh', mt: '1.2vh' }}
        >
            {value}
        </LoadingButton>
    )
}
export default LoadingButtonSubmit