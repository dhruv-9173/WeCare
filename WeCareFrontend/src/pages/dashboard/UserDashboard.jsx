import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import userImage from '../../assets/user.png';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LoadCoaches from "../../components/LoadCoaches";
import { getProfile } from "../../services/AuthService";

function UserDashboard() {
    const [user, setUser] = useState({});

    useEffect(() => {
        getProfile().then((response) => {
            console.log(response.data);
            setUser(response.data);
        });
    }, []);
    
    return (
        <div className="mt-5 pt-5" style={{marginBottom:"100px"}}>
            <Container className="mt-4">
                <Row className="justify-content-center mb-4">
                    <Col xs={12} md={10}>
                        <Card className="shadow-lg border-0">
                            <Card.Body>
                                <Row className="align-items-center">
                                    <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
                                        <img
                                            src={userImage}
                                            alt="User"
                                            className="border border-primary rounded-circle"
                                            width={150}
                                            height={150}
                                            style={{ objectFit: "cover" }}
                                        />
                                        <h5 className="mt-3">{user.name}</h5>
                                        <span className="text-muted">User ID: {user.userid}</span><br />
                                        <span className="text-muted">Role: {user.role}</span>
                                        
                                    </Col>

                                    <Col xs={12} md={8}>
                                        <Row className="mb-2">
                                            <Col sm={4}><strong>Email:</strong></Col>
                                            <Col sm={8}>{user.email}</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={4}><strong>Gender:</strong></Col>
                                            <Col sm={8}>{user.gender}</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={4}><strong>DOB:</strong></Col>
                                            <Col sm={8}>{user.dob}</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={4}><strong>Mobile:</strong></Col>
                                            <Col sm={8}>{user.mobilenumber || "Not Provided"}</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={4}><strong>Country:</strong></Col>
                                            <Col sm={8}>{user.country}</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={4}><strong>State:</strong></Col>
                                            <Col sm={8}>{user.state}</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={4}><strong>City:</strong></Col>
                                            <Col sm={8}>{user.city || "Not Provided"}</Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={4}><strong>Pincode:</strong></Col>
                                            <Col sm={8}>{user.pincode}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <div className="text-center mb-4">
                    <h1 className="text-primary fw-bold" style={{ fontFamily: "cursive" }}>
                        Welcome {user.name || "User"}
                    </h1>
                </div>

                <hr className="my-4" />

                <div className="pb-5">
                    <LoadCoaches />
                </div>
            </Container>
        </div>
    );
}

export default UserDashboard;
