
var currentDayEl = document.getElementById("currentDay");
var currentDay = moment().format("dddd, MMMM Do");

// currentTime.add(9, "hours");
console.log(currentDay);

// display current day of the month at the top of scheduler
currentDayEl.textContent = currentDay;

// loop to create time blocks (temp time text)
for (i = 0; i < 9; i++) {
  // work scheduler start time
  var startTime = moment("9AM", "hA").add(i, "hour").format("hA");
  // dynamically create time blocks with jquery
  var timeBlockEl = $("<div>")
    .addClass("row time-block");
  var timeBlockLabel = $("<label>")
    .addClass("col-1 hour")
    .text(startTime);
  var timeBlockText = $("<textarea>")
    .addClass("col description past");
  var timeBlockButton = $("<button>")
    .addClass("col-1 saveBtn");
  var saveIcon = $("<i>")
    .addClass("fas fa-save");

  timeBlockButton.append(saveIcon);
  timeBlockEl.append(timeBlockLabel, timeBlockText, timeBlockButton);
  $(".container").append(timeBlockEl);
}