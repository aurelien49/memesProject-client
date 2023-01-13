import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {Component, useState} from "react";
import {Collapse} from "@mantine/core";

export default function NavBar(props) {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    let handleLink = (event) => {
        console.log('handleLink: ')
        //console.log('NavBar: event: ', event.target.attributes.value.nodeValue)
        props.callbackHandleMenu(event.target.attributes.value.nodeValue);
        event.preventDefault();
        setIsNavCollapsed(false);
    }

    let handleClickBurger = (event) => {
        console.log('handleClickBurger: ')
        console.log('Menu collapse ou non: ', isNavCollapsed)
    }

    let handleCollapse = (event) => {
        console.log('handleCollapse: ')
        console.log('Menu collapse ou non: ', isNavCollapsed)
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" rounded>
            <Container>
                <Navbar.Brand href="#">Meme-App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleClickBurger}/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav.Link eventKey={"1"} id="collasible-nav-dropdown" value='/home'
                              onClick={handleLink}>Home</Nav.Link>
                    <Nav.Link eventKey={"2"} value='/history' onClick={handleLink} disabled={!props.showHistoricButton}>Memes
                        saved</Nav.Link>
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavDropdown title="User Management" id="collasible-nav-dropdown">
                            <NavDropdown.Item value="/signin" onClick={handleLink}
                                              disabled={props.isUserLogged}>Sign-in</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item value="/signup" onClick={handleLink}>Sign-up</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item value="/logout" onClick={handleLink}
                                              disabled={!props.isUserLogged}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

// eventkey='/history'  eventKey='/home'
/*
function CustomLink({to, children, ...props}) {
    const path = window.location.pathname;

    return (
        <>
            <NavDropdown.Item className={path === to ? "active" : ""}
                              href={to} {...props}>{children}</NavDropdown.Item>
        </>
    );
}


    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Meme-App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav.Link value='/home' onClick={onTrigger}>Galerie</Nav.Link>
                    <Nav.Link value='/history' onClick={onTrigger}
                              disabled={!props.showHistoricButton}>Historique</Nav.Link>
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavDropdown title="Gestion des utilisateurs" id="collasible-nav-dropdown">
                            <CustomLink to="/signin" disabled={props.isUserLogged}>Sign-in</CustomLink>
                            <NavDropdown.Divider/>
                            <CustomLink to="/signup">Sign-up</CustomLink>
                            <NavDropdown.Divider/>
                            <CustomLink to="/" disabled={!props.isUserLogged}
                                        onClick={props.callbackLogout}>Logout</CustomLink>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
 */