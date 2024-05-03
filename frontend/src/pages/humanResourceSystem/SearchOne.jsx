import React, { useEffect, useState } from "react";
import * as reqSend from "../../global/reqSender.jsx";

export default function SearchOne() {
  const [val, setVal] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  const change = (event) => {
    setVal(event.target.value);
  };

  const searchClick = () => {
    reqSend.defaultReq(
      "GET",
      `Attendance/GetWeeklyAttendance/${val}`,
      {},
      (response) => {
        if (response.status === 200 && response.data) {
          const formattedData = response.data.map((item) => ({
            ...item,
            signInTime: formatTime(item.signInTime),
            signOutTime: formatTime(item.signOutTime),
          }));
          setAttendanceData(formattedData);
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

  // Function to format time to HH:mm format
  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <>
      <br />
      <br />
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
              ID :
            </label>
            <input
              onChange={change}
              type="text"
              id="searchInput"
              name="searchInput"
              placeholder="Enter ID"
            />
          </div>
          <button type="submit" className="button">
            Search
          </button>
        </form>
      </div>
      <br />
      <br />

      <table
        style={{ borderCollapse: "collapse", width: "80%", margin: "auto" }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Sign In Time</th>
            <th>Sign Out Time</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.signInTime}</td>
              <td>{item.signOutTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </>
  );
}
