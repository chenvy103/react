import * as React from 'react';
import {IconButton,Avatar,ClickAwayListener,Grow,Paper,Popper,MenuList,Divider,Typography} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux'

import {logoutUser} from '../../redux/userSlice'
import {logout} from '../../service/LogoutService'

import Item from './menu-components/Item';

import Swal from "sweetalert2";
import { createInvite } from '../../service/InviteService';


export default function MenuListComposition() {
  const user = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()

  const handleLogout = async() =>{
    await logout()
    dispatch(logoutUser())
  }

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
/*
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => {setOpenDialog(true)}
  const handleCloseDialog = () => {setOpenDialog(false)}
*/
  const showSweetAlert = () =>{
    handleToggle();
    Swal.fire({
      title: 'Which role do you want to invite?',
      input: 'select',
      inputOptions: {
        0: 'Member',
        1: 'System Manager'
      },
    })
    .then(async(value) =>{
      const data = await createInvite(value.value)
      console.log('d', data)
      Swal.fire('time',`http://localhost:3000/register/${data.data['invitationToken']}`,'info');
    })
  }

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event) => {
/*
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
*/
    setOpen(false);
  };
/*
  function handleListKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }
*/
/*
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);
*/

  return (
    <div style={{float: 'right', marginRight: 20}}>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar>{user.name.toLowerCase().slice(0,1)}</Avatar>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  //onKeyDown={handleListKeyDown}
                >
                  <Typography component='p' sx={{textAlign:'center', p:'2vh'}}>
                    <b>{user.name}</b> <br/> {user.email}
                  </Typography>

                  <Divider />
                  { user.isAdmin ? (
                    <Item
                      icon={<GroupIcon />}
                      text='Create new invitation'
                      onClick={showSweetAlert}
                    />
                    ) : null 
                  }
                    
                  <Item 
                    icon={<LogoutIcon />}
                    text='Logout'
                    onClick={handleLogout}
                  />
                  
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

//<OptionalRoleDialog open={openDialog} onClose={handleCloseDialog}/>
