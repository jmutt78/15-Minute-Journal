'use strict';


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
}

//***************CORE FUNCTIONS**************
//-------------Goals-------------------//
//get request to the api
function getGoalsData() {
  $('#goals-nav').click(function() {
    const stretchGoalUrl = 'https://obscure-ocean-89688.herokuapp.com/stretch'
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
      }

    });
    //quarter goal Ajax
    const quarterlyGoalUrl = 'https://obscure-ocean-89688.herokuapp.com/quarterly'
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

    const weeklyGoalUrl = 'https://obscure-ocean-89688.herokuapp.com/weekly'
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
      $('.text-stretch').append(
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
      $('.text-quarterly').append(
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
      $('.text-weekly').append(
        `${weeklyData[i].text}`
      )
    }
  }
}


//display goal forms if no object exists
function displayGoalForms() {


}
// takes info form user and makes a post
function pushGoalForm() {


}

//delete goals
function deleteGoals() {


}

//complete goals
function completeGoals() {


}

//update Goals

function updateGoals() {


}

//handle Goals
function handleGoals() {


}


//-------------Tasks-------------------//






//-------------Daily-------------------//





//handle the journal
function handleJournal() {
  $('.goals-page').hide();
  $('.task-page').hide();
  $('.daily-page').hide();
  getGoalsData();
  handleNavBar();
}


$(handleJournal);
