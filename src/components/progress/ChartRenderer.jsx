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
      return (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <Pie
              data={data}
              dataKey="y"
              nameKey="x"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip />
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
