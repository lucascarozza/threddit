export const formatTime = (created) => {
  const now = new Date();
  const postDate = new Date(created * 1000);
  const diffInMinutes = Math.floor((now - postDate) / 60000);

  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  if (diffInMinutes < 1440) return `${Math.round(diffInMinutes / 60)} hr ago`;
  if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)} d ago`;
  if (diffInMinutes < 43200)
    return `${Math.floor(diffInMinutes / 10080)} wk ago`;
  if (diffInMinutes < 525600)
    return `${Math.floor(diffInMinutes / 43200)} mo ago`;
  return `${Math.floor(diffInMinutes / 525600)} yr ago`;
};

export const formatScore = (score) => {
  if (score >= 1e6) return `${(score / 1e6).toFixed(1)}m`;
  if (score >= 1e3) return `${(score / 1e3).toFixed(1)}k`;
  return score.toString();
};
