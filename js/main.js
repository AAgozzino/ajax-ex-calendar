$(document).ready(function(){
  // Starting date for calendar
  var startingDate = "2018-01-01";
  var momentDate = moment(startingDate);
  //console.log(momentDate);

  printCalendar(momentDate);
  printHolidays(momentDate);

  // EVENT CLICK - show next month
  $(".next").click(function(){
    if (momentDate.format("MM") == 12) {
      alert("Non è possibile visualizzare altre date");
    } else {
      var newDate = momentDate.add(1, "M");
      printCalendar(newDate);
      printHolidays(newDate);
    }
    //console.log(moment(newDate));
  });

  // EVENT CLICK - show prev month
  $(".prev").click(function(){
    if (momentDate.format("MM") == 1) {
      alert("Non è possibile visualizzare date precedenti");
    } else {
      var newDate = momentDate.subtract(1, "M");
      printCalendar(newDate);
      printHolidays(newDate);
    }
  });
});

// FUNCTION - Print days of the month
function printCalendar(date) {
  // Template day for calendar
  $("#days").html("");
  $("h1").text(date.format("MMMM YYYY"));
  var source = $("#day-template").html();
  var template = Handlebars.compile(source);

  var dateClone = moment(date);
  var monthDays = date.daysInMonth();
  //console.log(monthDays);
  // Render day for calendar
  for (var i = 1; i <= monthDays; i++) {

    var context = {
      "day" : i,
      "month" : date.format("MMMM"),
      "date": dateClone.format("YYYY-MM-DD")
    };
    var html= template(context);
    $("#days").append(html);

    dateClone.add(1, "days")
  }
};

// FUNCTION ASINC- From API print holidays of the printed month
function printHolidays(date) {
  var momentDateMonth = date.format("MM");

  $.ajax(
    {
      "url": "https://flynn.boolean.careers/exercises/api/holidays",
      "data": {
        "year" : 2018,
        "month" : momentDateMonth - 1
      },
      "method" : "GET",
      "success": function(data){
        //console.log(data.response);
        var response = data.response;
        if (response.length > 0) {
          for (var i = 0; i < response.length; i++) {
            var holidayDate = response[i].date;
            var holidayName = response[i].name;

            var dataAttrDateSelector = $(".day[data-date='" + holidayDate + "']");
            dataAttrDateSelector.addClass("holiday");
            dataAttrDateSelector.children(".holiday-name").text("- "+holidayName);
          }
        }

      },
      "error" : function(error){
        alert("Errore!");
      }
    }
  );
};
