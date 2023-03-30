import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Post from "../Components/Post";

import { Button, Container, Image, Spinner } from 'react-bootstrap';

import person from '../media/robot.jpg';
import edit from '../media/edit.svg';
import add from '../media/add-friend.png'
import remove from '../media/remove-friend.png'
import EditProfile from "../Components/EditProfile";
import giga from "../media/gigachad.jpg";

const UserProfile = (props) => {
    const { id } = useParams();
    const myId = localStorage.getItem('id');
    console.log(typeof(myId));

    
    const [data, setData] = useState("");
    const [posts, setPosts] = useState("");
    const [images, setImages] = useState("");
    const [pp, setPP] = useState("");
    const [profilePictures, setProfilePictures] = useState("");

    const handleEditProfile = () => {
        const container = document.getElementsByClassName("edit-profile-container")[0];
        container.className = "edit-profile-container";
    }

    const addFriend = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };

        fetch(`${process.env.REACT_APP_API_URL}/users/${id}/send-friend-request`, requestOptions)
            .then(response => response.json())
            .then((d) => {
                window.location.reload(false);
            });
    }

    const removeFriend = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };

        fetch(`${process.env.REACT_APP_API_URL}/users/${id}/remove-friend`, requestOptions)
            .then(response => response.json())
            .then((d) => {
                window.location.reload(false);
            });
    }

    const removeFriendRequest = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };

        fetch(`${process.env.REACT_APP_API_URL}/users/${id}/cancel-friend-request`, requestOptions)
            .then(response => response.json())
            .then((d) => {
                window.location.reload(false);
            });
    }

    const getData = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };

        fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, requestOptions)
            .then(response => response.json())
            .then((d) => {
                setData(d.result[0]);
                if (d.img.length > 1) {
                    setPP(`data:image/png;base64, ${d.img}`);
                } else {
                    setPP(giga);
                }
                getPosts();
            });
    }

    const getPosts = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };

        fetch(`${process.env.REACT_APP_API_URL}/users/${id}/posts`, requestOptions)
            .then(response => response.json())
            .then((d) => {
                setPosts(d.result);
                console.log(d);
                setImages(d.imgs);
                setProfilePictures(d.profile_pics);
            });
    }

    const checkFriends = () => {

        for (let friend of data.friends) {
            if (friend._id === myId) {
                return true;
            }
        }
        return false;

    }

    const checkRequests = () => {

        for (let friend of data.friend_requests) {
            if (friend === myId) {
                return true;
            }
        }
        return false;
    }


    useEffect(() => {
        if (data === "") {
            getData();
        }
    });

    return (
        <Container fluid id="profile-container">
            <Header pp={props.pp}/>
            { data !== "" 
                ?<Container fluid id="profile-top">
                    <Image src ={pp} alt="user" className="user-pp"></Image>
                    <h1>{`${data.first_name} ${data.last_name}`}</h1>
                    <p>{data.bio}</p>

                    { (myId === id)
                    && <Button variant="secondary" onClick={ handleEditProfile }>
                        <Image src={edit} id="edit-img"></Image>
                        Edit Profile</Button>
                    }

                    { (myId !== id && !checkRequests() && !checkFriends())
                    && <Button variant="primary" onClick={addFriend}>
                        <Image src={add} id="add-friend-img"></Image>
                        Send Friend Request</Button>
                    }

                    { (myId !== id && checkRequests() && !checkFriends() )
                    && <Button variant="warning" onClick={removeFriendRequest}>
                        <Image src={remove} id="remove-friend-img"></Image>
                        Cancel Friend Request</Button>
                    }

                    { (myId !== id && checkFriends() && !checkRequests() )
                    && <Button variant="warning" onClick={ removeFriend }>
                        <Image src={remove} id="remove-friend-img"></Image>
                        Remove Friend</Button>
                    }

                    <p className="friendcount">{data.friends.length} friends</p>

                    <hr className="black-lines"></hr>
                    <Container fluid id="user-feed">
                        {
                            posts !== ""
                            ? posts.map(d => (<Post key={d._id} personId={d._id} likes={d.likes} postId={d._id} personImg={profilePictures[posts.indexOf(d)]} personName={`${d.user.first_name} ${d.user.last_name}`} date={d.timestamp} text={d.text} postImg={images[posts.indexOf(d)]}/>))
                            : <Spinner id="big-spinner" animation="border" variant="primary" style={{ width: "4rem", height: "4rem" }}/>
                        }
                    </Container>

                </Container>
                :<Container fluid id="profile-top">
                </Container>}

                {(myId === id) && <EditProfile pp={pp} name={`${data.first_name} ${data.last_name}`} bio={data.bio}/>}
        </Container>
    )
}

export default UserProfile;



