import per1 from "../../../assets/person/person (1).jpeg";
import per2 from "../../../assets/person/person (2).jpeg";
import per3 from "../../../assets/person/person (3).jpeg";
import per4 from "../../../assets/person/person (4).jpeg";
import per5 from "../../../assets/person/person (5).jpeg";
import per6 from "../../../assets/person/person (6).jpeg";
import per7 from "../../../assets/person/person (7).jpeg";
import per8 from "../../../assets/person/person (8).jpeg";

export const personImages = [per1, per2, per3, per4, per5, per6, per7, per8];

export const dashboardAdminData = [
  {
    name: "Dashboard",
    icon: <i className="bx bxs-dashboard"></i>,
    active: true,
    to: "dashboard",
  },
  {
    name: "Employee",
    icon: <i className="bx bxs-user-plus"></i>,
    active: false,
    to: "employee",
  },
  {
    name: "Attendance",
    icon: <i className="bx bxs-user-plus"></i>,
    active: false,
    to: "attendance",
  },
  {
    name: "Mark Attendance",
    icon: <i className="bx bxs-user-plus"></i>,
    active: false,
    to: "mark-attendance",
  },
  {
    name: "Work Time",
    icon: <i className="bx bxs-user-plus"></i>,
    active: false,
    to: "work-time",
  },
  {
    name: "Leave",
    icon: <i className="bx bxs-user-plus"></i>,
    active: false,
    to: "leave",
  },
];
