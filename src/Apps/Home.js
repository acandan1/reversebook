import React, { useEffect, useState } from "react";

import Header from "../Components/Header";
import Feed from "../Components/Feed";
import { Container } from 'react-bootstrap';
import CreatePost from "../Components/CreatePost";


const Home = (props) => {
    const [idSet, setIdSet] = useState(false);
    
    const getId = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };

        fetch(`${process.env.REACT_APP_API_URL}/me`, requestOptions)
        .then(response => response.json())
        .then((d) => {
            localStorage.setItem('id', d.result)
            setIdSet(true);
        });
    }

    useEffect(() => {
        if (!idSet) { getId() }
    })

    return (
        <Container fluid id="home-container">
            <Header pp={props.pp}/>
            <CreatePost/>
            <Feed/>
        </Container>
    )
}

export default Home;