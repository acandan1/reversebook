import React, { useEffect, useState } from "react";

import { Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import gigachad from '../media/gigachad.jpg';

const Friend = (props) => {
    const [profilePic, setProfilePic] = useState(gigachad);
    const [bool, setBool] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!bool) {
            if (props.pp && props.pp.length > 1) {
                setProfilePic(`data:image/png;base64, ${props.pp}`);
            } 
            setBool(true);
        }
    })

    return (
        <Container className="user-friends" fluid onClick={ () => navigate(`/user/${props.id}`) }>
            <Image src={profilePic} className="user-friends-images"></Image>
            <Container classname="user-friend-info" fluid>
                <h1 className="user-friends-name">{props.name}</h1>
                <p className="friends-bio">{props.bio}</p>
            </Container>
        </Container>
    )
}

export default Friend;