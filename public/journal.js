'use strict';

const dailyApi = 'https://obscure-ocean-89688.herokuapp.com/daily';
const dailyApiDate = 'https://obscure-ocean-89688.herokuapp.com/daily?created=';

//***************CORE FUNCTIONS**************
//-------------Get requests-------------------//
function getDaily() {
  //daily nav link
  $('#daily-nav').click(function() {
    $('.textarea-thankful').prop("required", true);
    $('.textarea-greatful').prop("required", true);
    $('.textarea-aff').prop("required", true);
    $('.daily-page').show();
    $('.thankful-form').show();
    $('.great-form').show();
    $('.affirmation-form').show();
    $('.landing-page').hide();
    $('.goals-page').hide();
    $('.task-page').hide();
    $('.completed-dailies').hide();
    displayTodaysDate();
  });

  //daily nav link
  $('#daily-completed-nav').click(function() {
    $('.daily-page').show();
    $('.landing-page').hide();
    $('.goals-page').hide();
    $('.task-page').hide();
    $('.completed-dailies').show();
    $('.textarea-thankful').attr('readonly', 'readonly');
    $('.textarea-greatful').attr('readonly', 'readonly');
    $('.textarea-aff').attr('readonly', 'readonly');
    $('.no-jounral-entry').html(" ")
    $('.textarea-thankful').addClass("textera-trans");
    $('.textarea-greatful').addClass("textera-trans");
    $('.textarea-aff').addClass("textera-trans");
    $('.daily-button').hide();
//DatePicker UI funciton
    $(function() {
      $("#datepicker").datepicker();
      $("#datepicker").datepicker("setDate", new Date());
    });
  });
}

function handleDailyButtons() {
  $('.daily-button').click(function() {
    $('.textarea-thankful').attr('readonly', 'readonly');
    $('.textarea-greatful').attr('readonly', 'readonly');
    $('.textarea-aff').attr('readonly', 'readonly');
    $('.daily-button').hide();
    createDaily();

  });
}

function getAndFromatDate() {
  $('.date-submit-button').click(function() {
    let date = $('#datepicker').val();
    let dat = date;
    let yourdate = dat.split("/").reverse();
    let tmp = yourdate[2];
    yourdate[2] = yourdate[1];
    yourdate[1] = tmp;
    yourdate = yourdate.join("-");
    let formatedDate = yourdate + "T00:00:00.000Z";
    displayOlderDates(formatedDate);

  });
}


//------------Journal display-------------------//
function displayOlderDates(formatedDate) {
let queryURL = `${dailyApiDate}${formatedDate}`;
var settings = {
  "async": true,
  "crossDomain": true,
  "url": `${queryURL}`,
  "method": "GET",
  "headers": {
    "Authorization": `Bearer ${token}`,
    "cache-control": "no-cache",
  },
}
$.ajax(settings)
  .done(function(dailyData) {
    console.log('success', dailyData);
if (Object.keys(dailyData).length != 0) {
for (var i = 0; i < dailyData.length; i++) {
  $('.thankful-form').show();
  $('.great-form').show();
  $('.affirmation-form').show();
  $('.textarea-thankful').attr('readonly', 'readonly');
  $('.textarea-greatful').attr('readonly', 'readonly');
  $('.textarea-aff').attr('readonly', 'readonly');
  $('.daily-button').hide();
  $('.textarea-thankful').addClass("textera-trans");
  $('.textarea-greatful').addClass("textera-trans");
  $('.textarea-aff').addClass("textera-trans");
  $('.textarea-thankful').html(
    `${dailyData[i].answer1}`
  )
  $('.textarea-greatful').html(
    `${dailyData[i].answer2}`
  )
  $('.textarea-aff').html(
    `${dailyData[i].answer3}`
  )
  $('.no-jounral-entry').html(" ")
}
}else {
$('.no-jounral-entry').html(`<p>Oh No! You have no enries for the specified date!</p>
  <p>Please Try another date</p>`)
  $('.textarea-thankful').removeClass("textera-trans");
  $('.textarea-greatful').removeClass("textera-trans");
  $('.textarea-aff').removeClass("textera-trans");
  $('.textarea-thankful').html( " ")
  $('.textarea-greatful').html(" ")
  $('.textarea-aff').html(" ")
  $('.thankful-form').hide();
  $('.great-form').hide();
  $('.affirmation-form').hide();
}
  })
  .fail(function(xhr, status, error) {
    $('.info').html('<p>An error has occurred</p>');
  });

}

function displayTodaysDate() {
  //Date formater
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  let newDates = [year, month, day].join('-');
  let formatedDate = newDates + "T00:00:00.000Z";
  let queryDate = `${dailyApiDate}${formatedDate}`;
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `${queryDate}`,
    "method": "GET",
    "headers": {
      "Authorization": `Bearer ${token}`,
      "cache-control": "no-cache",
    },
  }
  $.ajax(settings)
    .done(function(dailyData) {
      console.log('success', dailyData);
      if (Object.keys(dailyData).length != 0) {
        for (var i = 0; i < dailyData.length; i++) {
          $('.textarea-thankful').attr('readonly', 'readonly');
          $('.textarea-greatful').attr('readonly', 'readonly');
          $('.textarea-aff').attr('readonly', 'readonly');
          $('.textarea-thankful').addClass("textera-trans");
          $('.textarea-greatful').addClass("textera-trans");
          $('.textarea-aff').addClass("textera-trans");
          $('.daily-button').hide();
          $('.no-jounral-entry').html(" ")
          $('.textarea-thankful').html(
            `${dailyData[i].answer1}`
          )
          $('.textarea-greatful').html(
            `${dailyData[i].answer2}`
          )
          $('.textarea-aff').html(
            `${dailyData[i].answer3}`
          )
        }
      } else {
        $('.textarea-thankful').removeAttr('readonly', 'readonly');
        $('.textarea-greatful').removeAttr('readonly', 'readonly');
        $('.textarea-aff').removeAttr('readonly', 'readonly');
        $('.textarea-thankful').removeClass("textera-trans");
        $('.textarea-greatful').removeClass("textera-trans");
        $('.textarea-aff').removeClass("textera-trans");
        $('.textarea-thankful').html( " ")
        $('.textarea-greatful').html(" ")
        $('.textarea-aff').html(" ")
        $('.daily-button').show();
      }
    })
    .fail(function(xhr, status, error) {
      $('.info').html('<p>An error has occurred</p>');
    });
}


//-------------Post-------------------//
function createDaily() {
  let thankfulFor = $('.textarea-thankful').val();
  let todayGreat = $('.textarea-greatful').val();
  let affirmation = $('.textarea-aff').val();
  let data = {};
  data.answer1 = `${thankfulFor}`;
  data.answer2 = `${todayGreat}`;
  data.answer3 = `${affirmation}`;
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `${dailyApi}`,
    "method": "POST",
    "headers": {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "cache-control": "no-cache",
    },
    "processData": false,
    "data": JSON.stringify(data)
  }
  $.ajax(settings).done(function(response) {
    console.log(response);
  });
}

function handleDaily() {
  getDaily();
  handleDailyButtons();
  getAndFromatDate();
}

$(handleDaily);
