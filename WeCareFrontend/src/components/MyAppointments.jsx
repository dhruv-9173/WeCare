import { useEffect, useState } from "react";
import { getAppointments } from "../services/AuthService";
import { Card, Table, Container, Row, Col, Form, Button } from "react-bootstrap";
import useAuthContext from "../hooks/useAuthContext";
import ErrorBox from "./ErrorBox";
import Loader from "./loader";
import SuccessBox from "./SuccessBox";
import { cancelAppointments, completeAppointments } from "../services/CoachService";
import Feedback from "./Feedback"; // ✅ Add this line

function MyAppointments() {
    const { user } = useAuthContext();
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [loader, setLoader] = useState(false);
    const [success, showSuccess] = useState(false);
    const [error, showError] = useState(false);
    const [message, showMessage] = useState("");

    const [filters, setFilters] = useState({
        date: "",
        appointmentid: "",
        coachid: "",
        status: ""
    });

    const statusMap = {
        0: "Pending",
        1: "Confirmed",
        2: "Cancelled",
        3: "Completed"
    };

    useEffect(() => {
        getAppointments()
            .then((response) => {
                setAppointments(response.data);
                setFilteredAppointments(response.data);
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
            });
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = () => {
        const filtered = appointments.filter(appt => {
            return (
                (filters.date === "" || appt.date === filters.date) &&
                (filters.appointmentid === "" || appt.appointmentid.toString() === filters.appointmentid) &&
                (filters.coachid === "" || appt.coachid.toString() === filters.coachid) &&
                (filters.status === "" || statusMap[appt.status].toLowerCase().includes(filters.status.toLowerCase()))
            );
        });
        setFilteredAppointments(filtered);
        setSelectedAppointment(null);
    };

    const clearFilters = () => {
        setFilters({
            date: "",
            appointmentid: "",
            coachid: "",
            status: ""
        });
        setFilteredAppointments(appointments);
        setSelectedAppointment(null);
    };

    const handleCancel = (appointment) => {
        setLoader(true);
        cancelAppointments(appointment)
            .then((response) => {
                if (response.data === true) {
                    showMessage("Appointment Cancelled.");
                    showSuccess(true);
                    const updated = appointments.map(appt =>
                        appt.appointmentid === appointment.appointmentid
                            ? { ...appt, status: 2 }
                            : appt
                    );
                    setAppointments(updated);
                    setFilteredAppointments(updated);
                    setSelectedAppointment({ ...appointment, status: 2 });
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

    const handleComplete = (appointment) => {
        setLoader(true);
        completeAppointments(appointment)
            .then((response) => {
                if (response.data === true) {
                    showMessage("Appointment Marked Completed.");
                    showSuccess(true);
                    const updated = appointments.map(appt =>
                        appt.appointmentid === appointment.appointmentid
                            ? { ...appt, status: 3 }
                            : appt
                    );
                    setAppointments(updated);
                    setFilteredAppointments(updated);
                    setSelectedAppointment({ ...appointment, status: 3 });
                } else {
                    showMessage("Failed to complete appointment.");
                    showError(true);
                }
            })
            .catch(() => {
                showMessage("Error occurred while completing appointment.");
                showError(true);
            })
            .finally(() => setLoader(false));
    };

    return (
        <Container style={{ marginTop: "120px", marginBottom: "100px" }}>
            <h2 className="mb-4 text-primary">My Appointments</h2>

            {loader && <Loader />}
            {success && <SuccessBox message={message} onClose={() => showSuccess(false)} />}
            {error && <ErrorBox message={message} onClose={() => showError(false)} />}

            {/* Filter Section */}
            <Card className="mb-4">
                <Card.Body>
                    <Row className="g-3">
                        <Col md={3}>
                            <Form.Control
                                type="date"
                                name="date"
                                value={filters.date}
                                onChange={handleFilterChange}
                                placeholder="Date"
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Control
                                type="text"
                                name="appointmentid"
                                value={filters.appointmentid}
                                onChange={handleFilterChange}
                                placeholder="Appointment ID"
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Control
                                type="text"
                                name="coachid"
                                value={filters.coachid}
                                onChange={handleFilterChange}
                                placeholder="Coach ID"
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Control
                                type="text"
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                placeholder="Status"
                            />
                        </Col>
                    </Row>
                    <div className="mt-3 d-flex justify-content-end gap-2">
                        <Button variant="primary" onClick={applyFilters}>Apply Filters</Button>
                        <Button variant="secondary" onClick={clearFilters}>Clear Filters</Button>
                    </div>
                </Card.Body>
            </Card>

            {/* Appointments Table */}
            {filteredAppointments.length === 0 ? (
                <p className="text-muted">No appointments found.</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-primary">
                        <tr>
                            <th>Appointment ID</th>
                            <th>Coach ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map((appt) => (
                            <tr
                                key={appt.appointmentid}
                                onClick={() => setSelectedAppointment(appt)}
                                style={{ cursor: "pointer" }}
                            >
                                <td>{appt.appointmentid}</td>
                                <td>{appt.coachid}</td>
                                <td>{statusMap[appt.status]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Selected Appointment Details */}
            {selectedAppointment && (
                <div
                    className="position-fixed top-50 start-50 translate-middle"
                    style={{
                        zIndex: 1050,
                        width: "90%",
                        maxWidth: "600px"
                    }}
                >
                    <Card className="shadow">
                        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                            <span>Appointment Details</span>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                aria-label="Close"
                                onClick={() => setSelectedAppointment(null)}
                            ></button>
                        </Card.Header>
                        <Card.Body>
                            <p><strong>Appointment ID:</strong> {selectedAppointment.appointmentid}</p>
                            <p><strong>User ID:</strong> {selectedAppointment.userid}</p>
                            <p><strong>Coach ID:</strong> {selectedAppointment.coachid}</p>
                            <p><strong>Date:</strong> {selectedAppointment.date}</p>
                            <p><strong>Start Hour:</strong> {selectedAppointment.starthr}</p>
                            <p><strong>End Hour:</strong> {selectedAppointment.endhr}</p>
                            <p><strong>Description:</strong> {selectedAppointment.description}</p>
                            <p><strong>Status:</strong> {statusMap[selectedAppointment.status]}</p>

                            {(selectedAppointment.status === 0 || selectedAppointment.status === 1) && (
                                <Button
                                    variant="danger"
                                    className="me-2"
                                    onClick={() => handleCancel(selectedAppointment)}
                                >
                                    Cancel Appointment
                                </Button>
                            )}

                            {(selectedAppointment.status === 0 || selectedAppointment.status === 1) &&
                                user.role === "COACH" && (
                                    <Button
                                        variant="primary"
                                        onClick={() => handleComplete(selectedAppointment)}
                                    >
                                        Complete Appointment
                                    </Button>
                                )}

                            {user.role === "USER" &&
                                selectedAppointment.status === 3 &&
                                (
                                    <Feedback app={selectedAppointment} />
                                )}
                        </Card.Body>
                    </Card>
                </div>
            )}
        </Container>
    );
}

export default MyAppointments;
