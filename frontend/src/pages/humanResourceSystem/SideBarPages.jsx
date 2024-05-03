import React from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from "../../components/sideComps/TableComp";
import avatar from "../../assets/avatar.svg";
import DashboardCards from "./DashboardCards";

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
