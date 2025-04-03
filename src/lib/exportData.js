/**
 * Utility function to export timer data to CSV
 */
export const exportTimerData = (timerData) => {
  // Convert data to CSV format
  const headers = ['Date', 'Duration (minutes)', 'Task', 'Completed'];
  const csvRows = [headers];

  timerData.forEach(session => {
    const date = new Date(session.timestamp).toLocaleDateString();
    const duration = Math.round(session.duration / 60); // Convert seconds to minutes
    const task = session.task || 'No task specified';
    const completed = session.completed ? 'Yes' : 'No';
    
    csvRows.push([date, duration, task, completed]);
  });

  // Convert to CSV string
  const csvContent = csvRows.map(row => row.join(',')).join('\n');
  
  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `timer-data-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 