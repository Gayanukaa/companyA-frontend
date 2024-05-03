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
}
