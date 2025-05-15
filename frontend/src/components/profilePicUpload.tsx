import React, { useRef, useState } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import AvatarEditor from 'react-avatar-editor';
import { api } from './utilities';
import { Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


function ImageUploadAndCrop({
  profile_picture
}: any) {
    const [image, setImage] = useState(null);
    const [profilePic, setProfilePic] = useState(profile_picture)
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    const editorRef = useRef();
    // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
    const user = JSON.parse(localStorage.getItem("user"));
    const {profileId} = useParams()
  
    const onSelectFile = (e: any) => {
      if (e.target.files && e.target.files.length > 0) {
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        setImage(URL.createObjectURL(e.target.files[0]));
      }
    };
  
    const handleSave = () => {
      if (editorRef.current) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
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
  // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
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
  