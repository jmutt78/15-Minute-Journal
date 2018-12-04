'use strict';

const stretchApi = 'https://obscure-ocean-89688.herokuapp.com/stretch';
const quarterlyApi = 'https://obscure-ocean-89688.herokuapp.com/quarterly';
const weeklyApi = 'https://obscure-ocean-89688.herokuapp.com/weekly';

//-------------Nav Bar Hide and Show-------------------//
function handleNavBar() {
  //goal nav link
  $('#goals-nav').click(function() {
    $('.goals-page').show();
    $('.landing-page').hide();
    $('.task-page').hide();
    $('.daily-page').hide();
    //hide show to start the page
    $('.stretch-edit-button').hide();
    $('.stretch-delete-button').hide();
    $('.stretch-complete-button').hide();
    $('.stretch-edit-go-button').hide();
    $('.quarterly-edit-button').hide();
    $('.quarterly-delete-button').hide();
    $('.quarterly-complete-button').hide();
    $('.weekly-edit-button').hide();
    $('.weekly-delete-button').hide();
    $('.weekly-complete-button').hide();
    getStrechGoalsData();

  });
}
//***************CORE FUNCTIONS**************
//-------------buttons-------------------//
function handleStretchButton(){
//Post Buton
  $('.stretch-go-button').click(function() {
    postStretchGoals();
  });
  //Edit Button
    $('.stretch-edit-button').click(function() {
      $('.text-stretch').removeAttr('readonly', 'readonly');
      $('.stretch-edit-go-button').show();
      $('.stretch-delete-button').hide();
      $('.stretch-complete-button').hide();
      $('.stretch-edit-button').hide();
  });
  //Edit submit button
    $('.stretch-edit-go-button').click(function() {
      $('.stretch-go-button').hide();
      $('.stretch-edit-go-button').hide();
      $('.stretch-delete-button').show();
      $('.stretch-complete-button').show();
      $('.stretch-edit-button').show();
      $('.text-stretch').attr('readonly', 'readonly');
      $.ajax({
        type: 'GET',
        url: stretchApi,
        datatype: 'jsonp',
        error: function() {
          $('.info').html('<p>An error has occurred</p>');
        },
        success: function(stretchData) {
          console.log('success', stretchData);
          editStretchGoals(stretchData);
        }
      });
  });
//Delete Button
  $('.stretch-delete-button').click(function() {
    $.ajax({
      type: 'GET',
      url: stretchApi,
      datatype: 'jsonp',
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(stretchData) {
        console.log('success', stretchData);
        deleteStretchGoals(stretchData);
      }
    });
  });
}

//-------------Get requests-------------------//
function getStrechGoalsData() {
  //ajax get request for stretch goals
  $.ajax({
    type: 'GET',
    url: stretchApi,
    datatype: 'jsonp',
    error: function() {
      $('.info').html('<p>An error has occurred</p>');
    },
    success: function(stretchData) {
      console.log('success', stretchData);
      fetchStretchResults(stretchData);
      checkResults(stretchData);
    }
  });

}
  //quarter goal Ajax
function getQuarterlyData(){
  $.ajax({
    type: 'GET',
    url: quarterlyApi,
    datatype: 'jsonp',
    error: function() {
      $('.info').html('<p>An error has occurred</p>');
    },
    success: function(quarterlyData) {
      console.log('success', quarterlyData);
      fetchQuarterlyResults(quarterlyData);
      deleteQuarterlyGoals(quarterlyData);
    }
  });
  }

  //get weekely api datatype
  function getWeeklyData(){
  $.ajax({
    type: 'GET',
    url: weeklyApi,
    datatype: 'jsonp',
    error: function() {
      $('.info').html('<p>An error has occurred</p>');
    },
    success: function(weeklyData) {
      console.log('success', weeklyData);
      fetchWeeklyResults(weeklyData);
      deleteQuarterlyGoals(weeklyData);
    }

  });
}

function checkResults(stretchData){
for (var i = 0; i < stretchData.length; i++) {
  console.log(stretchData[i].completed);
  console.log(Object.keys(stretchData).length);
if (stretchData[i].completed != true && Object.keys(stretchData).length != 0) {
  console.log('dispay list items');
}else {
  console.log('dispay empty textera');
}

}
}


//Stretch goal display
function fetchStretchResults(stretchData) {
  console.log(Object.keys(stretchData).length);
  if (Object.keys(stretchData).length != 0) {
    for (var i = 0; i < stretchData.length; i++) {
      console.log('object preset');
      $('.stretch-go-button').hide();
      $('.stretch-edit-go-button').hide();
      $('.stretch-edit-button').show();
      $('.stretch-delete-button').show();
      $('.stretch-complete-button').show();
      $('.text-stretch').attr('readonly', 'readonly');
      $('.text-stretch').html(
        `${stretchData[i].text}`
      )
    }
  } else {
    console.log('object not preset');
    $('.stretch-edit-go-button').hide();
    $('.stretch-edit-button').hide();
    $('.stretch-delete-button').hide();
    $('.stretch-complete-button').hide();
    $('.stretch-go-button').show();
    $('.text-stretch').removeAttr('readonly', 'readonly');
    $('.text-stretch').val(" ");
  }
}


//Quarterly Goal Display
function fetchQuarterlyResults(quarterlyData) {

}

//Weekly Goal Display
function fetchWeeklyResults(weeklyData) {

}


//-------------Edit-------------------//
//still need to connect this to a new button
function editStretchGoals(stretchData) {
    for (var i = 0; i < stretchData.length; i++) {
        console.log(stretchData[i].id);
        let newGoal = $('.text-stretch').val();
        console.log(`${stretchApi}/${stretchData[i].id}`);
        let idUrl = `${stretchApi}/${stretchData[i].id}`;
        let data = {};
        data.id = `${stretchData[i].id}`
        data.text = `${newGoal}`;
        data.completed = true;
        console.log(JSON.stringify(data));

        var settings = {
          "async": true,
          "crossDomain": true,
          "url": `${idUrl}`,
          "method": "PUT",
          "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
          },
          "processData": false,
          "data": JSON.stringify(data)
        }
        $.ajax(settings).done(function(response) {
          console.log(response);
          //Get the object and push it back up to dispaly

        });

      }


}

function editQuarterlyGoals() {


}

function editWeeklyGoals() {


}


//-------------Delete requests-------------------//
function deleteStretchGoals(stretchData) {
  $('.text-stretch').html(
    " "
  )
  for (var i = 0; i < stretchData.length; i++) {
    $.ajax({
      method: 'DELETE',
      url: `${stretchApi}/${stretchData[i].id}`,
      async: true,
      crossDomain: true,
      headers: {
        contentType: "application/json",
        cacheControl: "no-cache",
      },
      processData: false,
      datatype: 'jsonp',
      data: {},
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(stretchData) {
        console.log('success', stretchData);
        getStrechGoalsData();
      }
    });
  }


}


function deleteQuarterlyGoals() {


}

function deleteWeeklyGoals() {


}

//-------------Edit Complete Goal-------------------//
function completeStretch(stretchData) {
  for (var i = 0; i < stretchData.length; i++) {
      console.log(stretchData[i].id);
      let goal = $('.text-stretch').val();
      console.log(`${stretchApi}/${stretchData[i].id}`);
      let idUrl = `${stretchApi}/${stretchData[i].id}`;
      let data = {};
      data.id = `${stretchData[i].id}`
      data.text = `${goal}`;
      data.completed = true;
      console.log(JSON.stringify(data));

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `${idUrl}`,
        "method": "PUT",
        "headers": {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
        },
        "processData": false,
        "data": JSON.stringify(data)
      }
      $.ajax(settings).done(function(response) {
        console.log(response);
        //Get the object and push it back up to dispaly

      });

    }

}

function completeQuarterlyGoals() {


}

function completeWeeklyGoals() {


}

//-------------POST requests-------------------//
function postStretchGoals() {
  let newGoal = $('.text-stretch').val();
  console.log(newGoal);
  let data = {};
  data.text = `${newGoal}`;
  data.completed = false;
  console.log(JSON.stringify(data));

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `${stretchApi}`,
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
    //Get the object and push it back up to dispaly
    getStrechGoalsData();
  });
}

function postQuarterlyGoals() {


}

function postWeeklyGoals() {


}


//handle the journal
function handleGoal() {
  $('.goals-page').hide();
  $('.daily-page').hide();
  handleNavBar();
  handleStretchButton();
}


$(handleGoal);
