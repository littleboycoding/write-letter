function formatDate(date: Date): string {
  return `on ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
}

export default formatDate;
