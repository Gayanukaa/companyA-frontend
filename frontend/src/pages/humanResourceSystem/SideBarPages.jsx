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
import UpdateDetailForm from "./UpdateDetailsForm.jsx";

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
  const [val, setVal] = useState("");
  const [workHoursData, setWorkHoursData] = useState([]);
  const [otHoursData, setOtHoursData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalWorkedTime, setTotalWorkedTime] = useState("");

  const change1 = (event) => {
    setVal(event.target.value);
  };

  const change2 = (event) => {
    setStartDate(event.target.value);
  };

  const change3 = (event) => {
    setEndDate(event.target.value);
  };

  const formatDate = (dateString) => {
    const formattedDate = new Date(dateString).toISOString().split("T")[0];
    return formattedDate;
  };

  const searchClick = async () => {
    try {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      // Fetch work hours data
      reqSend.defaultReq(
        "GET",
        `PayRoll/WorkTime/WorkHours?employeeId=${val}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
        {},
        async (workHoursResponse) => {
          if (workHoursResponse.status === 200 && workHoursResponse.data) {
            const workHoursData = workHoursResponse.data;
            setWorkHoursData(workHoursData);
            document.getElementById("header3").innerHTML =
              JSON.stringify(workHoursData);
          } else {
            console.error("Failed to fetch work hours data");
          }
        },
        (error) => {
          console.error("Error fetching work hours data:", error);
        }
      );

      // Fetch OT hours data
      reqSend.defaultReq(
        "GET",
        `PayRoll/WorkTime/WorkOtHours?employeeId=${val}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
        {},
        (otHoursResponse) => {
          if (otHoursResponse.status === 200 && otHoursResponse.data) {
            const otHoursData = otHoursResponse.data;
            setOtHoursData(otHoursData);
            document.getElementById("header4").innerHTML =
              JSON.stringify(otHoursData);
          } else {
            console.error("Failed to fetch OT hours data");
          }
        },
        (error) => {
          console.error("Error fetching OT hours data:", error);
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
                <div></div>
              </div>
            </div>
          </form>
          <br />
          <br />
          <h5 id="header3" style={{ textAlign: "center" }}></h5>
          <br />
          <br />
          <h5 id="header4" style={{ textAlign: "center" }}></h5>
        </>
      </div>
      <footer>{totalWorkedTime && <p>{totalWorkedTime}</p>}</footer>
    </>
  );
}

export function UpdateEmployee(props) {
  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Update Employee</h1>
          </div>
        </div>
      </main>
      <div>
        <>
          <br />
          <br />
          <UpdateDetailForm />
        </>
      </div>
    </>
  );
}

export function Interface2(props) {
  //for Update method
  return (
    <div className="container">
      <h2 className="feedbackHeading">Employee Details Updated Successfully</h2>
    </div>
  );
}
export function Leave(props) {
  const [val, setVal] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const change1 = (event) => {
    setVal(event.target.value);
  };

  const change2 = (event) => {
    setYear(event.target.value);
  };

  const change3 = (event) => {
    setMonth(event.target.value);
  };

  const searchClick = () => {
    reqSend.defaultReq(
      "GET",
      `Leave/Balance?employeeId=${val}&year=${year}&month=${month}`,
      {},
      (response) => {
        if (response.status === 200 && response.data) {
          setEmployeeData(response.data);
        } else {
          console.error("Invalid response format:", response);
        }
      },
      (error) => {
        console.error("API request failed:", error);
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
            <h1>Leave</h1>
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
                    marginRight: "40px",
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
                    textAlign: "right",
                  }}
                >
                  Year:
                </label>
                <input
                  type="text"
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
                    textAlign: "right",
                  }}
                >
                  Month:
                </label>
                <input
                  type="text"
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

          {employeeData && (
            <div style={{ textAlign: "center" }}>
              <p>Leave Balance is {employeeData}</p>
            </div>
          )}
        </>
      </div>
    </>
  );
}
export function DeleteEmployee(props) {
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
        } else {
          console.error("Invalid response format:", response);
        }
      },
      (error) => {
        console.error("API request failed:", error);
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchClick();
  };

  const deleteClick = () => {
    reqSend.defaultReq(
      "DELETE",
      `https://spring-boot-companya.azurewebsites.net/Employee/${val}`,
      {},
      (response) => {
        if (response.status === 200 && response.data) {
          window.location.replace("/humanResource-management/interface3");
        } else {
          console.error("Invalid response format:", response);
        }
      },
      (error) => {
        console.error("API request failed:", error);
      }
    );
  };

  const deleteSubmit = (event) => {
    event.preventDefault();
    deleteClick();
  };
  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Delete</h1>
          </div>
        </div>
      </main>
      <div>
        <form
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
            />
          </div>
          <div style={{ display: "flex", marginRight: "60px" }}>
            <button
              type="submit"
              style={{ fontSize: "25px" }}
              onClick={handleSubmit}
              className="button"
            >
              Search
            </button>
            <button
              type="submit"
              style={{ fontSize: "25px" }}
              onClick={deleteSubmit}
              className="button"
            >
              Delete
            </button>
          </div>
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
export function Interface3(props) {
  //for delete Employee method
  return (
    <div className="container">
      <h2 className="feedbackHeading">Employee Removed Successfully</h2>
    </div>
  );
}
