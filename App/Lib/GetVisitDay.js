export default function () {
  let day = new Date().getDay()
  if (day === 0) return 7
  else return day
}
