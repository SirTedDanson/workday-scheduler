var currentDayEl = document.getElementById("currentDay");

var currentDay = moment().format("dddd, MMMM Do");
console.log(currentDay)

// display current day of the month at the top of scheduler
currentDayEl.textContent = currentDay;

// dynamically create time blocks

