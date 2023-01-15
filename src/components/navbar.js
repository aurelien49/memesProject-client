import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {Component, useState} from "react";

export default function NavBar(props) {

    let handleLink = (event) => {
        //console.log('NavBar: event: ', event.target.attributes.value.nodeValue)
        props.callbackHandleMenu(event.target.attributes.value.nodeValue);
        event.preventDefault();
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" rounded>
            <Container>
                <Navbar.Brand href="#">Meme-App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <div className={"spacer-items-menu"}>
                        <Nav.Link eventKey={"1"} id="collasible-nav-dropdown" value='/home'
                                  onClick={handleLink}>Home</Nav.Link>
                        <Nav.Link eventKey={"2"} value='/history' onClick={handleLink}
                                  disabled={!props.showHistoricButton}>Memes
                            saved</Nav.Link>
                    </div>
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
