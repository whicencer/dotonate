export function formatDate(date: Date) {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const hour = newDate.getHours();
  const minutes = newDate.getMinutes();
  const year = newDate.getFullYear();
  const currentYear = new Date().getFullYear();
  
  const returnYear = year === currentYear ? "" : ", " + year;
  const hourTo12 = hour % 12 || 12;
  const amPm = hour >= 12 ? "PM" : "AM";

  return `${monthNumToString(month)} ${day}${returnYear} at ${hourTo12}:${minutes} ${amPm}`;
}

function monthNumToString(month: number) {
  const months = "January,February,March,April,May,June,July,August,September,October,November,December".split(",");
  return months[month];
}