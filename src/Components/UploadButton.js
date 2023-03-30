import React, { useState, useRef } from "react";

import { Container, Image, Form, Button } from "react-bootstrap";

const UploadButton = (props) => {
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [image, setImage] = useState(null);
  const inputRef = useRef(HTMLInputElement);
  
  let imageId = 'upload-image-post';

  if (props.profile === true) {
    imageId = 'upload-image-profile'
  }

  const handleUpload = () => {
    inputRef.current?.click();
    
  };
  const handleDisplayFileDetails = () => {
    try {
      inputRef.current?.files && 
      setUploadedFileName(inputRef.current.files[0].name);
      setImage(URL.createObjectURL(inputRef.current.files[0]));
      props.upload(inputRef.current.files[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container id="upload-button">
        <Form.Check name="image" ref={inputRef} onChange={handleDisplayFileDetails} className="d-none" type="file" accept="image/*"></Form.Check>
        <Button id="actual-button" onClick={handleUpload} variant={uploadedFileName ? "success" :"primary"}>{uploadedFileName ? "Upload Successful" : "Upload Image"}</Button>
        { image !== null ? <Image src={image} alt="post" id={imageId} fluid="true"/> : <span></span> }
        { (image === null && props.pp) && <Image src={props.pp} alt="post" id={imageId} fluid="true"/>}
    </Container>
  );
}

export default UploadButton;

