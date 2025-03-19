import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

/**
 * BarChartComponent to display a bar chart using recharts.
 * @param {Array} series - The series data for the chart.
 * @param {string} title - The title of the chart.
 */
const BarChartComponent = ({ series, title }) => {
  // Define the correct order for days of the week
  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Create a unified dataset with all unique x values
  const unifiedData = Array.from(
    new Set(series.flatMap((s) => s.data.map((item) => item.x)))
  )
    .sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)) // Sort by day order
    .map((x) => {
      const entry = { name: x };
      series.forEach((s, i) => {
        const matchingPoint = s.data.find((item) => item.x === x);
        entry[`series${i + 1}`] = matchingPoint ? matchingPoint.y : 0; // Use 0 for missing values
      });
      return entry;
    });

  return (
    <div>
      <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{title}</h3>
      <BarChart
        width={800} // Increased width
        height={500} // Increased height
        data={unifiedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {series.map((s, index) => (
          <Bar
            key={index}
            dataKey={`series${index + 1}`}
            fill={index === 0 ? '#8884d8' : '#82ca9d'} // Different colors for each series
          />
        ))}
      </BarChart>
    </div>
  );
};

// Sample data for sessions completed
export const sampleBarChartData = {
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

export default BarChartComponent;
