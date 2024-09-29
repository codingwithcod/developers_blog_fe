export const timeAgo = (date: Date) => {
  const now = new Date().getTime();
  const seconds = Math.floor((now - new Date(date).getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 }, // 365 * 24 * 60 * 60
    { label: "month", seconds: 2592000 }, // 30 * 24 * 60 * 60
    { label: "week", seconds: 604800 }, // 7 * 24 * 60 * 60
    { label: "day", seconds: 86400 }, // 24 * 60 * 60
    { label: "hour", seconds: 3600 }, // 60 * 60
    { label: "minute", seconds: 60 }, // 60
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);

    if (count > 0) {
      return count === 1 ? `1 ${interval.label} ago` : `${count} ${interval.label}s ago`;
    }
  }

  return "just now";
};
