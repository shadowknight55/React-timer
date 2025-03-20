import React from 'react';
import LineChartComponent from '../charts/LineChartComponent';
import BarChartComponent from '../charts/BarChartComponent';
import PieChartComponent from '../charts/PieChartComponent';

/**
 * ChartRenderer component to render the appropriate chart based on the chart type.
 * @param {string} chartType - The type of chart to render (line, bar, pie).
 * @param {Array} sessionData - The session data to display in the chart.
 */
const ChartRenderer = ({ chartType, sessionData }) => {
  const sampleLineChartData = {
    daily: [
      { x: 'Monday', y: 3 },
      { x: 'Tuesday', y: 5 },
      { x: 'Wednesday', y: 2 },
      { x: 'Thursday', y: 4 },
      { x: 'Friday', y: 6 },
      { x: 'Saturday', y: 1 },
      { x: 'Sunday', y: 3 },
    ],
  };

  switch (chartType) {
    case 'bar':
      return (
        <BarChartComponent
          series={[
            { data: sessionData, label: 'Session Durations (Minutes)' },
            { data: sampleLineChartData.daily, label: 'Sample Daily Data' },
          ]}
          title="Bar Chart"
        />
      );
    case 'pie':
      return (
        <PieChartComponent
          series={[
            { data: sessionData, label: 'Session Durations (Minutes)' },
            { data: sampleLineChartData.daily, label: 'Sample Daily Data' },
          ]}
          title="Pie Chart"
        />
      );
    case 'line':
    default:
      return (
        <LineChartComponent
          series={[
            { data: sessionData, label: 'Session Durations (Minutes)' },
            { data: sampleLineChartData.daily, label: 'Sample Daily Data' },
          ]}
          title="Line Chart"
        />
      );
  }
};

export default ChartRenderer;
