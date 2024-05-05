import React, { useState } from "react";
import * as reqSend from "../../global/reqSender.jsx";

export default function SearchAll() {
  const [selectedDate, setSelectedDate] = useState(""); // State to store selected date
  const [attendanceData, setAttendanceData] = useState([]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Store selected date as string
  };

  const searchAttendance = () => {
    if (selectedDate) {
      const formattedDate = new Date(selectedDate).toISOString().split("T")[0]; // Convert selected date string to ISO format
      reqSend.defaultReq(
        "GET",
        `Attendance/GetDailyAttendance/${formattedDate}`,
        {},
        (response) => {
          if (response.status === 200 && response.data) {
            setAttendanceData(response.data);
            //document.getElementById("error").innerHTML = "Employee Not Found";
          } else {
            console.error("Invalid response format:", response);
          }
        },
        (error) => {
          console.error("API request failed:", error);
        }
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchAttendance();
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <div>
            <label style={{ marginRight: "10px", fontSize: "25px" }}>
              Date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              style={{ marginLeft: "40px" }}
            />
            <br />
            <br />
          </div>
          <button type="submit" className="button">
            Search
          </button>
        </form>
      </div>

      <table
        style={{ borderCollapse: "collapse", width: "80%", margin: "auto" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Sign In Time</th>
            <th>Sign Out Time</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item) => (
            <tr key={item.id}>
              <td>{item.employeeId}</td>
              <td>{item.signInTime.split("T")[1].split(".")[0]}</td>
              <td>{item.signOutTime.split("T")[1].split(".")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
