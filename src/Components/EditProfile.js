import React, { useState } from "react";
import { Container, Form, Button, CloseButton} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import UploadButton from "./UploadButton";

const EditProfile = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState("");

    const handleImageUpload = (img) => {
        setImage(img);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const imageInput = e.target.querySelector('input[type="file"]');
        const formData = new FormData();
        if (imageInput.files[0] !== undefined) {
            formData.append('image', imageInput.files[0]);
        }
        formData.append('bio', e.target.bio.value);

        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: formData

        };

        fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, requestOptions)
            .then(response => response.json())
            .then((d) => {
                window.location.reload(false);
            });
    }

    const closeEditProfile = () => {
        const container = document.getElementsByClassName("edit-profile-container")[0];
        const form = document.getElementsByClassName("edit-profile-form")[0];
        form.reset();
        container.className = "edit-profile-container toggle-hidden";
    }   

    return (
        <Container className="edit-profile-container toggle-hidden">
            
            <Form className="edit-profile-form" onSubmit={handleSubmit}>
                <CloseButton onClick={closeEditProfile} id="close-button"></CloseButton>
                <UploadButton upload={handleImageUpload} profile={true} pp={props.pp}></UploadButton>
                <h1>{props.name}</h1>
                <Form.Control as="textarea" id="edit-profile-textarea" maxLength={100} name="bio" defaultValue={props.bio} required/>

                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )

}

export default EditProfile;