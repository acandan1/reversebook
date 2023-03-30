import React, { useEffect, useState } from "react";

import Post from "./Post";

import person from '../media/person.svg';
import robot from '../media/robot.jpg';

import { Container, Spinner } from 'react-bootstrap';

const Feed = () => {
    const [data, setData] = useState("loading");
    const [images, setImages] = useState("");
    const [profilePictures, setProfilePictures] = useState("");

    const getData = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };

        fetch(`${process.env.REACT_APP_API_URL}/posts`, requestOptions)
            .then(response => response.json())
            .then((d) => {
                console.log(d);
                if (d.result.length >= 1) {
                    setData(d.result);
                } else {
                    setData("empty");
                }
                setImages(d.imgs);
                setProfilePictures(d.profile_pics);
            });
    }

    useEffect(() => {
        if (data === "loading") {
            getData();
        }
    })

    return (
        <Container fluid className="feed">
            {
                (data !== "empty" && data === "loading") && <Spinner id="big-spinner" animation="border" variant="primary" style={{ width: "4rem", height: "4rem" }}/>
            }

            { (data !== "empty" && data !== "loading") && data.map(d => (<Post key={d._id} personId={d.user._id} likes={d.likes} postId={d._id} personImg={profilePictures[data.indexOf(d)]} personName={`${d.user.first_name} ${d.user.last_name}`} date={d.timestamp} text={d.text} postImg={images[data.indexOf(d)]}/>)) }

            {data === "empty" && <h1>No posts at this time</h1> }

        </Container>
    )
}

export default Feed;
