export const formatDate = (date: Date, includeTime: boolean = false, dayOffset: number = 0) => {
  const localdate = new Date(date);
  localdate.setDate(localdate.getDate() + dayOffset);

  if (!includeTime) {
    let hour: number | string = localdate.getHours();
    hour = hour < 10 ? '0' + hour : String(hour);
    let minutes: number | string = localdate.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : String(minutes);

    return date.toString().split(`${hour}:${minutes}`)[0];
  }

  return localdate.toString().split('GMT')[0];
};
