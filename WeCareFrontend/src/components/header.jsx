import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

function Header() {
    const logout = useLogout();
    const { user, isAuthenticated } = useAuthContext();

    return (
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="shadow-sm">
            <Container fluid>
                <Navbar.Brand href="/" className="fw-bold fs-3">WeCare</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center gap-3">
                        {isAuthenticated && user.role === "USER" &&
                            <Nav.Link className="text-white" href="/userdashboard">
                                Dashboard
                            </Nav.Link>
                        }
                        {isAuthenticated && user.role === "COACH" &&(
                            <Nav.Link className="text-white" href="/coachdashboard">
                                Dashboard
                            </Nav.Link>
                        )}
                        {isAuthenticated && user.role === "COACH" &&(
                            <Nav.Link className="text-white" href="/updateprofile">
                                UpdateProfile
                            </Nav.Link>
                        )}
                        {isAuthenticated && (
                            <Nav.Link className="text-white" href="/user/myAppointments">
                                My Appointments
                            </Nav.Link>
                        )}
                        <Nav.Link className="text-white" disabled>
                            Contact Us: 080 22334477
                        </Nav.Link>
                        {isAuthenticated && (
                            <Button variant="outline-light" size="sm" onClick={logout}>
                                Logout
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
