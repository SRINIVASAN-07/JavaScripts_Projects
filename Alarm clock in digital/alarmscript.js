const currentTime = document.querySelector('h1');
const audio = document.getElementById('alarm-audio');

audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;

const upcomingAlarmList = document.querySelector('#upcoming-alarms-list');
const addAlarmForm = document.querySelector('.setAlarm');

const alarmList = []; // Stores all the alarms being set 

// Plays the alarm audio at the right time
function ring(realTime) {
    audio.play();
    alert(`It's ${realTime}`);
}

// Shows the real time
function updateTime() {
    const today = new Date();
    let hour = today.getHours();
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    const formattedHour = formatTime(hour);
    const realTime = `${formattedHour}:${minutes}:${seconds} ${ampm}`;

    currentTime.innerText = realTime;

    // Check if the alarmList includes the current time, "realTime"
    // If yes, ring() is called
    if (alarmList.includes(realTime)) {
        ring(realTime);
    }
}

// If the number is less than 10 append 0 before it.
function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

// Function to stop the currently playing alarm
function stopAlarm() {
    audio.pause();
    audio.currentTime = 0; // Reset the audio to the start
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }
}

// Removes the alarm from the upcoming-alarms-list when "Delete Alarm" is clicked
upcomingAlarmList.addEventListener('click', e => {
    if (e.target.classList.contains("deleteAlarm")) {
        const value = e.target.value;
        remove(value);
        e.target.parentElement.remove();
    }
});

// Removes the alarm from the alarmList array when "Delete Alarm" is clicked
function remove(value) {
    let newList = alarmList.filter(time => time != value);
    alarmList.length = 0; // Clear contents
    alarmList.push(...newList);
}

// Adds newAlarm to the upcoming-alarms-list as a new list item 
function addNewAlarm(newAlarm) {
    const html = 
    `<li class="time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm" onclick="remove(this.value)" value="${newAlarm}">Delete Alarm</button>       
    </li>`;
    upcomingAlarmList.innerHTML += html;
}

// Event to set a new alarm whenever the form is submitted 
addAlarmForm.addEventListener('submit', event => {
    event.preventDefault(); // To prevent default behaviour of the webpage

    let hour = parseInt(addAlarmForm.hr.value);
    let minute = formatTime(addAlarmForm.min.value);
    let second = formatTime(addAlarmForm.sec.value);
    const ampm = addAlarmForm.ampm.value;

    const newAlarm = `${formatTime(hour)}:${minute}:${second} ${ampm}`;

    // Add newAlarm to alarmList array
    if (!alarmList.includes(newAlarm)) {
        alarmList.push(newAlarm);
        addNewAlarm(newAlarm);
        addAlarmForm.reset();
    } else {
        alert(`Alarm for ${newAlarm} already set.`);
    }
});

// Calls updateTime() every second
setInterval(updateTime, 1000);

