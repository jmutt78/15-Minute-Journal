'use strict';
const dailyApi = 'https://obscure-ocean-89688.herokuapp.com/daily';
const dailyApiDate = 'https://obscure-ocean-89688.herokuapp.com/daily?created=';

//***************CORE FUNCTIONS**************
//-------------Get requests-------------------//
function getDaily() {
  //daily nav link
  $('#daily-nav').click(function() {
    $('.daily-page').show();
    $('.landing-page').hide();
    $('.goals-page').hide();
    $('.task-page').hide();
    displayTodaysDate();

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
    console.log(formatedDate);
    displayOlderDates(formatedDate);

  });
}


//------------Journal display-------------------//
function displayOlderDates(formatedDate) {
let queryURL = `${dailyApiDate}${formatedDate}`;
console.log(queryURL);
  $.ajax({
    type: 'GET',
    url: queryURL,
    datatype: 'jsonp',
    error: function() {
      $('.info').html('<p>An error has occurred</p>');
    },
    success: function(dailyData) {
      console.log('success', dailyData);
if (Object.keys(dailyData).length != 0) {
  for (var i = 0; i < dailyData.length; i++) {
    $('.textarea-thankful').attr('readonly', 'readonly');
    $('.textarea-greatful').attr('readonly', 'readonly');
    $('.textarea-aff').attr('readonly', 'readonly');
    $('.daily-button').hide();
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
}
    }
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
  $.ajax({
    type: 'GET',
    url: queryDate,
    datatype: 'jsonp',
    error: function() {
      $('.info').html('<p>An error has occurred</p>');
    },
    success: function(dailyData) {
      console.log('success', dailyData);
      if (Object.keys(dailyData).length != 0) {
        for (var i = 0; i < dailyData.length; i++) {
          $('.textarea-thankful').attr('readonly', 'readonly');
          $('.textarea-greatful').attr('readonly', 'readonly');
          $('.textarea-aff').attr('readonly', 'readonly');
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
        $('.textarea-thankful').html( " ")
        $('.textarea-greatful').html(" ")
        $('.textarea-aff').html(" ")
        $('.daily-button').show();
      }
    }
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
