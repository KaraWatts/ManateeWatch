import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function PopupModerator({
  setAlert,
  alert
}: any) {

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
        <DialogTitle style={{textAlign:"center"}} id="alert-dialog-title">
          {"Manatees Only Please!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Our virtual moderator detected non-manatee figures in your picture. We like to let the manatees hog the spotlight here, please try again. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Try Again</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}