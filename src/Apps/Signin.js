import React from "react";

import logo from '../media/logo.svg';

import { Container, Image, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Signin = (props) => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const buttons = document.getElementsByClassName("btn");

        buttons[0].classList.add('disabled');
        buttons[1].classList.add('disabled');

        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value})
        };

        fetch(`${process.env.REACT_APP_API_URL}/sign-in`, requestOptions)
        .then(response => response.json())
        .then((data) => {
            if (data.message === 'The user does not exist!') {
                alert('Wrong email or password!')
                buttons[0].classList.remove('disabled');
                buttons[1].classList.remove('disabled');
            } else if (data.token) {
                console.log("sucess");
                const token = data.token;
                const id = data.id;
                localStorage.setItem("token", token);
                localStorage.setItem("id", id);
                props.changeBool();
                navigate(`/user/${localStorage.getItem("id")}`, { replace: true });
            } else {
                alert('Something went wrong! Please try again or refresh the page!')
                buttons[0].classList.remove('disabled');
                buttons[1].classList.remove('disabled');
            }
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <Container fluid className="signin-page">
            <Image fluid="true" src={logo} alt="facebook" id="signup-img"></Image>
            <Form className="signin-form" onSubmit={handleSubmit}>
                <h1 id="signup-header">Log Into Facebook</h1>
                <hr></hr>

                <Form.Group>
                    <Form.Control name="username" type="email" placeholder="Email" required maxLength="30"/>
                </Form.Group>

                <Form.Group>
                    <Form.Control name="password" type="password" placeholder="Password" required minLength="7" maxLength="15"/>
                </Form.Group>

                <Button variant="primary" type="submit">Log In</Button>
                <hr></hr>
                <Button variant="success" id="create-button" href="https://acandan1.github.io/odin-facebook/sign-up">Create new account</Button>
            </Form>
        </Container>
    )

}

export default Signin;