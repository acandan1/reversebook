import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Post from "../Components/Post";

const DisplayPost = (props) => {
    const [data, setData] = useState("");
    const [image, setImage] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const {id} = useParams();

    const getData = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };

        console.log()

        fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, requestOptions)
        .then(response => response.json())
        .then((d) => {
            setData(d.result);
            setImage(d.img);
            setProfilePicture(d.profile_pic);
        });
    }



    useEffect(() => {
        if (data === "") {
            getData();
        }
    })

    return (
        <Container fluid id="display-post-container">
            <Header pp={props.pp}/>
            { data !== "" ? <Post key={data._id} personId={data._id} likes={data.likes}  displayPost={true} postId={data._id} personImg={profilePicture} personName={`${data.user.first_name} ${data.user.last_name}`} date={data.timestamp} text={data.text} postImg={image} /> : <Spinner id="big-spinner" animation="border" variant="primary" style={{ width: "4rem", height: "4rem" }}/>  }
        </Container>
    )
}

export default DisplayPost;