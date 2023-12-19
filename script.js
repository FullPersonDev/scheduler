// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.

//Display the current date in the header
$(document).ready(function(){
  $('#currentDay').text(dayjs().format('MMMM DD, YYYY'));

  //Create the time block rows
  function createTimeBlocks() {
    var startHour = 9;
    var endHour = 21;

    for (var hour = startHour; hour <= endHour; hour++) {
      var timeBlock = $('<div>')
        .addClass('row time-block');
      var hourID = `hour-${hour}`;
      var hourElement = $('<div>')
        .addClass('col-2 col-md-1 hour text-center py-3')
        .attr('id', hourID)
        .text(dayjs().hour(hour).format('hA'));
      var descriptionTextArea = $('<textarea>')
        .addClass('col-8 col-md-10 description')
        .attr('id', `hour-${hour}`);
      var saveButton = $('<button>')
        .addClass('btn saveBtn col-2 col-md-1')
        .attr('aria-label', 'save')
        .html('<i class = "far fa-save" aria-hidden="true"></i>');
      
        timeBlock.append(hourElement, descriptionTextArea, saveButton);
        $('.container-lg').append(timeBlock);
    }
  }
  createTimeBlocks();
  updateHourlyStyles();
  //calling the loadsavedevents function from below to help with persisting local storage data on the page.
  loadSavedEvents();

  //Update color-coding of time blocks based on the current time
  function updateHourlyStyles() {
    var currentHour = dayjs().hour();

    $('.time-block').each(function() {
      var blockHour = parseInt($(this).find('.hour').attr('id').split('-')[1]);
      if (blockHour < currentHour) {
        $(this).removeClass('present').removeClass('future').addClass('past');
      } else if (blockHour == currentHour) {
        $(this).removeClass('past').removeClass('future').addClass('present');
      } else {
        $(this).removeClass('past').removeClass('present').addClass('future');
      }
    });
  }

  //Handle clicks on the save button
  $('.saveBtn').on('click', function(){
    var hourID = $(this).siblings('.hour').attr('id');
    var description = $(this).siblings('.description').val();

    //Save the event to local storage
    localStorage.setItem(hourID, description);
  });

  //Load saved events from local storage
  function loadSavedEvents() {
    $('.time-block').each(function () {
      var hourID = $(this).find('.hour').attr('id');
      var savedEvent = localStorage.getItem(hourID);

      if (savedEvent) {
        $(this).find('.description').val(savedEvent);
      }
    });
  }

});
