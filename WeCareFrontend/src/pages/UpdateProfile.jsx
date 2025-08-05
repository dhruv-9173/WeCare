import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { getProfile } from "../services/AuthService";
import { updateProfile } from "../services/CoachService";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { Pencil, PencilSquare } from "react-bootstrap-icons";
import coachimg from "../assets/coach.png";

function UpdateProfile() {
  const [profile, setProfile] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(null);
  const [startday , setstartday] = useState("Mon");
  const [endday , setendday] = useState("Sat");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      coachname: profile.name || "",
      mobilenumber: profile.mobilenumber || "",
      image: profile.image || "",
      description: profile.description || "",
      start: profile.start || "",
      end: profile.end || "",
      address: profile.address || "",
      speciality: profile.speciality || "",
      workingdays: profile.workingdays || `${startday}-${endday}`,
    },
    onSubmit: async (values) => {
      try {
        await updateProfile(values);
        setStatus("Profile updated successfully.");
        setIsEditing(false);
      } catch (error) {
        setStatus("Error updating profile.");
      }
    },
  });

  useEffect(() => {
    getProfile().then((res) => {
      setProfile(res.data);
    });
  }, []);

  return (
    <Container className="my-5" style={{ paddingBottom: "100px", paddingTop: "80px" }}>
      <Card className="p-4 shadow-sm">
        <Card.Title className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Coach Profile</h4>
          {!isEditing && (
            <PencilSquare
              role="button"
              size={22}
              onClick={() => setIsEditing(true)}
              className="text-primary"
              title="Edit"
            />
          )}
        </Card.Title>

        {status && (
          <p className={`text-${status.includes("success") ? "success" : "danger"}`}>
            {status}
          </p>
        )}

        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={4} className="text-center mb-3">
              <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : formik.values.image || coachimg
                }
                alt="Profile"
                className="rounded-circle border border-primary"
                style={{ width: 150, height: 150, objectFit: "cover" }}
              />
              {isEditing && (
                <Form.Control
                  className="mt-2"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setProfileImage(file);

                    const reader = new FileReader();
                    reader.onloadend = () => {
                      formik.setFieldValue("image", reader.result);
                    };
                    if (file) {
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              )}
            </Col>

            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  name="coachname"
                  type="text"
                  disabled={!isEditing}
                  value={formik.values.coachname}
                  onChange={formik.handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  name="mobilenumber"
                  type="text"
                  disabled={!isEditing}
                  value={formik.values.mobilenumber}
                  onChange={formik.handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  as="textarea"
                  rows={2}
                  disabled={!isEditing}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Speciality</Form.Label>
                <Form.Control
                  name="speciality"
                  as="textarea"
                  rows={2}
                  disabled={!isEditing}
                  value={formik.values.speciality}
                  onChange={formik.handleChange}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Hour</Form.Label>
                    <Form.Control
                      name="start"
                      type="time"
                      disabled={!isEditing}
                      value={formik.values.start}
                      onChange={formik.handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>End Hour</Form.Label>
                    <Form.Control
                      name="end"
                      type="time"
                      disabled={!isEditing}
                      value={formik.values.end}
                      onChange={formik.handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Day</Form.Label>
                    <Form.Select
                      name="start"
                      type="day"
                      disabled={!isEditing}
                      value={startday}
                      onChange={(e)=>setstartday(startday)}
                    >
                      <option value="Mon">Mon</option>
                      <option value="Tue">Tue</option>
                      <option value="Wed">Wed</option>
                      <option value="Thu">Thu</option>
                      <option value="Fri">Fri</option>
                      <option value="Sat">Sat</option>
                      <option value="Sun">Sun</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>End day</Form.Label>
                    <Form.Select
                      name="end"
                      type="day"
                      disabled={!isEditing}
                      value={endday}
                      onChange={(e)=>setendday(e.target.value)}
                    >
                      <option value="Mon">Mon</option>
                      <option value="Tue">Tue</option>
                      <option value="Wed">Wed</option>
                      <option value="Thu">Thu</option>
                      <option value="Fri">Fri</option>
                      <option value="Sat">Sat</option>
                      <option value="Sun">Sun</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  type="text"
                  disabled={!isEditing}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </Form.Group>

              {isEditing && (
                <div className="text-center">
                  <Button variant="success" type="submit" className="me-2">
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setProfileImage(null); 
                      formik.resetForm(); 
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}

export default UpdateProfile;
