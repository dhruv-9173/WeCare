import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { fixappointment, gettimeSlots } from "../services/UserService";
import useAuthContext from "../hooks/useAuthContext";
import ErrorBox from "./ErrorBox";
import SuccessBox from "./SuccessBox";
import { Card, Form, Button } from "react-bootstrap";
import coachimg from "../assets/coach.png";
import { getComments } from "../services/AuthService";

function CoachDetailsAndAppointmentForm(props) {
  const { user } = useAuthContext();
  const coach = props.coach;

  const [time, setTime] = useState(["", ""]);
  const [comments, setComments] = useState([]);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    getComments(coach.userid).then((response) => {
      setComments(response.data);
    });
  }, [coach.userid]);

  const formik = useFormik({
    initialValues: {
      userid: user.userid,
      coachid: coach.userid,
      date: "",
      starthr: "",
      endhr: "",
      description: ""
    },
    onSubmit: (values, { resetForm }) => {
      setError(null); // clear any existing error
      setSuccess(null); // clear existing success
      fixappointment(values)
        .then((response) => {
          if (response.data === true) {
            resetForm();
            setTime(["", ""]);
            setSuccess("Appointment fixed successfully.");
          } else {
            setError("Task failed. Try again.");
          }
        })
        .catch(() => {
          setError("Could not fix Appointment. Please try again.");
        });
    }
  });

  useEffect(() => {
    if (formik.values.date) {
      gettimeSlots(String(formik.values.date), coach.userid)
        .then((response) => {
          setSlots(response.data);
        });
    }
  }, [formik.values.date, coach.userid]);

  const handleTimeChange = (e) => {
    const selected = JSON.parse(e.target.value);
    setTime(selected);
    formik.setFieldValue("starthr", selected[0]);
    formik.setFieldValue("endhr", selected[1]);
  };

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

  return (
    <div className="container my-4">
      <div className="row">
        {/* Coach Details */}
        <div className="col-md-6 mb-4">
          <Card className="h-100 shadow">
            <Card.Img variant="top" src={coach.image || coachimg} style={{ objectFit: "cover", height: "250px" }} />
            <Card.Body>
              <Card.Title>Coach Details</Card.Title>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item"><strong>Name:</strong> {coach.name}</li>
                <li className="list-group-item"><strong>Mobile No:</strong> {coach.mobilenumber}</li>
                <li className="list-group-item"><strong>Working Hours:</strong> {coach.start} - {coach.end}</li>
                <li className="list-group-item"><strong>Address:</strong> {coach.address}</li>
                <li className="list-group-item"><strong>Speciality:</strong> {coach.speciality}</li>
                <li className="list-group-item"><strong>Description:</strong> {coach.description}</li>
                <li className="list-group-item"><strong>Rating:</strong> {renderStars(coach.rating)}</li>
              </ul>

              {/* Comments */}
              <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ddd", borderRadius: "5px", padding: "10px" }}>
                <h6>Comments</h6>
                {comments.length === 0 ? (
                  <p className="text-muted">No comments available.</p>
                ) : (
                  comments.map((comment, index) => (
                    <div key={index} className="mb-2 p-2 border rounded">
                      <strong>{comment.username}:</strong>
                      <p className="mb-0">{comment.review}</p>
                    </div>
                  ))
                )}
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Appointment Form */}
        <div className="col-md-6">
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Fix Appointment</Card.Title>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Appointment Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Appointment Time</Form.Label>
                  <Form.Select
                    name="appointmentTime"
                    onChange={handleTimeChange}
                    required
                  >
                    {slots.length === 0 ? (
                      <option disabled value="">No Available Slots</option>
                    ) : (
                      slots.map((slot, index) => (
                        <option key={index} value={JSON.stringify(slot)}>
                          {slot[0]} - {slot[1]}
                        </option>
                      ))
                    )}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="btn btn-success" disabled={slots.length === 0}>
                  Submit Appointment
                </Button>
              </Form>

              {/* Feedback Boxes */}
              {error && <ErrorBox message={error} onClose={() => setError(null)} />}
              {success && <SuccessBox message={success} onClose={() => setSuccess(null)} />}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CoachDetailsAndAppointmentForm;
