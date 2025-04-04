import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useTheme } from '@mui/material';

/**
 * ChartRenderer component to render the appropriate chart based on the chart type.
 * @param {string} chartType - The type of chart to render (line, bar, pie).
 * @param {Array} sessionData - The session data to display in the chart.
 */
const ChartRenderer = ({ data, chartType }) => {
  const theme = useTheme();
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.primary.light,
    theme.palette.secondary.main,
    theme.palette.secondary.light,
    theme.palette.success.main,
    theme.palette.warning.main
  ];

  if (!data || data.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 400,
        color: theme.palette.text.secondary 
      }}>
        <Typography>
          No session data available yet
        </Typography>
      </Box>
    );
  }

  switch (chartType) {
    case 'pie':
      // Sort data by value (minutes) in descending order
      const sortedData = [...data].sort((a, b) => b.y - a.y);
      
      // Take top 5 entries and sum the rest into "Other"
      const pieData = sortedData.slice(0, 5);
      if (sortedData.length > 5) {
        const otherSum = sortedData
          .slice(5)
          .reduce((sum, item) => sum + item.y, 0);
        
        if (otherSum > 0) {
          pieData.push({
            x: 'Other',
            y: otherSum
          });
        }
      }

      return (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <Pie
              data={pieData}
              dataKey="y"
              nameKey="x"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label={({ name, percent }) => 
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} minutes`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );

    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="y" name="Session Duration" fill={theme.palette.primary.main} />
          </BarChart>
        </ResponsiveContainer>
      );

    case 'line':
    default:
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="y" 
              name="Session Duration"
              stroke={theme.palette.primary.main} 
            />
          </LineChart>
        </ResponsiveContainer>
      );
  }
};

export default ChartRenderer;
