import React, {useState} from "react";
import ReactImagePickerEditor from 'react-image-picker-editor'
import 'react-image-picker-editor/dist/index.css'
import Button from "react-bootstrap/Button";
import { api } from "./utilities";
import { useNavigate } from 'react-router-dom';

function ImageUpload() {

    const [imageSrc, setImageSrc] = useState("");
    const navigate = useNavigate();


    const config2 = {
        borderRadius: '8px',
        language: 'en',
        width: '330px',
        height: '250px',
        objectFit: 'contain',
        compressInitial: 10,
        hideDownloadBtn: true,
        hideAddBtn: true,
      };

      const initialImage = '';
      
    const submitImage = async(e) => {
        e.preventDefault();
        try{
          const response = await api.post("/sightings/", { url: imageSrc})
          console.log('successfuly uploaded image', response.content);
          navigate('/sightingData/', {state: { imageSrc }})
        } catch (response){
          console.log('successfuly uploaded image:', "Innapropriate content warning!")
        }
      }; 

  return (
    <>
      <div className="imageUpload">
      <ReactImagePickerEditor
            config={config2}
            imageSrcProp={initialImage}
            imageChanged={(newDataUri) => { setImageSrc(newDataUri) }} />
    </div>
      <Button onClick={submitImage}>Next</Button>
    </>
    
  );
}

export default ImageUpload;
