import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HRStyles.css";
import * as reqSend from "../../global/reqSender.jsx";

export default function EmployeeDetailForm() {
  const [val, setVal] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
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

  const change1 = (event) => {
    setVal(event.target.value);
  };

  const searchClick = () => {
    reqSend.defaultReq(
      "GET",
      `Employee/${val}`,
      {},
      (response) => {
        if (response.status === 200 && response.data) {
          setEmployeeData(response.data);
          setFormData(response.data);
          console.log(response.data);
          document.getElementById("employeeId").defaultValue =
            employeeData.employeeId;
          document.getElementById("firstName").defaultValue =
            employeeData.firstName;
          document.getElementById("lastName").defaultValue =
            employeeData.lastName;
          document.getElementById("NIC").defaultValue = employeeData.nic;
          document.getElementById("skillLevel").defaultValue =
            employeeData.skillLevel;
          document.getElementById("emailAddress").defaultValue =
            employeeData.emailAdress;
          document.getElementById("phoneNumber").defaultValue =
            employeeData.phoneNumber;
          document.getElementById("address").defaultValue =
            employeeData.address;
          document.getElementById("emergencyContactNumber").defaultValue =
            employeeData.emergencyContactNumber;
          document.getElementById("gender").Value = employeeData.gender;
          document.getElementById("bankAccountNumber").defaultValue =
            employeeData.bankAccountNumber;
          document.getElementById("department").defaultValue =
            employeeData.department;
          document.getElementById("jobRole").defaultValue =
            employeeData.jobRole;
          document.getElementById("salary").defaultValue = employeeData.salary;
          document.getElementById("permanentStaff").defaultChecked =
            employeeData.permanentStaff;
          document.getElementById("insuranceCategory").defaultValue =
            employeeData.insuranceCategory;
        } else {
          window.location.reload();
          console.error("Invalid response format:", response);
        }
      },
      (error) => {
        console.error("API request failed:", error);
        window.location.reload();
      }
    );
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    searchClick();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log("formData: ", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await reqSend.defaultReq(
        "PUT",
        `Employee/${val}`,
        formData,
        (response) => {
          console.log(response);
          if (response.status === 200) {
            console.log("Employee created successfully");

            window.location.replace("/humanResource-management/interface2");
          } else {
            console.error("Error creating employee:(res)", response);
          }
        }
      );
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit1}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          className: "update-form",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <label
            htmlFor="searchInput"
            style={{ marginRight: "100px", fontSize: "24px" }}
          >
            ID
          </label>
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            placeholder="Enter ID"
            onChange={change1}
          />
        </div>
        <button
          type="submit"
          style={{
            fontSize: "25px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            transition: "0.3s",
          }}
          onClick={searchClick}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#45a049";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#4CAF50";
          }}
        >
          Search
        </button>
      </form>
      <br />
      <br />
      <h2 style={{ textAlign: "center" }}>Registration Form</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
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
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nic">NIC:</label>
          <input type="text" id="NIC" name="nic" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
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
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" onChange={handleChange}>
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
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobRole">Job Role:</label>
          <input
            type="text"
            id="jobRole"
            name="jobRole"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="recruitmentDate">Recruitment Date:</label>
          <input
            type="date"
            id="recruitmentDate"
            name="recruitmentDate"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            name="salary"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="permanentStaff">Permanent Staff:</label>
          <input
            type="checkbox"
            id="permanentStaff"
            name="permanentStaff"
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
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="skillLevel">Skill Level:</label>
          <input
            type="text"
            id="skillLevel"
            name="skillLevel"
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
