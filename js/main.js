$(document).ready(function(){
  // Starting date for calendar
  var startingDate = "2018-01-01";
  var momentDate = moment(startingDate);
  console.log(momentDate);

  var dateMonth = momentDate.format("MMMM");
  console.log(dateMonth);
  var monthDays = momentDate.daysInMonth();
  console.log(monthDays);

  // Template day for calendar
  var source = $("#day-template").html();
  var template = Handlebars.compile(source);

  // Render day for calendar
  for (var i = 1; i <= monthDays; i++) {
    var day = addZero(i);
    //console.log(day);
    var context = {
      "day" : day,
      "month" : dateMonth
    };
    var html= template(context);
    $("#days").append(html);
  }
});

function addZero(number) {
  if (number < 10) {
    return "0" + number
  }
  return number
}
