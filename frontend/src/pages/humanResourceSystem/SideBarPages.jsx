import React, { useState } from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from "../../components/sideComps/TableComp";
import avatar from "../../assets/avatar.svg";
import Button1 from "./Button1";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button2 from "./Button2";
import DashboardCards from "./DashboardCards";
import * as reqSend from "../../global/reqSender.jsx";
import { useEffect } from "react";
import SearchAll from "./SearchAll.jsx";
import SearchOne from "./SearchOne.jsx";
import EmployeeDetailForm from "./EmployeeDetailsForm.jsx";

export function DashboardView(props) {
  const dataList = [
    {
      image: avatar,
      altText: "Avatar 1",
      count: 125,
      name: "All Employees",
    },
    {
      image: avatar,
      altText: "Avatar 2",
      count: 109,
      name: "Today Attendance",
    },
  ];

  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Dashboard</h1>
          </div>

          <DashboardCards data={dataList} />
        </div>
      </main>
    </>
  );
}

export function Employee(props) {
  return (
    <>
      <Button2 />
    </>
  );
}

export function Attendance(props) {
  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Attendance</h1>
          </div>
        </div>
      </main>
      <div>
        <>
          <Button1 />
        </>
      </div>
    </>
  );
}
export function Search(props) {
  const [val, setVal] = useState("");
  const [employeeData, setEmployeeData] = useState(null); // Initialize state as null

  const change = (event) => {
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
        } else if (response.status === 404) {
          location.reload();
        } else {
          window.location.reload();
          console.error("Invalid response format:", response);
          location.reload();
        }
      },
      (error) => {
        console.error("API request failed:", error);
        location.reload();
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchClick();
  };

  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Search</h1>
          </div>
        </div>
      </main>
      <div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
              onChange={change}
              value={val}
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

        {employeeData && (
          <div style={{ marginTop: "20px" }}>
            <h2>Employee Details</h2>
            <form className="form-detail">
              {Object.entries(employeeData).map(([key, value]) => (
                <div key={key} style={{ marginBottom: "10px" }}>
                  <label htmlFor={key}>{key} :</label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={value}
                    readOnly
                  />
                </div>
              ))}
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export function SearchOneEmployee(props) {
  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>One Employee</h1>
          </div>
        </div>
      </main>
      <div>
        <>
          <Button1 />
          <SearchOne />
        </>
      </div>
    </>
  );
}

export function SearchAllEmployee(props) {
  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>All Employee</h1>
          </div>
        </div>
      </main>
      <div>
        <>
          <Button1 />
          <br />
          <br />
          <SearchAll />
        </>
      </div>
    </>
  );
}

export function AddEmployee(props) {
  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Add Employee</h1>
          </div>
        </div>
      </main>
      <h5>.</h5>
      <EmployeeDetailForm />
    </>
  );
}
export function Interface1(props) {
  //for add Employee method
  return (
    <div className="container">
      <h2 className="feedbackHeading" id="interface">
        Employee Created Successfully
      </h2>
    </div>
  );
}
export function MarkAttendance(props) {
  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Mark Attendance</h1>
          </div>
        </div>
      </main>
    </>
  );
}
