import React, { useState } from "react";

function UpdateProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    workingHours: "",
    mobile: "",
    email: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile data:", formData);
    alert("Profile Updated!");
  };

  return (
    <div className="container" style={{height:"80rem", marginTop:"150px"}}>
      <h3 className="mb-4">Update Profile</h3>

      <form onSubmit={handleSubmit}>
        
        <div className="mb-3 text-center">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-circle mb-2"
              width={120}
              height={120}
            />
          ) : (
            <div
              className="bg-secondary rounded-circle d-inline-block mb-2"
              style={{ width: "120px", height: "120px" }}
            ></div>
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control mt-2 w-auto d-inline-block"
            />
          </div>
        </div>

        
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        
        <div className="mb-3">
          <label className="form-label">Working Hours</label>
          <input
            type="text"
            className="form-control"
            name="workingHours"
            value={formData.workingHours}
            onChange={handleInputChange}
            placeholder="e.g. 9 AM - 6 PM"
            required
          />
        </div>

        
        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <input
            type="tel"
            className="form-control"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            pattern="[0-9]{10}"
            placeholder="10-digit number"
            required
          />
        </div>

       
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
