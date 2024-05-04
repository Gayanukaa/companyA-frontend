import React from "react";
import { Link } from "react-router-dom";

const buttonStyle = {
  width: "50%",
  height: "40px",
  position: "relative",
  border: "1px solid #000",
  backgroundColor: "#ADD8E6", // Light color added to the button
};

const textStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)", // Center the text horizontally and vertically
  fontSize: "24px",
  fontFamily: "Baskerville Old Face",
};

export default function Button1() {
  return (
    <div>
      <>
        <Link to="/humanResource-management/one-employee">
          <button style={buttonStyle}>
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <div style={textStyle}>One Employee</div>
            </div>
          </button>
        </Link>
        <Link to="/humanResource-management/all-employee">
          <button style={buttonStyle}>
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <div style={textStyle}>All Employee</div>
            </div>
          </button>
        </Link>
      </>
    </div>
  );
}
