export function salaryPerSetting(salary, setting) {
  switch (setting) {
    case "Annual":
      return Number(salary);
    case "Monthly":
      return salary / 12;
    case "Weekly":
      return salary / 52;
    case "Daily":
      return salary / 365;
    case "Hourly":
      return salary / 2080;
  }
}
