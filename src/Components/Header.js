import React, { useEffect, useState } from "react";

import facebook from '../media/facebook.png';
import home from '../media/home.svg';
import friends from '../media/friends.svg';
import person from '../media/person.svg';
import giga from '../media/gigachad.jpg'

import { Navbar, Nav, Container, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Header = (props) => {
    const myId = localStorage.getItem('id');
    const link = `/user/${myId}`;
    const [bool, setBool] = useState(false);
    const [proPic, setProPic] = useState(person);
    
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear();
        navigate('/sign-in')
    }

    const getProfilePicture = () => {
        setBool(true);
        if (localStorage.getItem("token")) {
            const requestOptions = {
                mode: 'cors',
                method: 'GET',
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            };
    
            fetch(`${process.env.REACT_APP_API_URL}/pp`, requestOptions)
            .then(response => response.json())
            .then((d) => {
                console.log("called");
                if (d.img.length === 1) {
                    setProPic(giga);
                } else {
                    setProPic(`data:image/png;base64, ${d.img}`)
                }
            });
        } else {
            return "0";
        }
    }

    const handlePage = () => {
        const navs = document.getElementsByClassName("nav-item");
        switch (window.location.pathname) {
            case '/':
                navs[1].style.backgroundColor = "#1877F2";
                navs[0].style.backgroundColor = "white";
                navs[2].style.backgroundColor = "white";
                break;

            case '/friends':
                navs[0].style.backgroundColor = "#1877F2";
                navs[1].style.backgroundColor = "white";
                navs[2].style.backgroundColor = "white";
                break;

            case `/user/${localStorage.getItem('id')}`:
                navs[2].style.backgroundColor = "#1877F2";
                navs[0].style.backgroundColor = "white";
                navs[1].style.backgroundColor = "white";
                break;

            default:
                break;
        }

    }

    useEffect(() => {
        handlePage();
        if (!bool) {
            getProfilePicture();
        }
    })
    
    return (
        <Navbar sticky='top' bg="white" id="our-navbar">
            <Container fluid >
                <Navbar.Brand href="/">
                    <img src={facebook} alt="facebook"></img>
                </Navbar.Brand>
                <Container>
                    <Nav justify variant="tabs" >
                        <Nav.Item>
                            <Nav.Link href="/friends">
                                <img src={friends} alt="friends" className="nav-logos"></img>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/">
                                <img src={home} alt="home" className="nav-logos"></img>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href={link}>
                                <img src={proPic} alt="profile" className="nav-logos" id="header-pp"></img>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
                <Navbar.Brand href="/" onClick={ handleLogout }>
                    <Button variant="danger">Logout</Button>
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header;