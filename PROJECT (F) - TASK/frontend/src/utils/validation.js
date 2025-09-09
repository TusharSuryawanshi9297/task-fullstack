// Name: 20-60 characters
export const validateName = (name) => {
  if (!name) return false;
  const trimmed = name.trim();
  return trimmed.length >= 20 && trimmed.length <= 60;
};

// Address: max 400 characters
export const validateAddress = (address) => {
  if (!address) return false;
  return address.trim().length <= 400;
};

// Password: 8-16 chars, at least 1 uppercase & 1 special char
export const validatePassword = (password) => {
  if (!password) return false;
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
  return regex.test(password);
};

// Email: standard email format
export const validateEmail = (email) => {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return regex.test(email);
};

// Rating: 1-5 (optional utility)
export const validateRating = (rating) => {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5;
};
