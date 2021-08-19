const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

interface today {
    day : string,
    date : number,
    month : string,
    year : number,
    hour : number,
    minute : number,
    second : number,
}

interface formatToday {
  day : string,
  date : string,
  month : string,
  year : number,
  hour : string,
  minute : string,
  second : string,
}


export const todayGetDay = () : formatToday => {
  const today = new Date()
  const formatToday = formatTime({
    day : days[today.getDay()],
    date : today.getDate(),
    month : months[today.getMonth()],
    year : today.getFullYear(),
    hour : today.getHours(),
    minute : today.getMinutes(),
    second : today.getSeconds(),
  })
  return formatToday
}

const formatTime = (today : today) : formatToday => {
  const date = today.date <= 9 ? `0${today.date}` : `${today.date}`
  const hour = today.hour <= 9 ? `0${today.hour}` : `${today.hour}`
  const minute = today.minute <= 9 ? `0${today.minute}` : `${today.minute}`
  const second = today.second <= 9 ? `0${today.second}` : `${today.second}`
  return {
    ...today,
    date,
    hour,
    minute,
    second
  }
}