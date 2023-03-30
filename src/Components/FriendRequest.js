import React, { useEffect, useState } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import gigachad from '../media/gigachad.jpg';

const FriendRequest = (props) => {
    const [profilePic, setProfilePic] = useState(gigachad);
    const [bool, setBool] = useState(false);
    
    const navigate = useNavigate();

    const confirmRequest = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };

        fetch(`${process.env.REACT_APP_API_URL}/users/${props.id}/add-friend`, requestOptions)
            .then(response => response.json())
            .then((d) => {
                window.location.reload(false);
            });
    }

    const deleteRequest = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };

        fetch(`${process.env.REACT_APP_API_URL}/users/${props.id}/cancel-friend-request`, requestOptions)
            .then(response => response.json())
            .then((d) => {
                window.location.reload(false);
            });
    }

    useEffect(() => {
        if (!bool) {
            if (props.pp && props.pp.length > 1) {
                setProfilePic(`data:image/png;base64, ${props.pp}`);
            } 
            setBool(true);
        }
    })


    return (
        <Container className="user-friend-requests" fluid onClick={ () => navigate(`/user/${props.id}`) }>
            <Image src={profilePic} className="user-friend-requests-images"></Image>
                <h1 className="user-friend-requests-name">{props.name}</h1>
                <p className="friend-requests-bio">{props.bio}</p>
                <Button onClick={confirmRequest}>Confirm</Button>
                <Button variant="secondary" onClick={deleteRequest}>Delete</Button>
        </Container>
    )
}

export default FriendRequest;