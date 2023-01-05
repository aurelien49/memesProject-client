import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";

export default function NavBar(props) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Meme Application</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavDropdown title="Gestion des utilisateurs" id="collasible-nav-dropdown">
                            <CustomLink to="/signin" disabled={props.isUserLogged}>Sign-in</CustomLink>
                            <NavDropdown.Divider/>
                            <CustomLink to="/signup">Sign-up</CustomLink>
                            <NavDropdown.Divider/>
                            <CustomLink to="/" disabled={!props.isUserLogged} tabIndex="1"
                                        onClick={props.callbackLogout}>Logout</CustomLink>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function CustomLink({to, children, ...props}) {
    const path = window.location.pathname;

    return (
        <>
            <NavDropdown.Item className={path === to ? "active" : ""}
                              href={to} {...props}>{children}</NavDropdown.Item>
        </>
    );
}