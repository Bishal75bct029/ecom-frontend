export const formatDate = (date: Date, includeTime = false, dayOffset = 0) => {
  date.setDate(date.getDate() + dayOffset);

  if (!includeTime) {
    let hour: number | string = date.getHours();
    hour = hour < 10 ? '0' + hour : String(hour);
    let minutes: number | string = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : String(minutes);

    return date.toString().split(`${hour}:${minutes}`)[0];
  }

  return date.toString().split('GMT')[0];
};
