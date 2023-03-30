import React, { useState } from "react";

import { Button, Card, Container, Image } from 'react-bootstrap';

import like from '../media/like.svg';
import comment from '../media/comment.svg';

import gigachad from '../media/gigachad.jpg';

import { useNavigate } from "react-router-dom";
import CommentSection from "./CommentSection";

const Post = (props) => {
    const navigate = useNavigate();

    const bool = props.displayPost;
    let pp = gigachad;

    const [likeCount, setLikeCount] = useState(props.likes.length);

    const [liked, setLiked] = useState(props.likes.includes(localStorage.getItem('id')));

    if (props.personImg&&props.personImg.length > 1) {
        pp = `data:image/png;base64, ${props.personImg}`;
    }

    const getDate = (timestamp) => {
        return timestamp.substring(0, 10);
    }

    const handleLike = () => {
        let x = 'like';

        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };

        if (liked) {
            x = 'unlike';
            setLiked(false);
            setLikeCount(likeCount - 1)
        } else {
            setLiked(true);
            setLikeCount(likeCount + 1);
        }

        fetch(`${process.env.REACT_APP_API_URL}/posts/${props.postId}/${x}`, requestOptions)
        .then(response => response.json())
        .then((data) => {
            if (data.message !== 'Something is not right!') {
                console.log(data);
            } else {
                alert('Something went wrong! Please try again or refresh the page!')
            }
        }).catch((err) => {
            alert(err);
        })
    }

    const handleRedirect = (e) => {
        navigate(`/post/${props.postId}`)
    }

    return (
        <Container className="post" fluid>
            <Card className="post-card">
                <Card.Header className="post-headers">
                    
                    <Container>
                        <div className="post-person-info" onClick={() => navigate(`/user/${props.personId}`)}>
                            <Image src={pp} alt="person" className="post-logo"></Image>
                            <Card.Text id="post-person-name" className="text-dark">{props.personName}</Card.Text>
                        </div>
                    </Container>
                    <Card.Text>{getDate(props.date)}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Text className="post-text" onClick={handleRedirect}>{props.text}</Card.Text>
                    { props.postImg.length > 1 ? <Card.Img src={`data:image/png;base64, ${props.postImg}`} id="post-img"></Card.Img> : <span></span> }
                    
                    {bool ? <Container className="like-and-comment">
                        { liked ? <Button className="bottom-post-button" variant="primary" onClick={handleLike}>
                                        <Image src={like} alt="like" className="post-bottom" ></Image>
                                        &nbsp;Like
                                    </Button>
                                :<Button className="bottom-post-button" variant="light" onClick={handleLike}>
                                <Image src={like} alt="like" className="post-bottom" ></Image>
                                &nbsp;Like
                            </Button> }
                         </Container> 
                         : <Container className="like-and-comment">
                            { liked ? <Button className="bottom-post-button" variant="primary" onClick={handleLike}>
                                    <Image src={like} alt="like" className="post-bottom" ></Image>
                                    &nbsp;Like
                                </Button>
                             :<Button className="bottom-post-button" variant="light" onClick={handleLike}>
                             <Image src={like} alt="like" className="post-bottom" ></Image>
                             &nbsp;Like
                         </Button> }
                                <Button className="bottom-post-button" variant="light" onClick={handleRedirect}>
                                    <Image src={comment} alt="comment" className="post-bottom" ></Image>
                                    &nbsp;Comment
                                </Button>
                         </Container>
                    }
                    
                    {
                        bool ? <Container>
                            <hr></hr>
                            <p onClick={handleRedirect} className="comment-likes">{likeCount} likes</p>
                            <CommentSection/>
                        </Container>
                        : <div>
                            <hr></hr>
                            <p onClick={handleRedirect} className="comment-likes">{likeCount} likes</p>
                        </div>
                    }
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Post;
