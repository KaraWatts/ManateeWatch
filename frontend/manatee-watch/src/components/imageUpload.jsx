import React, {useState} from "react";
import ReactImagePickerEditor from 'react-image-picker-editor'
import 'react-image-picker-editor/dist/index.css'
import Button from "react-bootstrap/Button";
import { api } from "./utilities";
import { useNavigate } from 'react-router-dom';
import PopupModerator from "./popupModerator";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green, lightBlue } from '@mui/material/colors';


function ImageUpload() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonSx = {
    ...(success && {
      color: "green[500]",
      '&:hover': {
        color: "green[700]",
      },
    }),
  };
  
    const [imageSrc, setImageSrc] = useState("");
    const navigate = useNavigate();
    const [imageOK, setImageOK] = useState(false)


    const config2 = {
        borderRadius: '8px',
        language: 'en',
        width: '330px',
        height: '250px',
        objectFit: 'contain',
        compressInitial: 50,
        hideDownloadBtn: true,
        hideAddBtn: true,
      };

      const initialImage = '';
      
    const submitImage = async(e) => {
        e.preventDefault();
        setSuccess(false);
        setLoading(true);
        try{
          const response = await api.post("/sightings/submitImage/", { url: imageSrc})
          console.log('successfuly uploaded image', response.content);
          navigate('/sightingData/', {state: { imageSrc }})

        } catch (response){
          console.log('successfuly uploaded image:', "Innapropriate content warning!")
          setImageOK(true)
        }
        setSuccess(true);
        setLoading(false);
      }; 

  return (
    <>
      <div className="imageUpload">
      <PopupModerator setAlert={setImageOK} alert={imageOK}/>
      <ReactImagePickerEditor
            config={config2}
            imageSrcProp={initialImage}
            imageChanged={(newDataUri) => { setImageSrc(newDataUri) }} />
    </div>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          // variant="contained"
          sx={{color: lightBlue}}
          disabled={loading}
          onClick={submitImage}
        >
          Submit Photo
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[800],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </>
    
  );
}

export default ImageUpload;
