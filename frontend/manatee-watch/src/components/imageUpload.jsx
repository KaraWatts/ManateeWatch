import React, {useState} from "react";
import ReactImagePickerEditor from 'react-image-picker-editor'
import 'react-image-picker-editor/dist/index.css'

function ImageUpload() {

    const [imageSrc, setImageSrc] = useState("");


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
      console.log(imageSrc)
  return (
    <div className="imageUpload">
      <ReactImagePickerEditor
            config={config2}
            imageSrcProp={initialImage}
            imageChanged={(newDataUri) => { setImageSrc(newDataUri) }} />
    </div>
  );
}

export default ImageUpload;
