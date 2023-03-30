import React, { useState } from "react";
import { Container, Form, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import UploadButton from "./UploadButton";

const CreatePost = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState("");

    const handleImageUpload = (img) => {
        setImage(img);
    }

    const showForm = (e) => {

        const form = document.getElementsByClassName("create-post-form")[0];
        form.className = "create-post-form";

        const btn = document.getElementById("create-post-button");
        btn.id = "hide-button";
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const imageInput = e.target.querySelector('input[type="file"]');
        const formData = new FormData();
        if (imageInput.files[0] !== undefined) {
            formData.append('image', imageInput.files[0]);
            console.log("hey");
        }
        formData.append('text', e.target.text.value);

        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: formData
        };

        fetch(`${process.env.REACT_APP_API_URL}/posts`, requestOptions)
        .then(response => response.json())
        .then((d) => {
            navigate(`/post/${d.post_id}`);
        });
    }

    return (
        <Container id="create-post-container">
            <Button onClick={ showForm } id="create-post-button">+ Create Post</Button>
            <Form className="create-post-form hide-form" onSubmit={handleSubmit}>
                <h1 id="signup-header">Create a new post!</h1> 
                <UploadButton upload={handleImageUpload}></UploadButton>

                <Form.Control as="textarea" id="create-post-textarea" maxLength={500} name="text" placeholder="What's on your mind?" required/>

                <Button variant="success" type="submit">
                    Create!
                </Button>
            </Form>
        </Container>
    )
}

export default CreatePost;

