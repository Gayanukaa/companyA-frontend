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
  const [val1, setVal1] = useState("");
  const [signInData, setSignInData] = useState(null);

  const change1 = (event) => {
    setVal1(event.target.value);
  };

  const signInClick = () => {
    reqSend.defaultReq(
      "POST",
      `Attendance/SignIn/${val1}`,
      {},
      (response) => {
        if (response.status === 200 && response.data) {
          setSignInData(response.data);
          console.log("Attendance marked");
          var element = document.getElementById("attendance");
          var stringToPass = "Sign In Successful!";
          element.innerText = stringToPass;
          // to refresh the page
          setTimeout(function () {
            location.reload();
          }, 1000);
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
    signInClick();
  };

  const [val2, setVal2] = useState("");
  const [signOutData, setSignOutData] = useState(null);

  const change2 = (event) => {
    setVal2(event.target.value);
  };

  const signOutClick = () => {
    reqSend.defaultReq(
      "POST",
      `Attendance/SignOut/${val2}`,
      {},
      (response) => {
        if (response.status === 200 && response.data) {
          setSignOutData(response.data);
          var element = document.getElementById("attendance");
          var stringToPass = "Sign Out Successful!";
          element.innerText = stringToPass;
          // to refresh the page
          setTimeout(function () {
            location.reload();
          }, 1000);
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

  const handleSubmit2 = (event) => {
    event.preventDefault();
    signOutClick();
  };
  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Mark Attendance</h1>
          </div>
        </div>
      </main>
      <div>
        <div className="signin-container">
          <div className="signin-box">
            <h2>Sign In</h2>
            <div>
              <label className="input-label" htmlFor="id">
                ID:
              </label>
              <input
                className="input-field"
                type="text"
                id="id"
                name="id"
                onChange={change1}
              />
            </div>
            <button className="signin-button" onClick={handleSubmit1}>
              Enter
            </button>
          </div>
          <div className="signin-box">
            <h2>Sign Out</h2>
            <div>
              <label className="input-label" htmlFor="id2">
                ID:
              </label>
              <input
                className="input-field"
                type="text"
                id="id2"
                name="id2"
                onChange={change2}
              />
            </div>
            <button className="signin-button" onClick={handleSubmit2}>
              Enter
            </button>
          </div>
        </div>
        <h3
          id="attendance"
          style={{ textAlign: "center", marginTop: "40px" }}
        ></h3>
      </div>
    </>
  );
}
export function WorkTime(props) {
  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Work Time</h1>
          </div>
        </div>
      </main>
      <div>
        <>
          <form onSubmit={handleSubmit}>
            <div
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
                  style={{
                    width: "100px",
                    marginRight: "100px",
                    fontSize: "20px",
                    textAlign: "right",
                  }}
                >
                  ID:
                </label>
                <input
                  type="text"
                  placeholder="Enter ID"
                  id="id"
                  name="id"
                  onChange={change1}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <label
                  style={{
                    width: "100px",
                    marginRight: "40px",
                    fontSize: "20px",
                  }}
                >
                  Start Date:
                </label>
                <input
                  type="date"
                  placeholder="Enter Year"
                  id="year"
                  name="year"
                  onChange={change2}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <label
                  style={{
                    width: "100px",
                    marginRight: "40px",
                    fontSize: "20px",
                    textAlign: "left",
                  }}
                >
                  End Date:
                </label>
                <input
                  type="date"
                  placeholder="Enter Month"
                  id="month"
                  name="month"
                  onChange={change3}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <button className="button" onClick={searchClick}>
                  Search
                </button>
              </div>
            </div>
          </form>
        </>
      </div>
      <footer>{totalWorkedTime && <p>{totalWorkedTime}</p>}</footer>
    </>
  );
}
