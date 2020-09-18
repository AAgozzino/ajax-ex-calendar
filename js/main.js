$(document).ready(function(){
  // Starting date for calendar
  var startingDate = "2018-01-01";
  var momentDate = moment(startingDate);
  console.log(momentDate);

  var dateYear = momentDate.format("YYYY");
  var dateMonth = momentDate.format("MMMM");
  var dateMonthTwoDigits = momentDate.format("MM");
  console.log(dateMonth);
  var monthDays = momentDate.daysInMonth();
  console.log(monthDays);

  // Template day for calendar
  var source = $("#day-template").html();
  var template = Handlebars.compile(source);

  // Render day for calendar
  for (var i = 1; i <= monthDays; i++) {
    var day = addZero(i);
    var date = dateYear + "-" + dateMonthTwoDigits + "-" + day;
    //console.log(day);
    var context = {
      "day" : day,
      "month" : dateMonth,
      "date": date
    };
    var html= template(context);
    $("#days").append(html);
  }

  $.ajax(
    {
      "url": "https://flynn.boolean.careers/exercises/api/holidays",
      "data": {
        "year" : 2018,
        "month" : 0
      },
      "method" : "GET",
      "success": function(data){
        console.log(data.response);
        isHoliday(data.response);
      },
      "error" : function(error){
        alert("Errore!");
      }
    }
  );

});

function addZero(number) {
  if (number < 10) {
    return "0" + number
  }
  return number
};

function isHoliday(holidays) {
  if (holidays.length > 0) {
    for (var i = 0; i < holidays.length; i++) {
      var holidayDate = holidays[i].date;
      var holidayName = holidays[i].name;

      $(".day[data-date='" + holidayDate + "']").addClass("holiday");
      $(".day[data-date='" + holidayDate + "'] .holiday-name").text("- "+holidayName);
    }
  }
}
