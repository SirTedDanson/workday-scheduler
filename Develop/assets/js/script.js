
var currentDayEl = document.getElementById("currentDay");
var currentDay = moment();

// dynamically change amount of work hours
var workHours = 8;
// dynamically change schedule start. 
// format: "HOUR(AM/PM)" 
var workDayStart = "9AM"

// ------------------------------ CREATE DOM ELEMENTS -----------------------------
var createSchedule = function () {
  // display current day of the month at the top of scheduler
  currentDayEl.textContent = currentDay.format("dddd, MMMM Do");
  // loop to create time blocks
  for (i = 0; i < (workHours+1); i++) {
    // work scheduler hour due
    var hourDue = moment(workDayStart, "hA").add(i, "hour");
    // dynamically create time blocks with jquery
    var timeBlockEl = $("<div>")
      .addClass("row time-block");
    var timeBlockLabel = $("<label>")
      .addClass("col-1 hour")
      .text(hourDue.format("hA"));
    var timeBlockText = $("<textarea>")
      .addClass("col description");
    var timeBlockButton = $("<button>")
      .addClass("col-1 saveBtn");
    var saveIcon = $("<i>")
      .addClass("fas fa-save");

    // append elements together
    timeBlockButton.append(saveIcon);
    timeBlockEl.append(timeBlockLabel, timeBlockText, timeBlockButton);
    $(".container").append(timeBlockEl);
    
    // check time block and color code
    auditSchedule(timeBlockEl, hourDue);
  };
  // periodically check time while on page
  setInterval(function() {
    auditSchedule(timeBlockEl, hourDue);
  }, 5000);
};

// ---------------------------- COLOR CODING FUNCTION ------------------------------
var auditSchedule = function(timeBlock, hour) {
  // get difference in hours between current time and the time block hour
  var timeDiff = hour.diff(currentDay)/60/60/1000;

  // remove old classes from element
  $(timeBlock).removeClass("past present future")

  // highlight time block based on conditions
  // if timeblock is 1 hour or greater before the current time add class 'past'
  if (timeDiff <= -1){
    $(timeBlock).addClass("past")
  }
  // if timeblock is in the current hour add class 'present'
  else if (timeDiff <= 0) {
    $(timeBlock).addClass("present")
  }
  // if timeblock is 1 hour or greater after the current time add class 'future'
  else if (timeDiff >= 0) {
    $(timeBlock).addClass("future")
  }
};

createSchedule();