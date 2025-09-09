// Formatting helpers

// Capitalize first letter of each word
export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Format rating to one decimal
export const formatRating = (rating) => {
  return rating ? rating.toFixed(1) : 0;
};

// Shorten text to a max length
export const truncateText = (text, maxLength = 100) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
