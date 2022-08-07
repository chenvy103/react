import * as React from 'react';
import {Box,Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,NativeSelect,Select,FormControl,InputLabel} from '@mui/material';


export default function OptionalRoleDialog({open, onClose}) {
  const [role, setRole] = React.useState('member');

  return (
    <Dialog
      maxWidth='sm'
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Which role?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please choose a role you want to invite.
        </DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
        >
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <NativeSelect
                id="role"
                value={role}
                onChange={(e) =>{setRole(e.target.value)}}
              >
                <option value='member'>Member</option>
                <option value='admin'>System Manager</option>
              </NativeSelect>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
