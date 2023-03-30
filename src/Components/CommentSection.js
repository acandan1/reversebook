import React, { useEffect, useState } from "react";
import { Alert, Container, Card, Form, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Comment from "./Comment";


const CommentSection = () => {
    const {id} = useParams();

    const [data, setData] = useState("no");
    const [profilePics, setProfilePics] = useState("");

    const getData = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };

        fetch(`${process.env.REACT_APP_API_URL}/posts/${id}/comments`, requestOptions)
        .then(response => response.json())
        .then((d) => {
            console.log(d);
            setData(d.result);
            setProfilePics(d.profile_pics);
            if (d.result.length === 0) {
                setData([]);
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        

        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify({ text: e.target.text.value})
        };

        fetch(`${process.env.REACT_APP_API_URL}/posts/${id}/comments`, requestOptions)
        .then(response => response.json())
        .then((data) => {
            if (data.message !== 'Something is not right!') {
                window.location.reload();
            } else {
                alert('Something went wrong! Please try again or refresh the page!')
            }
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        if (data === "no") {
            getData();
        }
    })

    return (
        <Container fluid className="comment-section-container">
            <Form className="comment-form" onSubmit={ handleSubmit }>
                <Form.Group>
                    <Form.Label id="leave-label">Leave a comment!</Form.Label>
                    <Form.Control as="textarea" name="text" id="create-comment-textarea" maxLength={250} placeholder="What's on your mind?" required/>
                </Form.Group>

                <Button type="submit">Submit</Button>
            </Form>
            <hr></hr>
            { data === "" && <Spinner animation="border" variant="primary" /> }
            { data !=="no" ? <Card className="comment-section border-0">
                                <Alert variant="primary" id="comment-alert"><p>Comment Section</p></Alert>
                                {data.map(d => (<Comment key={d._id} userId={d.user._id} personImg={profilePics[data.indexOf(d)]} personName={`${d.user.first_name} ${d.user.last_name}`} date={d.timestamp} text={d.text}/>))}
                            </Card> : <Alert><p>Be the first one to comment!</p></Alert> }
        </Container>
    )
}

export default CommentSection;