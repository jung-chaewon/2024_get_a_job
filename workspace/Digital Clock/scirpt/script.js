const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const seconds = document.getElementById("seconds");
const ampm = document.getElementById("ampm");
// 10보다 작은 숫자 앞에 0을 추가하는 함수
function formatTime(time) {
  return time.toString().padStart(2, "0");
}

// 시간이 12시 이상인지 여부를 판별하여 오전(AM) 또는 오후(PM) 반환
function isAmPm(hours) {
  return hours >= 12 ? "오후" : "오전";
}

function clock() {
  const date = new Date();

  let h = date.getHours();  // 현재 시 (24시간제)
  let m = date.getMinutes();  // 현재 분
  let s = date.getSeconds();  // 현재 초

  hour.textContent = formatTime(h);
  minute.textContent = formatTime(m);
  seconds.textContent = formatTime(s);
  ampm.textContent = isAmPm(h);
}
setInterval(clock, 1000);
