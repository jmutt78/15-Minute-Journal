'use strict';

const stretchApi = 'https://obscure-ocean-89688.herokuapp.com/stretch';
const quarterlyApi = 'https://obscure-ocean-89688.herokuapp.com/quarterly';
const weeklyApi = 'https://obscure-ocean-89688.herokuapp.com/weekly';
//the api for query string of completed = false
const stretchApiCompleted = 'https://obscure-ocean-89688.herokuapp.com/stretch?completed=false';
const quarterlyApiCompleted = 'https://obscure-ocean-89688.herokuapp.com/quarterly?completed=false';
const weeklyApiCompleted = 'https://obscure-ocean-89688.herokuapp.com/weekly?completed=false';
//the api for query string of completed = true
const stretchApiTrue = 'https://obscure-ocean-89688.herokuapp.com/stretch?completed=true';
const quarterlyApiTrue = 'https://obscure-ocean-89688.herokuapp.com/quarterly?completed=true';
const weeklyApiTrue = 'https://obscure-ocean-89688.herokuapp.com/weekly?completed=true';
//-------------Nav Bar Hide and Show-------------------//
function handleNavBar() {
  //goal nav link
  $('#goals-nav').click(function() {
    $('.stretch-goals-completed-display').html(
      " ");
    $('.quarterly-goals-completed-display').html(
      " ");
    $('.weekly-goals-completed-display').html(
      " ");
    $('.goals-page').show();
    $('.stretch-goal-dispay').show();
    $('.quarterly-goal-display').show();
    $('.weekly-goal-display').show();
    $('.landing-page').hide();
    $('.daily-page').hide();
    //hide show to start the page
    $('.stretch-goals-completed-display').hide();
    $('.quarterly-goals-completed-display').hide();
    $('.weekly-goals-completed-display').hide();
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
    getQuarterlyData();
    getWeeklyData();
  });
  //show completed goals
  $('#completed-goals-nav').click(function() {
    $('.goals-page').show();
    $('.stretch-goals-completed-display').html(
      " ");
    $('.quarterly-goals-completed-display').html(
      " ");
    $('.weekly-goals-completed-display').html(
      " ");
    $('.stretch-goals-completed-display').show();
    $('.quarterly-goals-completed-display').show();
    $('.weekly-goals-completed-display').show();
    $('.stretch-goal-dispay').hide();
    $('.quarterly-goal-display').hide();
    $('.weekly-goal-display').hide();
    $('.landing-page').hide();
    $('.daily-page').hide();
    displayCompletedStretchGoals();
    displayCompletedQuarterlyGoals();
    displayCompletedWeeklyGoals();
  });
}
//***************CORE FUNCTIONS**************
//-------------buttons-------------------//
function handleStretchButton() {
  //Post Buton
  $('.stretch-go-button').click(function() {
    postStretchGoals();
  });
  //Edit Button
  $('.stretch-edit-button').click(function() {
    $('.text-stretch').removeAttr('readonly', 'readonly');
    $('.text-stretch').removeClass("textera-trans");
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
    $('.text-stretch').addClass("textera-trans");
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
  //complete function
  $('.stretch-complete-button').click(function() {
    $.ajax({
      type: 'GET',
      url: stretchApi,
      datatype: 'jsonp',
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(stretchData) {
        console.log('success', stretchData);
        completeStretch(stretchData);
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
//Quarterly Button
function handleQuarterleyButton() {
  //Post Buton
  $('.quarterly-go-button').click(function() {
    postQuarterlyGoals();
  });
  //Edit Button
  $('.quarterly-edit-button').click(function() {
    $('.text-quarterly').removeAttr('readonly', 'readonly');
    $('.text-quarterly').removeClass("textera-trans");
    $('.quarterly-edit-go-button').show();
    $('.quarterly-delete-button').hide();
    $('.quarterly-complete-button').hide();
    $('.quarterly-edit-button').hide();
  });
  //Edit submit button
  $('.quarterly-edit-go-button').click(function() {
    $('.quarterly-go-button').hide();
    $('.quarterly-edit-go-button').hide();
    $('.quarterly-delete-button').show();
    $('.quarterly-complete-button').show();
    $('.quarterly-edit-button').show();
    $('.text-quarterly').addClass("textera-trans");
    $('.text-quarterly').attr('readonly', 'readonly');
    $.ajax({
      type: 'GET',
      url: quarterlyApi,
      datatype: 'jsonp',
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(quarterlyData) {
        console.log('success', quarterlyData);
        editQuarterlyGoals(quarterlyData);
      }
    });
  });
  //completed button
  $('.quarterly-complete-button').click(function() {
    $.ajax({
      type: 'GET',
      url: quarterlyApi,
      datatype: 'jsonp',
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(quarterlyData) {
        console.log('success', quarterlyData);
        completeQuarterlyGoals(quarterlyData);
      }
    });
  });
  //Delete Button
  $('.quarterly-delete-button').click(function() {
    $.ajax({
      type: 'GET',
      url: quarterlyApi,
      datatype: 'jsonp',
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(quarterlyData) {
        console.log('success', quarterlyData);
        deleteQuarterlyGoals(quarterlyData);
      }
    });
  });
}

//handle Weekly buttons
function handleWeeklyButton() {
  //Post Buton
  $('.weekly-go-button').click(function() {
    postWeeklyGoals();
  });
  //Edit Button
  $('.weekly-edit-button').click(function() {
    $('.text-weekly').removeAttr('readonly', 'readonly');
    $('.text-weekly').removeClass("textera-trans");
    $('.weekly-edit-go-button').show();
    $('.weekly-delete-button').hide();
    $('.weekly-complete-button').hide();
    $('.weekly-edit-button').hide();
  });
  //Edit submit button
  $('.weekly-edit-go-button').click(function() {
    $('.weekly-go-button').hide();
    $('.weekly-edit-go-button').hide();
    $('.weekly-delete-button').show();
    $('.weekly-complete-button').show();
    $('.weekly-edit-button').show();
    $('.text-weekly').addClass("textera-trans");
    $('.text-weekly').attr('readonly', 'readonly');
    $.ajax({
      type: 'GET',
      url: weeklyApi,
      datatype: 'jsonp',
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(weeklyData) {
        console.log('success', weeklyData);
        editWeeklyGoals(weeklyData);
      }
    });
  });
  //completed button
  $('.weekly-complete-button').click(function() {
    $.ajax({
      type: 'GET',
      url: weeklyApi,
      datatype: 'jsonp',
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(weeklyData) {
        console.log('success', weeklyData);
        completeWeeklyGoals(weeklyData);
      }
    });
  });
  //Delete Button
  $('.weekly-delete-button').click(function() {
    $.ajax({
      type: 'GET',
      url: weeklyApi,
      datatype: 'jsonp',
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(weeklyData) {
        console.log('success', weeklyData);
        deleteWeeklyGoals(weeklyData);
      }
    });
  });
}
//-------------Get requests-------------------//
function getStrechGoalsData() {
  //ajax get request for stretch goals
  $.ajax({
    type: 'GET',
    url: stretchApiCompleted,
    datatype: 'jsonp',
    error: function() {
      $('.info').html('<p>An error has occurred</p>');
    },
    success: function(stretchData) {
      console.log('success', stretchData);
      fetchStretchResults(stretchData);
    }
  });
}
//quarter goal Ajax
function getQuarterlyData() {
  $.ajax({
    type: 'GET',
    url: quarterlyApiCompleted,
    datatype: 'jsonp',
    error: function() {
      $('.info').html('<p>An error has occurred</p>');
    },
    success: function(quarterlyData) {
      console.log('success', quarterlyData);
      fetchQuarterlyResults(quarterlyData);
    }
  });
}

//get weekely api datatype
function getWeeklyData() {
  $.ajax({
    type: 'GET',
    url: weeklyApiCompleted,
    datatype: 'jsonp',
    error: function() {
      $('.info').html('<p>An error has occurred</p>');
    },
    success: function(weeklyData) {
      console.log('success', weeklyData);
      fetchWeeklyResults(weeklyData);
    }
  });
}
//-------------displays-------------------//
//Stretch goal display
function fetchStretchResults(stretchData) {
  if (Object.keys(stretchData).length != 0) {
    for (var i = 0; i < stretchData.length; i++) {
      $('.stretch-go-button').hide();
      $('.stretch-edit-go-button').hide();
      $('.stretch-edit-button').show();
      $('.stretch-delete-button').show();
      $('.stretch-complete-button').show();
      $('.text-stretch').addClass("textera-trans");
      $('.text-stretch').attr('readonly', 'readonly');
      $('.text-stretch').html(
        `${stretchData[i].text}`
      )
      $('.stretch-id').html(
        `${stretchData[i].id}`
      )
    }
  } else {
    $('.stretch-edit-go-button').hide();
    $('.stretch-edit-button').hide();
    $('.stretch-delete-button').hide();
    $('.stretch-complete-button').hide();
    $('.stretch-go-button').show();
    $('.text-stretch').removeClass("textera-trans");
    $('.text-stretch').removeAttr('readonly', 'readonly');
    $('.text-stretch').val(" ");
  }
}


//Quarterly Goal Display
function fetchQuarterlyResults(quarterlyData) {
  if (Object.keys(quarterlyData).length != 0) {
    for (var i = 0; i < quarterlyData.length; i++) {
      $('.quarterly-go-button').hide();
      $('.quarterly-edit-go-button').hide();
      $('.quarterly-edit-button').show();
      $('.quarterly-delete-button').show();
      $('.quarterly-complete-button').show();
      $('.text-quarterly').addClass("textera-trans");
      $('.text-quarterly').attr('readonly', 'readonly');
      $('.text-quarterly').html(
        `${quarterlyData[i].text}`
      )
      $('.quarterly-id').html(
        `${quarterlyData[i].id}`
      )
    }
  } else {
    $('.quarterly-edit-go-button').hide();
    $('.quarterly-edit-button').hide();
    $('.quarterly-delete-button').hide();
    $('.quarterly-complete-button').hide();
    $('.quarterly-go-button').show();
    $('.text-quarterly').removeClass("textera-trans");
    $('.text-quarterly').removeAttr('readonly', 'readonly');
    $('.text-quarterly').val(" ");
  }
}

//Weekly Goal Display
function fetchWeeklyResults(weeklyData) {
  if (Object.keys(weeklyData).length != 0) {
    for (var i = 0; i < weeklyData.length; i++) {
      $('.weekly-go-button').hide();
      $('.weekly-edit-go-button').hide();
      $('.weekly-edit-button').show();
      $('.weekly-delete-button').show();
      $('.weekly-complete-button').show();
      $('.text-weekly').addClass("textera-trans");
      $('.text-weekly').attr('readonly', 'readonly');
      $('.text-weekly').html(
        `${weeklyData[i].text}`
      )
      $('.weekly-id').html(
        `${weeklyData[i].id}`
      )
    }
  } else {
    $('.weekly-edit-go-button').hide();
    $('.weekly-edit-button').hide();
    $('.weekly-delete-button').hide();
    $('.weekly-complete-button').hide();
    $('.weekly-go-button').show();
    $('.text-weekly').removeAttr('readonly', 'readonly');
    $('.text-weekly').removeClass("textera-trans");
    $('.text-weekly').val(" ");
  }
}
//Display completed stretch goals
function displayCompletedStretchGoals() {
  $.ajax({
    type: 'GET',
    url: stretchApiTrue,
    datatype: 'jsonp',
    error: function() {
      $('.info').html('<p>An error has occurred</p>');
    },
    success: function(stretchData) {
      console.log('success', stretchData);
      for (var i = 0; i < stretchData.length; i++) {
        $('.stretch-goals-completed-display').append(
          `<ul class="list-group">
          <li class="list-group-item">${stretchData[i].text}</li>
          </ul>`
        )
      }
    }
  });
}

//Display completed quarterly goals
function displayCompletedQuarterlyGoals() {
  $.ajax({
    type: 'GET',
    url: quarterlyApiTrue,
    datatype: 'jsonp',
    error: function() {
      $('.info').html('<p>An error has occurred</p>');
    },
    success: function(quarterlyData) {
      console.log('success', quarterlyData);
      for (var i = 0; i < quarterlyData.length; i++) {
        $('.quarterly-goals-completed-display').append(
          `<ul class="list-group">
          <li class="list-group-item">${quarterlyData[i].text}</li>
          </ul>`
        )
      }
    }
  });
}

//Display completed weekly goals
function displayCompletedWeeklyGoals() {
  $.ajax({
    type: 'GET',
    url: weeklyApiTrue,
    datatype: 'jsonp',
    error: function() {
      $('.info').html('<p>An error has occurred</p>');
    },
    success: function(weeklyData) {
      console.log('success', weeklyData);
      for (var i = 0; i < weeklyData.length; i++) {
        $('.weekly-goals-completed-display').append(
          `<ul class="list-group">
          <li class="list-group-item">${weeklyData[i].text}</li>
          </ul>`
        )
      }
    }
  });
}

//-------------Edit-------------------//
//still need to connect this to a new button
function editStretchGoals(stretchData) {
  let stretchId = $('.stretch-id').val();
    let newGoal = $('.text-stretch').val();
    let idUrl = `${stretchApi}/${stretchId}`;
    let data = {};
    data.id = `${stretchId}`
    data.text = `${newGoal}`;
    data.completed = false;
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
    });
}

function editQuarterlyGoals(quarterlyData) {
  let qaurterlyId = $('.quarterly-id').val();
    let newGoal = $('.text-stretch').val();
    let idUrl = `${quarterlyApi}/${qaurterlyId}`;
    let data = {};
    data.id = `${qaurterlyId}`
    data.text = `${newGoal}`;
    data.completed = false;
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
    $.ajax(settings).done(function(response) {});
}

function editWeeklyGoals() {
  let weeklyId = $('.weekly-id').val();
    let newGoal = $('.text-stretch').val();
    let idUrl = `${weeklyApi}/${weeklyId}`;
    let data = {};
    data.id = `${weeklyId}`
    data.text = `${newGoal}`;
    data.completed = false;
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
    });
}


//-------------Delete requests-------------------//
function deleteStretchGoals(stretchData) {
  $('.text-stretch').html(
    " "
  )
  let stretchId = $('.stretch-id').val();
  $.ajax({
    method: 'DELETE',
    url: `${stretchApi}/${stretchId}`,
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


function deleteQuarterlyGoals(quarterlyData) {
  $('.text-quarterly').html(
    " "
  )
  let qaurterlyId = $('.quarterly-id').val();
  $.ajax({
    method: 'DELETE',
    url: `${quarterlyApi}/${qaurterlyId}`,
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
    success: function(quarterlyData) {
      console.log('success', quarterlyData);
      getQuarterlyData();
    }
  });
}

function deleteWeeklyGoals(weeklyData) {
  $('.text-weekly').html(
    " "
  )
  let weeklyId = $('.weekly-id').val();
  $.ajax({
    method: 'DELETE',
    url: `${weeklyApi}/${weeklyId}`,
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
    success: function(weeklyData) {
      console.log('success', weeklyData);
      getWeeklyData();
    }
  });
}

//-------------Edit Complete Goal-------------------//
function completeStretch(stretchData) {
    let stretchId = $('.stretch-id').val();
    let goal = $('.text-stretch').val();
    let idUrl = `${stretchApi}/${stretchId}`;
    let data = {};
    data.id = `${stretchId}`
    data.text = `${goal}`;
    data.completed = true;
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
      getStrechGoalsData();
    });
}

function completeQuarterlyGoals(quarterlyData) {
  let qaurterlyId = $('.quarterly-id').val();
    let goal = $('.text-quarterly').val();
    let idUrl = `${quarterlyApi}/${qaurterlyId}`;
    let data = {};
    data.id = `${qaurterlyId}`
    data.text = `${goal}`;
    data.completed = true;
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
      getQuarterlyData();
    });
}

function completeWeeklyGoals(weeklyData) {
    let weeklyId = $('.weekly-id').val();
    let goal = $('.text-weekly').val();
    let idUrl = `${weeklyApi}/${weeklyId}`;
    let data = {};
    data.id = `${weeklyId}`
    data.text = `${goal}`;
    data.completed = true;
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
      getWeeklyData();
    });
}

//-------------POST requests-------------------//
function postStretchGoals() {
  let newGoal = $('.text-stretch').val();
  let data = {};
  data.text = `${newGoal}`;
  data.completed = false;
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
  let newGoal = $('.text-quarterly').val();
  let data = {};
  data.text = `${newGoal}`;
  data.completed = false;
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `${quarterlyApi}`,
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
    getQuarterlyData();
  });
}

function postWeeklyGoals() {
  let newGoal = $('.text-weekly').val();
  let data = {};
  data.text = `${newGoal}`;
  data.completed = false;
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `${weeklyApi}`,
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
    getWeeklyData();
  });
}

//handle the journal
function handleGoal() {
  $('.goals-page').hide();
  $('.daily-page').hide();
  handleNavBar();
  handleStretchButton();
  handleQuarterleyButton();
  handleWeeklyButton();
}
$(handleGoal);
