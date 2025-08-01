import React, { useState } from "react";

function CoachDetailsAndAppointmentForm() {
  const [appointmentTime, setAppointmentTime] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const coach = {
    name: "John Doe",
    mobile: "+91 9876543210",
    workingHours: "9 AM - 6 PM",
    address: "123, Health Street, Delhi",
    speciality: "Fitness",
    description: "John has over 10 years of experience in personal training and fitness coaching.",
    rating: 4.5,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Details:", { appointmentTime, message });
    setSubmitted(true);
  };

  return (
    <div className="container my-4">
      <div className="row">
        
        <div className="col-md-6 mb-4">
          <h3>Coach Details</h3>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Name:</strong> {coach.name}
            </li>
            <li className="list-group-item">
              <strong>Mobile No:</strong> {coach.mobile}
            </li>
            <li className="list-group-item">
              <strong>Working Hours:</strong> {coach.workingHours}
            </li>
            <li className="list-group-item">
              <strong>Address:</strong> {coach.address}
            </li>
            <li className="list-group-item">
              <strong>Speciality:</strong> {coach.speciality}
            </li>
            <li className="list-group-item">
              <strong>Description:</strong> {coach.description}
            </li>
            <li className="list-group-item">
              <strong>Rating:</strong> {renderStars(coach.rating)}
            </li>
          </ul>
        </div>

        
        <div className="col-md-6">
          <h3>Fix Appointment</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="appointmentTime" className="form-label">
                Appointment Time
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="appointmentTime"
                required
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
              Submit Appointment
            </button>
            {submitted && (
              <div className="alert alert-success mt-3">
                Appointment submitted successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CoachDetailsAndAppointmentForm;
