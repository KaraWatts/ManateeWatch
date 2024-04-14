import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

function ImageUploadAndCrop() {
    const [image, setImage] = useState(null);
    const editorRef = useRef();
  
    const onSelectFile = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setImage(URL.createObjectURL(e.target.files[0]));
      }
    };
  
    const handleSave = () => {
      if (editorRef.current) {
        const canvasScaled = editorRef.current.getImageScaledToCanvas();
        const croppedImage = canvasScaled.toDataURL('image/png');
        // Do something with croppedImage (e.g., upload to server)
        ;
      }
    };
  
    return (
      <div>
        <input type="file" onChange={onSelectFile} />
        {image && (
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={250}
            height={250}
            border={50}
            borderRadius={125}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1}
          />
        )}
        <button onClick={handleSave}>Save</button>
      </div>
    );
  }
  
  export default ImageUploadAndCrop;
  