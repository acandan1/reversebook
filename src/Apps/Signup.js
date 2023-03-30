import React from "react";
import { useState } from "react";

import logo from '../media/logo.svg';

import { Container, Image, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [item, setItem] = useState({ kindOfStand: "", another: "another" });
    const { kindOfStand } = item;
    const arr = [];
    const arr2 = [];
    for (var i = 1; i <= 31; i++) {
        arr.push(i);
    }
    for (var j = 1950; j <= 2005; j++) {
        arr2.push(j);
    }

    const navigate = useNavigate();

    const handleMonth = (month) => {
        let val;

        switch (month) {
            case "January":
                val=1;
                break;
        
            case "February":
                val=2;
                break;

            case "March":
                val=3;
                break;

            case "April":
                val=4;
                break;
        
            case "May":
                val=5;
                break;

            case "June":
                val=6;
                break;

            case "July":
                val=7;
                break;
        
            case "August":
                val=8;
                break;

            case "September":
                val=9;
                break;

            case "October":
                val=10;
                break;
        
            case "November":
                val=11;
                break;

            case "December":
                val=12;
                break;

            default:
                break;
        }

        return val;
    }

    const handleChange = e => {
        e.persist();
        setItem(prevState => ({
          ...prevState,
          kindOfStand: e.target.value
        }));
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = `${e.target.year.value}-${handleMonth(e.target.month.value)}-${e.target.day.value}`
        
        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value,
                first_name: e.target.first_name.value, last_name: e.target.last_name.value, birthdate: date, gender: kindOfStand
            })
        };

        fetch(`${process.env.REACT_APP_API_URL}/sign-up`, requestOptions)
        .then(response => response.json())
        .then((data) => {
            if (data.message.includes("created")) {
                navigate('/sign-in');
            } else {
                alert("Something went wrong. Please refresh the page and try again!")
            }
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <Container fluid className="signup-page">
            <Image fluid="true" src={logo} alt="facebook" id="signup-img"></Image>
            <Form className="signup-form" onSubmit={ handleSubmit }>
                <h1 id="signup-header">Create a new account</h1>
                <p id="signup-para">It's quicky and easy.</p>
                <hr></hr>
                <Form.Group>
                    <Form.Control type="text" name="first_name" placeholder="First name" required minLength="3" maxLength="15"/>
                </Form.Group>

                <Form.Group>
                    <Form.Control type="text" name="last_name" placeholder="Last name" required minLength="3" maxLength="15"/>
                </Form.Group>

                <Form.Group>
                    <Form.Control type="email" name="username" placeholder="Email" required maxLength="30"/>
                </Form.Group>

                <Form.Group>
                    <Form.Control type="password" name="password" placeholder="New password" required minLength="7" maxLength="15"/>
                </Form.Group>

                <hr></hr>

                <Form.Group>
                    <Form.Label className="form-label">Birthday</Form.Label>
                    <div className="inline-options">
                        <Form.Select required name="month">
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </Form.Select>
                        <Form.Select required name="day">
                            {arr.map((x, i) => <option value={x} key={i}>{x}</option>)}
                        </Form.Select>
                        <Form.Select required name="year">
                            {arr2.map((x, i) => <option value={x} key={i}>{x}</option>)}
                        </Form.Select>
                    </div>

                </Form.Group>

                <hr></hr>

                <Form.Group>
                    <Form.Label className="form-label">Gender</Form.Label>
                    <div key='inline-radio'>
                        <Form.Check inline name="gender" required value="female" label="Female" type="radio" onChange={handleChange} checked={kindOfStand==="female"}></Form.Check>
                        <Form.Check inline name="gender" required value="male" label="Male" type="radio" onChange={handleChange} checked={kindOfStand==="male"}></Form.Check>
                        <Form.Check inline name="gender" required value="other" label="Other" type="radio" onChange={handleChange} checked={kindOfStand==="other"}></Form.Check>
                    </div>
                </Form.Group>

                <Button variant="success" type="submit">
                    Sign Up
                </Button>
                <Alert.Link href='https://acandan1.github.io/odin-facebook/sign-in' id="signup-link">Already have an account?</Alert.Link>
            </Form>
        </Container>
    )
}

export default Signup;