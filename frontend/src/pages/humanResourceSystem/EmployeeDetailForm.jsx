import React from "react";
import { useState } from "react";
import * as reqSend from "../../global/reqSender.jsx";
import { Interface1 } from "./SideBarPages.jsx";

export default function EmployeeDetailForm() {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    age: 0,
    nic: "",
    address: "",
    emailAddress: "",
    phoneNumber: "",
    emergencyContactNumber: "",
    gender: "Male",
    bankAccountNumber: "",
    department: "",
    jobRole: "",
    recruitmentDate: "",
    salary: 0.0,
    permanentStaff: false,
    insuranceCategory: "",
    skillLevel: "Beginner",
    trainingManagement: null,
    active: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await reqSend.defaultReq(
        "POST",
        "Employee/Create",
        formData,
        (response) => {
          if (response.status === 200) {
            window.location.replace("/humanResource-management/interface1");
          } else {
            console.error("Error creating employee:", response);
          }
        }
      );
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Registration Form</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nic">NIC:</label>
          <input
            type="text"
            id="nic"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="emergencyContactNumber">
            Emergency Contact Number:
          </label>
          <input
            type="tel"
            id="emergencyContactNumber"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bankAccountNumber">Bank Account Number:</label>
          <input
            type="text"
            id="bankAccountNumber"
            name="bankAccountNumber"
            value={formData.bankAccountNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobRole">Job Role:</label>
          <input
            type="text"
            id="jobRole"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="recruitmentDate">Recruitment Date:</label>
          <input
            type="date"
            id="recruitmentDate"
            name="recruitmentDate"
            value={formData.recruitmentDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="permanentStaff">Permanent Staff:</label>
          <input
            type="checkbox"
            id="permanentStaff"
            name="permanentStaff"
            checked={formData.permanentStaff}
            onChange={(e) =>
              setFormData({ ...formData, permanentStaff: e.target.checked })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="insuranceCategory">Insurance Category:</label>
          <input
            type="text"
            id="insuranceCategory"
            name="insuranceCategory"
            value={formData.insuranceCategory}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          style={{
            fontSize: "25px",
            marginLeft: "46%",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            transition: "0.3s",
          }}
          onClick={handleSubmit}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#45a049";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#4CAF50";
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
}
