const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatCustomTime = timestamp => {
  const now = new Date().getTime()
  let resTimestamp = parseInt(now / 1000) - timestamp

  const day = Math.floor(resTimestamp / 86400)
  resTimestamp = resTimestamp % 86400
  const hour = Math.floor(resTimestamp % 86400 / 3600)
  resTimestamp = resTimestamp % 3600
  const minute = Math.floor(resTimestamp / 60)
  const second = resTimestamp % 60
  if (day > 0){
    return `${day}天前`
  }
  if(hour > 0){
    return minute > 0 ? `${hour}小时${minute}分钟前` : `${hour}小时前`
  }

  if (minute > 0){
    return `${minute}分钟前`
  }

  if (second > 0){
    return `几秒前`
  }
}

module.exports = {
  formatTime: formatTime,
  formatCustomTime: formatCustomTime
}
