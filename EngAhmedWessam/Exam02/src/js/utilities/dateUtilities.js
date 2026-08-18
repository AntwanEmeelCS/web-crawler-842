export default class dateUtilities {
  static formatDateToday() {
    const now = new Date();
    const dateOnly = now.toLocaleDateString();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  static formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  static formatTimeNow() {
    const now = new Date();
    const timeOnly = now.toLocaleTimeString();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  static formatTime(IsoStringDateTime) {
    const date = new Date(IsoStringDateTime);

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime;
  }

  static subtractDaysFromToday(days) {
    const result = new Date();
    result.setDate(result.getDate() - days);
    return result;
  }

  static getDayOfWeekName(inputDate, formatStyle) {
    return inputDate.toLocaleDateString("en-US", { weekday: formatStyle });
  }
}
