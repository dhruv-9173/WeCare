import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import userImage from '../../assets/user.png';
import { getProfile, getAppointments } from "../../services/AuthService";
import { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import Loader from '../../components/loader';
import SuccessBox from "../../components/SuccessBox";
import ErrorBox from "../../components/ErrorBox";
import { cancelAppointments, confirmAppointment } from "../../services/CoachService";

function CoachDashboard() {
    const [user, setUser] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [loader, setLoader] = useState(false);
    const [success, showSuccess] = useState(false);
    const [error, showError] = useState(false);
    const [message, showMessage] = useState("");

    useEffect(() => {
        setLoader(true);
        Promise.all([getProfile(), getAppointments()])
            .then(([profileRes, appointmentsRes]) => {
                setUser(profileRes.data);
                setAppointments(appointmentsRes.data.filter(a => a.status === 0)); // only status 0
            })
            .catch(() => {
                showMessage("Failed to load data.");
                showError(true);
            })
            .finally(() => setLoader(false));
    }, []);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i className="bi bi-star-fill text-warning" key={`full-${i}`}></i>);
        }
        if (halfStar) {
            stars.push(<i className="bi bi-star-half text-warning" key="half" />);
        }
        while (stars.length < 5) {
            stars.push(<i className="bi bi-star text-warning" key={`empty-${stars.length}`} />);
        }
        return stars;
    };

    const handleCancel = (appointment, index) => {
        setLoader(true);
        cancelAppointments(appointment)
            .then((response) => {
                if (response.data === true) {
                    showMessage("Appointment Cancelled.");
                    showSuccess(true);
                    setAppointments(prev => {
                        const updated = [...prev];
                        updated.splice(index, 1);
                        return updated;
                    });
                } else {
                    showMessage("Failed to cancel appointment.");
                    showError(true);
                }
            })
            .catch(() => {
                showMessage("Error occurred while cancelling appointment.");
                showError(true);
            })
            .finally(() => setLoader(false));
    };

    const handleConfirm = (appointment, index) => {
        setLoader(true);
        confirmAppointment(appointment)
            .then((response) => {
                if (response.data === true) {
                    showMessage("Appointment Confirmed.");
                    showSuccess(true);
                    setAppointments(prev => {
                        const updated = [...prev];
                        updated.splice(index, 1);
                        return updated;
                    });
                } else {
                    showMessage("Failed to confirm appointment.");
                    showError(true);
                }
            })
            .catch(() => {
                showMessage("Error occurred while confirming appointment.");
                showError(true);
            })
            .finally(() => setLoader(false));
    };

    return (
        <div className="mt-5 pt-4" style={{ marginBottom: "100px" }}>
            {loader && <Loader />}
            {success && <SuccessBox message={message} onClose={() => showSuccess(false)} />}
            {error && <ErrorBox message={message} onClose={() => showError(false)} />}

            <Container>
                {/* Coach Profile */}
                <Row className="justify-content-center mb-4">
                    <Col md={6}>
                        <Card className="text-center shadow border-0">
                            <Card.Body>
                                <img
                                    src={user.image || userImage}
                                    alt="coach-img"
                                    className="rounded-circle border border-primary"
                                    width={150}
                                    height={150}
                                    style={{ objectFit: "cover" }}
                                />
                                <h4 className="mt-3">{user.name}</h4>
                                <p className="text-muted">Coach Id: {user.userid}</p>
                                <p>{renderStars(user.rating)}</p>
                                <p className="text-muted">Total Appointments: {user.totalappointments}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Welcome */}
                <Row className="mb-4">
                    <Col className="text-center">
                        <h1 className="text-success fw-bold" style={{ fontFamily: "cursive" }}>
                            Welcome, {user.name}
                        </h1>
                    </Col>
                </Row>

                <hr />

                {/* Appointments */}
                <Row>
                    <Col>
                        <h4 className="mb-4">Appointment Requests</h4>
                    </Col>
                </Row>

                <Row>
                    {appointments.length === 0 ? (
                        <Col className="text-center">
                            <i className="text-muted">No pending appointment requests.</i>
                        </Col>
                    ) : (
                        appointments.map((appointment, index) => (
                            <Col md={6} lg={4} className="mb-4" key={appointment.appointmentid}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Body>
                                        <h5 className="text-primary">Appointment #{appointment.appointmentid}</h5>
                                        <p><strong>User ID:</strong> {appointment.userid}</p>
                                        <p><strong>Date:</strong> {appointment.date}</p>
                                        <p><strong>Time:</strong> {appointment.starthr} - {appointment.endhr}</p>
                                        <p><strong>Description:</strong> {appointment.description}</p>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleCancel(appointment, index)}
                                            className="me-2"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleConfirm(appointment, index)}
                                        >
                                            Confirm
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default CoachDashboard;
