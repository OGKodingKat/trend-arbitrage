// Calculates a "rising score" for trends.
// - Combines engagement and recency to determine how "hot" a trend is.

export function calculateRisingScore(trend) {
  const { engagement, createdAt } = trend;

  // Calculate time difference in hours.
  const hoursSinceCreation = (Date.now() - new Date(createdAt)) / (1000 * 60 * 60);

  // Higher engagement and more recent trends get higher scores.
  const score = engagement / Math.sqrt(hoursSinceCreation + 1);

  return score; // Return the calculated score.
}