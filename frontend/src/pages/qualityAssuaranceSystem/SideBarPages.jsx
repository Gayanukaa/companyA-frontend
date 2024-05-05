import React, { useState, useEffect } from "react";
import CardComp from "./DashBord/CardComp";
import axios from 'axios';
import GetReport from './reports/GetReport'; 
import ReportGenerator from './reports/ReportGenerator';
import ReportDelete from './reports/ReportDelete';
import PrototypeOperations from './testSubjectOperations/PrototypeOperations';
import SampleOperations from './testSubjectOperations/SampleOperations';
import TestOperations from './tests/TestOperations';
import QAManagerView from './qaManager/QAManagerView';
import HealthAndSafetyPracticeInfo from "./healthAndSafetyPractice/healthAndSafetyPracticeInfo";
import PreviousReports from './reports/PreviousReports';
import cube from './data/cube.svg';
import testing from './data/testing.svg';
import assigned from './data/assigned.svg';
import sample from './data/sample.svg';
import { PieChart } from '@mui/x-charts/PieChart';




export function DashboardView(props) {
  const [receivedCount, setReceivedCount] = useState(0);
  const [assignedCount, setAssignedCount] = useState(0);
  const [testingCount, setTestingCount] = useState(0);
  const [receivedSampleCount, setReceivedSampleCount] = useState(0);
  const [assignedSampleCount, setAssignedSampleCount] = useState(0);
  const [testingSampleCount, setTestingSampleCount] = useState(0);

  const prototypeDataList = [
    {
        image: cube,
        altText: "Avatar 1",
        count: receivedCount,
        name: "No. of Prototypes Received"
    },
    {
        image: assigned,
        altText: "Avatar 2",
        count: assignedCount,
        name: "No. of Prototypes To be Tested"
        
    },
    {
        image: testing,
        altText: "Avatar 3",
        count: testingCount,
        name: "No. of Tests Initiated"
        
        
    }
];

const sampleDataList = [
  {
      image: sample,
      altText: "Avatar 1",
      count: receivedSampleCount,
      name: "No. of Samples Received"
  },
  {
      image: assigned,
      altText: "Avatar 2",
      count: assignedSampleCount,
      name: "No. of Samples To be Tested"
      
  },
  {
      image: testing,
      altText: "Avatar 3",
      count: testingSampleCount,
      name: "No. of Tests Initiated"
      
      
  }
];


  useEffect(() => {
    // Fetch prototype data
    axios.get('https://spring-boot-companya.azurewebsites.net/api/v1/prototypes/getAllPrototypes')
      .then(response => {
        const prototypesData = response.data;
        const receivedPrototypes = prototypesData.filter(prototype => prototype.testStatus === 'Received');
        const assignedPrototypes = prototypesData.filter(prototype => prototype.testStatus === 'Assigened');
        const testingPrototypes = prototypesData.filter(prototype => prototype.testStatus === 'Test initiated');

        setReceivedCount(receivedPrototypes.length);
        setAssignedCount(assignedPrototypes.length);
        setTestingCount(testingPrototypes.length);
      })
      .catch(error => {
        console.error('Error fetching prototypes:', error);
      });

    // Fetch sample data
    axios.get('https://spring-boot-companya.azurewebsites.net/api/v1/samples')
      .then(response => {
        console.log('Prototype data:', response.data);
        const samplesData = response.data;
        const receivedSamples = samplesData.filter(sample => sample.testStatus === 'Received');
        const assignedSamples = samplesData.filter(sample => sample.testStatus === 'Assigened');
        const testingSamples = samplesData.filter(sample => sample.testStatus === 'Test initiated');

        setReceivedSampleCount(receivedSamples.length);
        setAssignedSampleCount(assignedSamples.length);
        setTestingSampleCount(testingSamples.length);
      })
      .catch(error => {
        console.error('Error fetching samples:', error);
      });
  }, []);

  const sampledata = [
    { id: 0, value: receivedSampleCount, label: 'Received Test Subjects' },
    { id: 1, value: assignedSampleCount, label: 'Assigned Test Subjects' },
    { id: 2, value: testingSampleCount, label:'No of Tests Initiated'  },
    
  ]; 

  

  const prototypedata = [
    { id: 0, value: receivedCount, label: 'Received Test Subjects' },
    { id: 1, value: assignedCount, label: 'Assigned Test Subjects' },
    { id: 2, value: testingCount, label:'No of Tests Initiated'  },
    
  ]; 



  return (
    
    <div >
      <div style={{marginLeft:'20px', marginTop:'30px'}}>
        <h1>Prototype Status</h1>
      </div>
      <PieChart
            series={[
              {
                data: prototypedata,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            height={350}
            margin={{ top: 30, right: 10, bottom: 40, left: 10 }}
          />
      <div ><CardComp data={prototypeDataList} /></div>
      

      <div style={{marginLeft:'20px', marginTop:'60px'}}>
        <h1>Sample Status</h1>
      </div>
      
          <PieChart
          series={[
            {
              data:sampledata,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          height={350}
          margin={{ top: 30, right: 10, bottom: 40, left: 10 }}
        />
      <div  ><CardComp data={sampleDataList} /></div>
      <br></br>
          
     
    </div>
  );
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
          <div style={{ marginBottom: '40px' }}>
            <ReportDelete />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <PreviousReports />
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
        <HealthAndSafetyPracticeInfo />
      </div>
    );
}

