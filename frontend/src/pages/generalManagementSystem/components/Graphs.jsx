import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';


const chartSetting = {
  xAxis: [
    {
      label: 'Stocks',
    },
  ],
  width: 1000,
  height: 500,
};



const valueFormatter = (value) => `${value}mm`;

export function BarGraphComponent(props) {

  const { barGraphData } = props;


  useEffect(() => {
    if (props.barGraphData) {
      console.log(props.barGraphData);
    }
  }, [props.barGraphData])

  if (!barGraphData) {
    return null;
  }

  const dataset = Object.entries ? Object.entries(props.barGraphData).map(([label, value]) => ({
    label,
    value,
  })) : [];

  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'label' }]}
      series={[{ dataKey: 'value', label: 'Stocks', valueFormatter }]}
      layout="horizontal"
      colors={['#1976D2']}
      grid={{ vertical: true }}
      {...chartSetting}
    />
  );
}




export function SimpleLineChart(props) {
  const [graphData, setGraphData] = useState([]);
  const [salesValues, setSalesValues] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  useEffect(() => {
    if (props.lineGraphData) {
      setGraphData(props.lineGraphData);
    }
  }, [props.lineGraphData]);

  useEffect(() => {
    if (graphData && Object.keys(graphData).length > 0) {
      const sortedDates = Object.keys(graphData).sort();
      const sortedValues = sortedDates.map(date => graphData[date]);
      setSalesValues(sortedValues);
      setXLabels(sortedDates);
    }
  }, [graphData]);

  return (
    <>
      {salesValues.length > 0 && xLabels.length > 0 && (
        <LineChart
          width={1000}
          height={500}
          series={[
            { data: salesValues, label: 'Sales', color: '#1976D2' },
          ]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
        />
      )}
    </>
  );
}



export function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      width={500}
      height={300}
    />
  );
}