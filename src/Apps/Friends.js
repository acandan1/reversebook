import React, { useEffect, useState } from "react";

import Header from "../Components/Header";
import FriendRequest from "../Components/FriendRequest";
import Friend from "../Components/Friend";

import { Alert, Container } from "react-bootstrap"

const Friends = (props) => {
    const [friends, setFriends] = useState("");
    const [friendRequests, setFriendRequests] = useState("");
    const [profilePics, setProfilePics] = useState("");
    const [requestProfilePics, setRequestProfilePics] = useState("");

    const getData = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };

        fetch(`${process.env.REACT_APP_API_URL}/friends`, requestOptions)
        .then(response => response.json())
        .then((d) => {
            console.log(d);
            setFriends(d.result[0].friends)
            setFriendRequests(d.result[0].friend_requests)
            setProfilePics(d.friends_profile_pics);
            setRequestProfilePics(d.friend_requests_profile_pics);
            console.log(d.result[0].friend_requests);
        });
    }

    useEffect(() => {
        if (friends === "") {
            getData();
        }
    })

    return (
        <Container fluid id="friends-container">
            <Header pp={props.pp}></Header>
            <Container id="main-friends-container" fluid>
                <Container fluid id="show-friend-requests-container">
                    <Alert variant="warning" className="friends-alerts">Friend Requests</Alert>
                    { friendRequests.length === 0 && <h3>You don't have any friend requests at the moment.</h3>}
                    { friendRequests.length !== 0 && friendRequests.map(req => (<FriendRequest key={req._id} id={req._id} bio={req.bio} pp={requestProfilePics[friendRequests.indexOf(req)]} name={`${req.first_name} ${req.last_name}`} />)) }
                </Container>
                <Container fluid id="show-friends-container">
                    <Alert variant="success" className="friends-alerts">Friends</Alert>
                    { friends.length === 0 && <h3>You don't have any friends at the moment.</h3>}
                    { friends.length !== 0 && friends.map(req => (<Friend key={req._id} id={req._id} bio={req.bio}  pp={profilePics[friends.indexOf(req)]} name={`${req.first_name} ${req.last_name}`} />)) }
                </Container>
            </Container>
        </Container>
    )

}

export default Friends;