'use strict';

const stretchApi = 'https://obscure-ocean-89688.herokuapp.com/stretch';
const quarterlyApi = 'https://obscure-ocean-89688.herokuapp.com/quarterly';
const weeklyApi = 'https://obscure-ocean-89688.herokuapp.com/weekly';


$(document).ready(function() {
  console.log("ready!");
});
//-------------Nav Bar Hide and Show-------------------//
function handleNavBar() {
  //goal nav link
  $('#goals-nav').click(function() {
    $('.goals-page').show();
    $('.landing-page').hide();
    $('.task-page').hide();
    $('.daily-page').hide();
  });
  //tasks nav link
  $('#tasks-nav').click(function() {
    $('.task-page').show();
    $('.landing-page').hide();
    $('.goals-page').hide();
    $('.daily-page').hide();
  });
  //daily nav link
  $('#daily-nav').click(function() {
    $('.daily-page').show();
    $('.landing-page').hide();
    $('.goals-page').hide();
    $('.task-page').hide();
  });
  //DatePicker UI funciton
  $(function() {
    $("#datepicker").datepicker();
    $("#datepicker").datepicker("setDate", new Date());
  });
}

//***************CORE FUNCTIONS**************
//-------------Goals-------------------//
//get request to the api
function getGoalsData() {
  let stretchGoalUrl = stretchApi;
  let quarterlyGoalUrl = quarterlyApi;
  let weeklyGoalUrl = weeklyApi;
  $('#goals-nav').click(function() {


    $.ajax({
      type: 'GET',
      url: stretchGoalUrl,
      datatype: 'jsonp',
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(stretchData) {
        console.log('success', stretchData);
        fetchStretchResults(stretchData);
        editStretchGoals(stretchData);
      }

    });
    //quarter goal Ajax

    $.ajax({
      type: 'GET',
      url: quarterlyGoalUrl,
      datatype: 'jsonp',
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(quarterlyData) {
        console.log('success', quarterlyData);
        fetchQuarterlyResults(quarterlyData);
      }

    });


    $.ajax({
      type: 'GET',
      url: weeklyGoalUrl,
      datatype: 'jsonp',
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(weeklyData) {
        console.log('success', weeklyData);
        fetchWeeklyResults(weeklyData);
      }

    });
  });
}
//Stretch goal display
function fetchStretchResults(stretchData) {
  for (var i = 0; i < stretchData.length; i++) {
    if (Object.keys(stretchData).length === 0) {
      $('.stretch-edit-button').hide();
      $('.stretch-delete-button').hide();
      $('.stretch-complete-button').hide();

    } else {
      $('.stretch-go-button').hide();
      $('.text-stretch').attr('readonly', 'readonly');
      $('.text-stretch').html(
        `${stretchData[i].text}`
      )
    }
  }
}
//Quarterly Goal Display
function fetchQuarterlyResults(quarterlyData) {
  for (var i = 0; i < quarterlyData.length; i++) {
    if (Object.keys(quarterlyData).length === 0) {
      $('.quarterly-edit-button').hide();
      $('.quarterly-delete-button').hide();
      $('.quarterly-complete-button').hide();
    } else {
      $('.quarterly-go-button').hide();
      $('.text-quarterly').attr('readonly', 'readonly');
      $('.text-quarterly').html(
        `${quarterlyData[i].text}`
      )
    }
  }
}

//Weekly Goal Display
function fetchWeeklyResults(weeklyData) {
  for (var i = 0; i < weeklyData.length; i++) {
    if (Object.keys(weeklyData).length === 0) {
      $('.weekly-edit-button').hide();
      $('.weekly-delete-button').hide();
      $('.weekly-complete-button').hide();
    } else {
      $('.weekly-go-button').hide();
      $('.text-weekly').attr('readonly', 'readonly');
      $('.text-weekly').html(
        `${weeklyData[i].text}`
      )
    }
  }
}


//edit the goals
function editStretchGoals(stretchData) {
  $('.stretch-edit-button').click(function() {
    $('.text-stretch').removeAttr('readonly', 'readonly');
    $('.stretch-go-button').show();
    $('.stretch-delete-button').hide();
    $('.stretch-complete-button').hide();
    $('.stretch-go-button').click(function() {
      for (var i = 0; i < stretchData.length; i++) {
        console.log(stretchData[i].id);


        $('.stretch-go-button').hide();
        $('.stretch-delete-button').show();
        $('.stretch-complete-button').show();
        $('.text-stretch').attr('readonly', 'readonly');
        let newGoal = $('.text-stretch').val();
        console.log(`${stretchApi}/${stretchData[i].id}`);
        let stretchUrl = stretchApi;
        console.log(newGoal);
        $.ajax({
          method: 'PUT',
          url: `${stretchApi}/${stretchData[i].id}`,
          contentType : "application/json",
          data: {
            "text": "This app will be the best thing ever",
            "completed": false
          },

          error: function() {
            $('.info').html('<p>An error has occurred</p>');
          },
          success: function(stretchData) {
            console.log('success', stretchData);

          }

        });

      }
    });
  });
}

function editQuarterlyGoals() {


}

function editWeeklyGoals() {


}





//delete goals
function deleteGoals() {


}

//complete goals
function completeGoals() {


}




//handle the journal
function handleGoal() {
  $('.goals-page').hide();
  $('.task-page').hide();
  $('.daily-page').hide();
  getGoalsData();
  handleNavBar();
}


$(handleGoal);
