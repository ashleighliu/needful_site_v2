export const getCurrentDateFormatted = () => {
  const date = new Date();

  // Get year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  // Format the date as YYYY-MM-DD
  return `${year}-${month}-${day}`;
};

export const getDateFormatted = (date: Date | null) => {
  if (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    // Format the date as YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  return "";
};

export const getCurrentDay = () => {
  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = date.getDay(); // getDay() returns a number from 0 (Sunday) to 6 (Saturday)
  return days[dayIndex]; // Return the corresponding day name
};
