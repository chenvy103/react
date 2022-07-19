import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function InputText({ name, label, error, type }){

    return (
        <TextField
            {...name}
            sx={{ mb: '2vh' }}
            label={label}
            fullWidth
            //required
            type={type}
            error={!!error}
            helperText={error?.message}
            InputProps={error ? 
                {endAdornment:(
                    <InputAdornment position="end">
                        <ErrorOutlineIcon sx={{ color: "red" }}/>
                    </InputAdornment>)
                } : null}
        />
    );

}

export default InputText