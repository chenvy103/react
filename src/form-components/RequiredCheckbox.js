import {Checkbox, FormControlLabel, Typography} from '@mui/material'

function RequiredCheckbox({name, error, text}){
    

    return(
        <FormControlLabel
            control={<Checkbox required />}
            {...name}
            label={
            <Typography component={'span'} color={error ? 'error' : 'inherit'}>
                {text}
            </Typography>
            }
        />

    )
}

export default RequiredCheckbox