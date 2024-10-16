export const generateContributionGraph = (contributionDays: { date: string, contributionCount: number }[]) => {
  const dayWidth = 12;
  const dayHeight = 12;
  const dayPadding = 2;
  const weekPadding = 5;
  const svgPadding = 10;

  const weeks = [];
  let currentWeek: { date: string, contributionCount: number }[] = [];

  // Group the contribution days into weeks (each week has 7 days)
  for (let i = 0; i < contributionDays.length; i++) {
    currentWeek.push(contributionDays[i]);

    // If the week is complete (7 days), push it to weeks array and reset
    if (currentWeek.length === 7 || i === contributionDays.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  const numWeeks = weeks.length;
  const svgHeight = 7 * (dayHeight + dayPadding) + 2 * svgPadding; // 7 days in a week
  const svgWidth = numWeeks * (dayWidth + weekPadding) + 2 * svgPadding;

  // Function to determine fill color based on contribution count
  function getFillColor(count: number): string {
    if (count === 0) return "#303030"; // Light gray (no contributions)
    if (count <= 5) return "#8be9fd"; // Light blue
    if (count <= 10) return "#50fa7b"; // Light green
    if (count <= 20) return "#ffb86c"; // Orange
    return "#ff5555"; // Red (most contributions)
  }

  return `
  <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    ${weeks.map((week, weekIndex) => week.map((day, dayIndex) => {
    const x = svgPadding + weekIndex * (dayWidth + weekPadding);
    const y = svgPadding + dayIndex * (dayHeight + dayPadding);
    const fillColor = getFillColor(day.contributionCount);
    return `<rect x="${x}" y="${y}" width="${dayWidth}" height="${dayHeight}" fill="${fillColor}" stroke="#dddddd" stroke-width="0.5" rx="2" ry="2" />`;
  }).join('')).join('')}
  </svg>
  `
}