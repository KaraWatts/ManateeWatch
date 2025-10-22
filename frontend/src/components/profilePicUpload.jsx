import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { api } from './utilities';
import { Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


function ImageUploadAndCrop({ profile_picture }) {
    const [image, setImage] = useState(null);
    const [profilePic, setProfilePic] = useState(profile_picture)
    const editorRef = useRef();
    const user = JSON.parse(localStorage.getItem("user"));
    const {profileId} = useParams()
  
    const onSelectFile = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setImage(URL.createObjectURL(e.target.files[0]));
      }
    };
  
    const handleSave = () => {
      if (editorRef.current) {
        const canvasScaled = editorRef.current.getImageScaledToCanvas();
        const croppedImage = canvasScaled.toDataURL('image/png');
        const postImage = async () => {
          try {
            const response = await api.put("profile/", {profile_picture: croppedImage});
            console.log('successfully pushed picture', response.data);
            
            setImage(null)
            setProfilePic(croppedImage)
          } catch (error) {
            console.error('error while uploading data', error);
          }
        };
      
        postImage();
      }
    };
    console.log("IMAGE UPLOAD:", user.id, profileId)
    return (
      <div>
  {profilePic ? (
    <Image
      src={profilePic}
      alt='profile_photo'
      fluid
    />
  ) : (user.id === parseInt(profileId)) && (
    <>
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
    </>
  )}
</div>
    );
  }
  
  export default ImageUploadAndCrop;
  