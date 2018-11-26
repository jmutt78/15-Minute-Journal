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


}


//Checks to see if thier is an object and if there is if its completed
function fetchResults(){

}




//-------------Tasks-------------------//






//-------------Daily-------------------//





//handle the journal
function handleJournal() {
  $('.goals-page').hide();
  $('.task-page').hide();
  $('.daily-page').hide();
  handleNavBar();
}


$(handleJournal);
