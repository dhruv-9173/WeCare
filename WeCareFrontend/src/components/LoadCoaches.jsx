import { useState,useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import CoachDetailsAndAppointmentForm from "./addAppointment";
import { loadAllCoaches } from "../services/UserService";
function LoadCoaches() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedCoach, setSelectedCoach] = useState([]); 
  const [showForm, setShowForm] = useState(false);

  const [coaches,setCoaches] = useState([]);

  useEffect(()=>{
      loadAllCoaches()
        .then((response)=>{
          console.log(response.data);
          setCoaches(response.data);
        })
        
  },[]);

  const handleSort = (key) => {
    setSortBy(key);
  };

  const filteredCoaches = coaches
    .filter((coach) =>
      coach.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "speciality") return a.speciality.localeCompare(b.speciality);
      if (sortBy === "address") return a.location.localeCompare(b.location);
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "coachId") return a.coachId - b.coachId;
      return 0;
    });

  const handleAppointmentClick = (coach) => {
    setSelectedCoach(coach);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedCoach(null);
  };

  return (
    <div className="container mt-4">
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="search"
          className="form-control w-50"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Dropdown onSelect={(eventKey) => handleSort(eventKey)}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Sort
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="speciality">Speciality</Dropdown.Item>
            <Dropdown.Item eventKey="rating">Rating</Dropdown.Item>
            <Dropdown.Item eventKey="location">Location</Dropdown.Item>
            <Dropdown.Item eventKey="coachId">Coach ID</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      
    
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>Coach ID</th>
              <th>Name</th>
              <th>Rating</th>
              <th>Speciality</th>
              
              <th>Fix Appointment</th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((coach) => 
              (
              <tr key={coach.userid}>
                <td>{coach.userid}</td>
                <td>{coach.name}</td> 
                <td>{coach.rating}</td>
                <td>{coach.speciality}</td>
                
                <td>
                  <button className="btn btn-success" onClick={() => handleAppointmentClick(coach)}>
                    Fix Appointment
                  </button>
                </td>
              </tr>
            ))}
            {filteredCoaches.length === 0 && (
              <tr>
                <td colSpan="6">No coaches found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      {showForm && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1050,
    }}
  >
    <div className="bg-white p-4 rounded shadow" style={{ width: "60%", maxHeight: "90vh", overflowY: "auto" }}>
      <div className="d-flex justify-content-end">
        <button className="btn-close" onClick={closeForm}></button>
      </div>
      <CoachDetailsAndAppointmentForm coach={selectedCoach} />
    </div>
  </div>
)}

    </div>
  );
}

export default LoadCoaches;
