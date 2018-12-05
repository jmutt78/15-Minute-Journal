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

    //DatePicker UI funciton
    $(function() {
      $("#datepicker").datepicker();
      $("#datepicker").datepicker("setDate", new Date());
    });
    $.ajax({
      type: 'GET',
      url: dailyApi,
      datatype: 'jsonp',
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(dailyData) {
        console.log('success', dailyData);
      }

    });
  });
}

function handleDailyButtons(){
$('.daily-button').click(function() {
createDaily();

    });
}



//-------------Task display-------------------//
function displayDaily() {
  $('.date-submit-button').click(function() {
    let date = $('#datepicker').val();
    let dateFormated = new Date(date);
    let dateToInt = Date.parse(dateFormated);
    console.log(dateToInt);

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
displayDaily()
}

$(handleDaily);
