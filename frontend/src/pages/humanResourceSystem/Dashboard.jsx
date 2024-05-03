import "../../styles/dashboard.css";
import "../../styles/style.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import avatar from "../../assets/avatar.svg";
import {
  SideNavigation,
  TopBar,
} from "../../components/sideComps/dashBoardComps";
import { dashboardAdminData } from "./data/DashBoardData";

import {
  DashboardView,
  Employee,
  Attendance,
  Search,
  SearchAllEmployee,
  SearchOneEmployee,
  AddEmployee,
} from "./SideBarPages";

export default function Dashboard() {
  const addJs = () => {
    const allSideMenu = document.querySelectorAll(
      "#sidebar .side-menu.top li a"
    );

    allSideMenu.forEach((item) => {
      const li = item.parentElement;

      item.addEventListener("click", function () {
        allSideMenu.forEach((i) => {
          i.parentElement.classList.remove("active");
        });
        li.classList.add("active");
      });
    });

    // TOGGLE SIDEBAR
    const menuBar = document.querySelector("#content nav .bx.bx-menu");
    const sidebar = document.getElementById("sidebar");

    menuBar.addEventListener("click", function () {
      sidebar.classList.toggle("hideSidebar");
    });

    const switchMode = document.getElementById("switch-mode");
    const wrapper = document.getElementById("dashboardWrapper");

    switchMode.addEventListener("change", function () {
      if (this.checked) {
        wrapper.classList.add("dark");
      } else {
        wrapper.classList.remove("dark");
      }
    });
  };

  useEffect(() => {
    addJs();
  }, []);

  return (
    <>
      <div id="dashboardWrapper">
        <SideNavigation data={dashboardAdminData} />

        <section
          id="content"
          style={{ height: "100vh" }}
          className="dashboard-wallpaper"
        >
          <TopBar avatar={avatar} />

          <Routes>
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/search-employee" element={<Search />} />
            <Route path="/one-employee" element={<SearchOneEmployee />} />
            <Route path="/all-employee" element={<SearchAllEmployee />} />
            <Route path="/add-employee" element={<AddEmployee />} />
          </Routes>
        </section>
      </div>
    </>
  );
}
