import React, { useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import person from '../media/gigachad.jpg';

const Comment = (props) => {
    const [pp, setPp] = useState(person);
    const [bool, setBool] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!bool) {
            if (props.personImg.length > 1) {
                setPp(`data:image/png;base64, ${props.personImg}`)
            }
        
        }
    })

    const getDate = (timestamp) => {
        return timestamp.substring(0, 10);
    }

    return (
        <Card className="comment-on-post" >
            <Card.Header>
                <Container fluid className="comment-top" onClick={() => navigate(`/user/${props.userId}`)}> 
                    <Image src={pp} alt="user" className="comment-pp"></Image>
                    <Card.Text>&nbsp;&nbsp;{props.personName}</Card.Text>
                </Container>
                <Card.Text>{getDate(props.date)}</Card.Text>
            </Card.Header>
            <Card.Body>
                <Card.Text>{props.text}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Comment;