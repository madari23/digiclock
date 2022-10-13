'use strict';

const hourElem = document.querySelector('.clockHour');
const minuteElem = document.querySelector('.clockMinute');
const shiftElem = document.querySelector('.shift');
const alarmContainer = document.querySelector('.alarm');
const alarmSetup = document.querySelector('.modalAddAlarm');

const alarmInputTime = document.querySelector('#alarmTime');

const addAlarmBtn = document.querySelector('.addAlarm');
const saveAlarmBtn = document.querySelector('.saveBtn');

let alarms = [
  {
    name: 'Alarm1',
    dateTime: new Date('2021 december 10, 19:20:00'),
  },
];

const addToLocalStorage = function (data) {
  localStorage.setItem('alarms', JSON.stringify(data));
};

const updateUI = function (alarms) {
  console.log(alarms);
  showTheAlarm(alarms);
  hideAlarmPage();
};

const showAlarmPage = function () {
  alarmSetup.style.display = 'block';
  alarmSetup.style.transform = 'translateX(0)';
};

const hideAlarmPage = function () {
  alarmSetup.style.transform = 'translateX(100%)';
  alarmSetup.style.display = 'none';
};

const addTheAlarm = function () {
  const now = new Date();
  let alarmTime;

  let [inputHour, inputMinute] = alarmInputTime.value.split(':');
  inputHour = Number(inputHour);
  inputMinute = Number(inputMinute);
  let nowHour = Number(now.getHours());
  let nowMinute = Number(now.getMinutes());

  console.log(`${alarmInputTime} ${now.getDate()}`);
  if (inputHour < now.getHours()) {
    if (inputHour === nowHour && inputMinute < nowMinute) {
      alarmTime = new Date(`${alarmInputTime}${now.getDate()}`) + 86400;
    } else {
      alarmTime =
        new Date(
          `${now.getFullYear()} ${
            now.getMonth() + 1
          } ${now.getDate()} ${inputHour}:${inputMinute}`
        ).getTime() + 86400000;
      alarmTime = new Date(alarmTime);
    }
  } else {
    alarmTime = new Date(`${alarmInputTime} ${now.getDate()}`);
  }
  console.log(alarmTime);

  let alarm = {
    name: `Alarm${alarms.length + 1}`,
    dateTime: alarmTime,
  };
  alarms.push(alarm);
  addToLocalStorage(alarms);
  updateUI(JSON.parse(localStorage.getItem('alarms')));
};

const showIn12Hours = function (date) {
  date = new Date(date);

  let hour = date.getHours();
  let ampm = hour > 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour < 10 ? '0' + hour : hour;
  let minute = date.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  return [hour, minute, ampm];
};

const showTheAlarm = function (alarms) {
  alarms.forEach(alarm => {
    console.log(alarm.dateTime);
    let [hour, minute, shift] = showIn12Hours(alarm.dateTime);
    const html = `
    <div class="almBox">
            <div class="alarmDetail">
              <div class="time">
                <span class="hour">${hour}</span>
                :
                <span class="minute">${minute}</span>
                <span class="shift">${shift}</span>
              </div>
              <!-- <p class="lightTxt">Tommorow</p> -->
            </div>
            <label class="onOff" for="${alarm.name}">
              <input type="checkbox" class="toggle" name="" id="${alarm.name}" />
              <div class="onOff__fill"></div>
            </label>
    </div>
    `;
    alarmContainer.innerHTML = '';
    alarmContainer.insertAdjacentHTML('afterbegin', html);
  });
};

updateUI(JSON.parse(localStorage.getItem('alarms')));

const runTheClock = function () {
  const now = new Date();
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;

  let [hourTime, minuteTime, ampm] = showIn12Hours(now);

  // let ampm = hourTime > 12 ? 'PM' : 'AM';
  // hourTime = hourTime % 12;
  // hourTime = hourTime < 10 ? '0' + hourTime : hourTime;
  // let minuteTime = now.getMinutes();
  // minuteTime = minuteTime < 10 ? '0' + minuteTime : minuteTime;

  hourElem.textContent = hourTime ? hourTime : 12;
  minuteElem.textContent = minuteTime;
  shiftElem.textContent = ampm;
};

setInterval(runTheClock, 1000);
addAlarmBtn.addEventListener('click', showAlarmPage);
saveAlarmBtn.addEventListener('click', addTheAlarm);
