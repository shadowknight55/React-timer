import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

/**
 * PieChartComponent to display a pie chart using recharts.
 * @param {Array} series - The series data for the chart.
 * @param {string} title - The title of the chart.
 */
const PieChartComponent = ({ series, title }) => {
  // Combine all series into a single dataset for the pie chart
  const combinedData = series.flatMap((s, index) =>
    s.data.map((item) => ({
      name: `${s.label} - ${item.x}`,
      value: item.y,
      color: index === 0 ? '#8884d8' : '#82ca9d', // Different colors for each series
    }))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
      <PieChart width={400} height={400}>
        <Pie
          data={combinedData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150} // Adjusted radius for better spacing
          fill="#8884d8"
          label
        >
          {combinedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Legend layout="vertical" align="right" verticalAlign="middle" />
    </div>
  );
};

export default PieChartComponent;
