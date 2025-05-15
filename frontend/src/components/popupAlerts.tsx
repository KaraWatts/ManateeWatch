import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export default function PopupAlert({
  setAlert,
  alert
}: any) {
    const navigate = useNavigate()

  const handleSignup = () => {
    navigate('/signup/')
    setAlert(false);
  };

  const handleLogin = () => {
    navigate('/login/')
    setAlert(false)
  }

  const handleClose = () => {
    setAlert(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={alert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Restricted Access: Login Required"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You must have an active account to access this section. 
            Please log in or create an account for free!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin}>Log In</Button>
          <Button onClick={handleSignup} autoFocus>
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}