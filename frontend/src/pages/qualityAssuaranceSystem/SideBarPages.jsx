import React from "react";
import CardComp from "../../components/sideComps/CardComp";
import TableComp from '../../components/sideComps/TableComp'
import avatar from '../../assets/avatar.svg';

import GetReport from './reports/GetReport'; 
import ReportGenerator from './reports/ReportGenerator';
import ReportDelete from './reports/ReportDelete';
import PrototypeOperations from './testSubjectOperations/PrototypeOperations';
import SampleOperations from './testSubjectOperations/SampleOperations';
import TestOperations from './tests/TestOperations';
import QAManagerView from './qaManager/QAManagerView';
import healthAndSafetyPracticeInfo from './healthAndSafetyPractice/healthAndSafetyPracticeInfo';



export function DashboardView(props) {

    const dataList = [
        {
            image: avatar,
            altText: "Avatar 1",
            count: 5,
            name: "John Doe"
        },
        {
            image: avatar,
            altText: "Avatar 2",
            count: 3,
            name: "Jane Smith"
        },
        {
            image: avatar,
            altText: "Avatar 3",
            count: 7,
            name: "Bob Johnson"
        }
    ];

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Dashboard</h1>
                    </div>

                    <CardComp data={dataList} />
                </div>
            </main>
        </>
    )
}


export function Reports(props) {
    return (
        <div className="Reports" style={{ marginLeft: '20px' }}>
          <h1>Reports</h1>
          <div style={{ margin: '20px 0' }}>
            <ReportGenerator reportType="sample" buttonText="Generate Sample Report" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <ReportGenerator reportType="prototype" buttonText="Generate Prototype Report" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <GetReport />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <ReportDelete />
          </div>
        </div>
      );
}

export function PrototypeOps(props) {
    return (
        <div className="Prototypes" style={{ marginLeft: '20px' }}>
          <h1>Prototypes</h1>
          <PrototypeOperations />
        </div>
      );
}

export function SampleOps(props) {
    return (
        <div className="Samples" style={{ marginLeft: '20px' }}>
          <h1>Samples</h1>
          <SampleOperations />
        </div>
      );
}

export function TestOps(props) {
    return (
        <div className="Tests" style={{ marginLeft: '20px' }}>
          <h1>Tests</h1>
          <TestOperations/>
        </div>
      );
}

export function ManagerOps(props) {
    return (
        <div className="QAManager">
          <QAManagerView/>
        </div>
      );
}

export function SafetyOps(props) {
  return (
      <div className="HealthSafetyPractices">
        <healthAndSafetyPracticeInfo/>
      </div>
    );
}

