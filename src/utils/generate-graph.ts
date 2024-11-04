export const generateContributionGraph = (
  contributionDays: { date: string; contributionCount: number }[]
) => {
  const dayWidth = 13;
  const dayHeight = 13;
  const dayPadding = 2;
  const weekPadding = 5;
  const svgPadding = 0;

  const weeks = [];
  let currentWeek: { date: string; contributionCount: number }[] = [];

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
  const svgHeight = 7 * (dayHeight + dayPadding) + 2 * svgPadding;
  const svgWidth = numWeeks * (dayWidth + weekPadding) + 2 * svgPadding;

  function getFillColor(count: number): string {
    if (count === 0) return "#191919"; // Darkest green for count 0
    if (count <= 5) return "#14532D"; // Dark green for count <= 5
    if (count <= 10) return "#1E7A1E"; // Medium dark green for count <= 10
    if (count <= 20) return "#28A745"; // Medium green for count <= 20
    return "#00ef57"; // Light green for count > 20
  }

  return `
  <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    ${weeks
      .map((week, weekIndex) =>
        week
          .map((day, dayIndex) => {
            const x = svgPadding + weekIndex * (dayWidth + weekPadding);
            const y = svgPadding + dayIndex * (dayHeight + dayPadding);
            const fillColor = getFillColor(day.contributionCount);
            return `<rect x="${x}" y="${y}" width="${dayWidth}" height="${dayHeight}" fill="${fillColor}" strokeWidth="0.5" rx="2" ry="2" />`;
          })
          .join("")
      )
      .join("")}
  </svg>
  `;
};
