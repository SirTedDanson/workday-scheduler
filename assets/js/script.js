var currentDayEl = document.getElementById("currentDay");
var currentDay = moment();
var scheduledTasks = [];

// dynamically change amount of work hours
var workHours = 8;
// dynamically change schedule start. 
// format: "HOUR(AM/PM)" 
var workDayStart = "9AM";

// ------------------------------------LOAD STORED SCHEDULE------------------------------
var loadSchedule = function () {
  var schedule = JSON.parse(localStorage.getItem("schedule"))
  // if no schedule in storage, create blank schedule object
  if (schedule == null) {
    for (i = 0; i < (workHours+1); i++) {
    var emptyText = "";
    var scheduleBlock = {
      text: emptyText
    };
    scheduledTasks.push(scheduleBlock);
    } 
  } else {
    // schedule on page is the schedule in storage
    scheduledTasks = schedule;
  };
  saveToStorage();
  createSchedule(scheduledTasks);
};

// ------------------------------ CREATE SCHEDULE ON PAGE -----------------------------
var createSchedule = function (scheduledTasks) {

  // display current day of the month at the top of scheduler
  currentDayEl.textContent = currentDay.format("dddd, MMMM Do");

  // loop to create schedule container elements based on how many work hours
  for (i = 0; i < (workHours+1); i++) {

    // work schedule block hour generation 
    var blockHour = moment(workDayStart, "hA").add(i, "hour");
    var displayedHour = blockHour.format("hA");

    // current task is the text of the schedule at the current index
    var currentTask = scheduledTasks[i].text;

    // -------- dynamically create DOM elements --------------
    var scheduleContainer = $(".container");
    var timeBlockEl = $("<div>")
      .addClass("row time-block");
    var timeBlockLabel = $("<label>")
      .addClass("col-md-1 col-2 text-nowrap hour")
      // text is the work hour, beginning with the work day start time
      .text(displayedHour);
    var timeBlockText = $("<textarea>")
      .addClass("col-md col-8 description")
      // time block text is loaded from the schedule 
      .text(currentTask);
    var timeBlockButton = $("<button>")
      .addClass("col-md-1 col-2 saveBtn");
    var saveIcon = $("<i>")
      .addClass("fas fa-save");

    // append elements together
    timeBlockButton.append(saveIcon);
    timeBlockEl.append(timeBlockLabel, timeBlockText, timeBlockButton);
    scheduleContainer.append(timeBlockEl);
    
    // check time block's hour status and color code
    auditSchedule(timeBlockEl, blockHour);
  };
  
  // periodically check time while on page
  setInterval(function() {
    auditSchedule(timeBlockEl, blockHour);
  }, 5000);
};

// ---------------------------- COLOR CODING FUNCTION ------------------------------
var auditSchedule = function(timeBlock, hour) {
  // get difference in hours between current time and the time block hour
  var timeDiff = (hour.diff(currentDay)/60/60/1000);

  // remove old classes from element
  $(timeBlock).removeClass("past present future");

  // highlight time block based on time conditions
  // if timeblock is 1 hour or greater before the current time add class 'past'
  if (timeDiff <= -1){
    $(timeBlock).addClass("past");
  }
  // if timeblock is in the current hour add class 'present'
  else if (timeDiff <= 0) {
    $(timeBlock).addClass("present");
  }
  // if timeblock is 1 hour or greater after the current time add class 'future'
  else if (timeDiff >= 0) {
    $(timeBlock).addClass("future");
  };
};

// save to local storage ------------------------------------
var saveToStorage = function () {
  localStorage.setItem("schedule", JSON.stringify(scheduledTasks));
};

// SAVE BUTTON CLICK ==================================== load once DOM is fully loaded
$(document).ready(function() {
  // save time block text when clicking save button
  $(".saveBtn").click(function () {

    // grab information from text entered in the selected time block
    var index = $(this).closest(".time-block").index();
    var logText = $(this).parents(".time-block").find("textarea").val();

    // update schedule array
    scheduledTasks[index].text = logText;
    
    // save schedule to storage
    saveToStorage ();
  
      // added save alert message to notify user save was successful
      if (!document.querySelector(".save-alert")) {
      var scheduleHeader = $(".jumbotron")
        .addClass("padding-adj");
      var saveAlertEl = $("<p>")
        .addClass("lead save-alert")
        .text("Time Block Saved!")
      scheduleHeader.append(saveAlertEl)
      setTimeout(function() { 
        saveAlertEl.remove()
        scheduleHeader.removeClass("padding-adj")
      }, 2000);
    }
  });
});

// LAUNCH APPLICATION 
loadSchedule();