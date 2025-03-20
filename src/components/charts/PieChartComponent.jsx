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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>{title}</h3>
      <PieChart width={500} height={500}>
        <Pie
          data={combinedData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={180} // Increased radius for better visibility
          fill="#8884d8"
        >
          {combinedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
    
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
