/**
 * Utility function to generate seeded timer data
 */
export const generateSeedData = () => {
  const tasks = [
    'Coding',
    'Reading',
    'Exercise',
    'Meditation',
    'Study',
    'Work',
    'Project Planning',
    'Email',
    'Meeting',
    'Break'
  ];

  // Task weights - some tasks are more common than others
  const taskWeights = [
    0.25, // Coding (25%)
    0.15, // Reading (15%)
    0.10, // Exercise (10%)
    0.05, // Meditation (5%)
    0.15, // Study (15%)
    0.10, // Work (10%)
    0.05, // Project Planning (5%)
    0.05, // Email (5%)
    0.05, // Meeting (5%)
    0.05  // Break (5%)
  ];

  const data = [];
  const now = new Date();
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);

  // Generate data for each day
  for (let date = new Date(threeMonthsAgo); date <= now; date.setDate(date.getDate() + 1)) {
    // Skip some days (weekends have fewer sessions)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    if (isWeekend && Math.random() > 0.7) continue; // 30% chance to skip weekend days
    
    // Generate 1-5 sessions per day (fewer on weekends)
    const maxSessions = isWeekend ? 3 : 5;
    const sessionsPerDay = Math.floor(Math.random() * maxSessions) + 1;
    
    // Create time slots for the day (morning, afternoon, evening)
    const timeSlots = [
      { start: 8, end: 12 },  // Morning
      { start: 13, end: 17 }, // Afternoon
      { start: 18, end: 22 }  // Evening
    ];
    
    for (let i = 0; i < sessionsPerDay; i++) {
      const sessionDate = new Date(date);
      
      // Pick a time slot
      const slot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
      const hour = slot.start + Math.floor(Math.random() * (slot.end - slot.start));
      const minute = Math.floor(Math.random() * 60);
      
      sessionDate.setHours(hour);
      sessionDate.setMinutes(minute);
      
      // Duration varies by task type
      let duration;
      const taskIndex = weightedRandomChoice(taskWeights);
      const task = tasks[taskIndex];
      
      // Different tasks have different typical durations
      if (task === 'Exercise' || task === 'Meditation') {
        duration = Math.floor(Math.random() * 1800) + 900; // 15-45 minutes
      } else if (task === 'Email' || task === 'Break') {
        duration = Math.floor(Math.random() * 900) + 300; // 5-20 minutes
      } else {
        duration = Math.floor(Math.random() * 3600) + 900; // 15-75 minutes
      }
      
      // Completion rate varies by task
      let completed;
      if (task === 'Break') {
        completed = Math.random() > 0.1; // 90% completion for breaks
      } else if (task === 'Exercise' || task === 'Meditation') {
        completed = Math.random() > 0.3; // 70% completion for exercise/meditation
      } else {
        completed = Math.random() > 0.2; // 80% completion for other tasks
      }
      
      data.push({
        timestamp: sessionDate.toISOString(),
        duration,
        task,
        completed
      });
    }
  }

  return data;
};

/**
 * Helper function to make a weighted random choice
 */
function weightedRandomChoice(weights) {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * total;
  
  for (let i = 0; i < weights.length; i++) {
    if (random < weights[i]) {
      return i;
    }
    random -= weights[i];
  }
  
  return weights.length - 1; // Fallback to last item
} 