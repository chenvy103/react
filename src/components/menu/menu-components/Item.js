import {MenuItem, ListItemIcon} from '@mui/material';

function Item ({icon, text, onClick}){
    return(
        <MenuItem onClick={onClick}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            {text}
        </MenuItem>
    )
}
export default Item