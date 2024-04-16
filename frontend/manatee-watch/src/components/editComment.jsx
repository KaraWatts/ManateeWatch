import {useState, Fragment} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { api } from './utilities';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function EditComment({setComments, commentPosts, id}) {
    const [commentValue, setCommentValue] = useState(commentPosts[commentPosts.length - 1]['comment']);

const handleCommentChange = (e) => {
  setCommentValue(e.target.value);
};

const handleSave = async () => {
  try {
    console.log(commentValue)
    const response = await api.put(`sightings/${sightingId}/comment/${id}/`, { comment: commentValue });
    const updatedComments = commentPosts.filter(comment => comment.id !== id);

    setComments([...updatedComments, response.data])

    console.log(response.data)
    setOpen(false);
  } catch (error) {
    console.error("access denied", error);
  }
};

  const [open, setOpen] = useState(false);
  const { sightingId } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
    console.log(commentPosts[commentPosts.length - 1]['comment'])
  };
  const handleClose = () => {
    setOpen(false);
  };



  return (
    <Fragment >
      <button type="button" onClick={handleClickOpen} style={{ textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color:"blue" }}>Edit
</button>
  <BootstrapDialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={open}
    fullWidth={true}
    maxWidth={"md"}
  >
    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
      Edit Comment
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
    <DialogContent dividers>
      <TextField
        fullWidth
        multiline
        maxRows={3}
        value={commentValue}
        onChange={handleCommentChange}
      />
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleSave}>
        Save changes
      </Button>
    </DialogActions>
  </BootstrapDialog>
    </Fragment>
  );
}