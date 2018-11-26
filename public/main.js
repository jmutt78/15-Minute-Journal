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
function getGoalsData(){
$('#goals-nav').click(function() {
const stretchGoalUrl = 'https://obscure-ocean-89688.herokuapp.com/stretch'
$.ajax({
  type: 'GET',
  url: stretchGoalUrl,
  datatype: 'jsonp',
  success: function (data){
    console.log('success', data);
  }

});

});
}


//Checks to see if thier is an object and if there is if its completed
function fetchResults(){



}

//display anyy goals that are active
function displayActiveGoals(){


}

//display goal forms if no object exists
function displayGoalForms(){


}
// takes info form user and makes a post
function pushGoalForm(){


}

//delete goals
function deleteGoals(){


}

//complete goals
function completeGoals(){


}

//update Goals

function updateGoals(){


}

//handle Goals
function handleGoals(){


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
