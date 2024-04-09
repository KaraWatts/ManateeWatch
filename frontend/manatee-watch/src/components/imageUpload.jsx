import React, {useState} from "react";

function ImageUpload() {

    const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </>
  );
}

export default ImageUpload;
