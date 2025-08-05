import React, { useState, useEffect } from "react";
import { Table, Button, Collapse, Card } from "react-bootstrap";
import { completeAppointments } from "../services/CoachService";
import { getAppointments } from "../services/AuthService";
import useAuthContext from "../hooks/useAuthContext";

function AppointmentList() {
  const { user } = useAuthContext();
  const [appointments, setAppointments] = useState([]);
  const [openRow, setOpenRow] = useState(null);

  useEffect(() => {
    getAppointments(user.userid).then((res) => {
      setAppointments(res.data);
    });
  }, [user.userid]);

  const statusMap = {
    0: "Pending",
    1: "Confirmed",
    2: "Cancelled",
    3: "Completed"
  };

  const handleComplete = async (appointmentId) => {
    try {
      await completeAppointments(appointmentId);
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.appointmentid === appointmentId ? { ...apt, status: 3 } : apt
        )
      );
    } catch (error) {
      console.error("Error marking complete", error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Appointments</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Coach ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt, index) => (
            <>
              <tr key={apt.appointmentid} onClick={() => setOpenRow(openRow === index ? null : index)}>
                <td>{index + 1}</td>
                <td>{apt.coachid}</td>
                <td>{apt.date}</td>
                <td>{statusMap[apt.status]}</td>
                <td>
                  {user.role === "coach" && apt.status === 1 ? (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComplete(apt.appointmentid);
                      }}
                    >
                      Complete
                    </Button>
                  ) : apt.status === 3 ? (
                    <Button variant="secondary" size="sm" disabled>
                      Completed
                    </Button>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td colSpan={5} style={{ padding: 0, borderTop: "none" }}>
                  <Collapse in={openRow === index}>
                    <div className="p-3 bg-light">
                      <strong>Description:</strong> {apt.description}<br />
                      <strong>Time:</strong> {apt.starthr} - {apt.endhr}
                    </div>
                  </Collapse>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AppointmentList;
