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
    getQuarterlyData();
    getWeeklyData();

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
//Quarterly Button
function handleQuarterleyButton(){
  //Post Buton
    $('.quarterly-go-button').click(function() {
      postQuarterlyGoals();
    });
    //Edit Button
      $('.quarterly-edit-button').click(function() {
        $('.text-quarterly').removeAttr('readonly', 'readonly');
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
            editStretchGoals(quarterlyData);
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
function handleWeeklyButton(){
  //Post Buton
    $('.weekly-go-button').click(function() {
      postWeeklyGoals();
    });
    //Edit Button
      $('.weekly-edit-button').click(function() {
        $('.text-weekly').removeAttr('readonly', 'readonly');
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
            editStretchGoals(weeklyData);
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
    url: stretchApi,
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
    }
  });
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
  console.log(Object.keys(quarterlyData).length);
  if (Object.keys(quarterlyData).length != 0) {
    for (var i = 0; i < quarterlyData.length; i++) {
      console.log('object preset');
      $('.quarterly-go-button').hide();
      $('.quarterly-edit-go-button').hide();
      $('.quarterly-edit-button').show();
      $('.quarterly-delete-button').show();
      $('.quarterly-complete-button').show();
      $('.text-quarterly').attr('readonly', 'readonly');
      $('.text-quarterly').html(
        `${quarterlyData[i].text}`
      )
    }
  } else {
    console.log('object not preset');
    $('.quarterly-edit-go-button').hide();
    $('.quarterly-edit-button').hide();
    $('.quarterly-delete-button').hide();
    $('.quarterly-complete-button').hide();
    $('.quarterly-go-button').show();
    $('.text-quarterly').removeAttr('readonly', 'readonly');
    $('.text-quarterly').val(" ");
  }
}

//Weekly Goal Display
function fetchWeeklyResults(weeklyData) {
  console.log(Object.keys(weeklyData).length);
  if (Object.keys(weeklyData).length != 0) {
    for (var i = 0; i < weeklyData.length; i++) {
      console.log('object preset');
      $('.weekly-go-button').hide();
      $('.weekly-edit-go-button').hide();
      $('.weekly-edit-button').show();
      $('.weekly-delete-button').show();
      $('.weekly-complete-button').show();
      $('.text-weekly').attr('readonly', 'readonly');
      $('.text-weekly').html(
        `${weeklyData[i].text}`
      )
    }
  } else {
    console.log('object not preset');
    $('.weekly-edit-go-button').hide();
    $('.weekly-edit-button').hide();
    $('.weekly-delete-button').hide();
    $('.weekly-complete-button').hide();
    $('.weekly-go-button').show();
    $('.text-weekly').removeAttr('readonly', 'readonly');
    $('.text-weekly').val(" ");
  }
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
        data.completed = false;
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

        });
      }
}

function editQuarterlyGoals(quarterlyData) {
  for (var i = 0; i < quarterlyData.length; i++) {
      console.log(quarterlyData[i].id);
      let newGoal = $('.text-stretch').val();
      console.log(`${quarterlyApi}/${quarterlyData[i].id}`);
      let idUrl = `${quarterlyApi}/${quarterlyData[i].id}`;
      let data = {};
      data.id = `${quarterlyData[i].id}`
      data.text = `${newGoal}`;
      data.completed = false;
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
      });
    }
}

function editWeeklyGoals() {
  for (var i = 0; i < weeklyData.length; i++) {
      console.log(weeklyData[i].id);
      let newGoal = $('.text-stretch').val();
      console.log(`${weeklyApi}/${weeklyData[i].id}`);
      let idUrl = `${weeklyApi}/${weeklyData[i].id}`;
      let data = {};
      data.id = `${weeklyData[i].id}`
      data.text = `${newGoal}`;
      data.completed = false;
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
      });
    }

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


function deleteQuarterlyGoals(quarterlyData) {
  $('.text-quarterly').html(
    " "
  )
  for (var i = 0; i < quarterlyData.length; i++) {
    $.ajax({
      method: 'DELETE',
      url: `${quarterlyApi}/${quarterlyData[i].id}`,
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
}

function deleteWeeklyGoals(weeklyData) {
  $('.text-weekly').html(
    " "
  )
  for (var i = 0; i < weeklyData.length; i++) {
    $.ajax({
      method: 'DELETE',
      url: `${weeklyApi}/${weeklyData[i].id}`,
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

}

//-------------Edit Complete Goal-------------------//
// function completeStretch(stretchData) {
//   for (var i = 0; i < stretchData.length; i++) {
//       console.log(stretchData[i].id);
//       let goal = $('.text-stretch').val();
//       console.log(`${stretchApi}/${stretchData[i].id}`);
//       let idUrl = `${stretchApi}/${stretchData[i].id}`;
//       let data = {};
//       data.id = `${stretchData[i].id}`
//       data.text = `${goal}`;
//       data.completed = false;
//       console.log(JSON.stringify(data));
//
//       var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": `${idUrl}`,
//         "method": "PUT",
//         "headers": {
//           "Content-Type": "application/json",
//           "cache-control": "no-cache",
//         },
//         "processData": false,
//         "data": JSON.stringify(data)
//       }
//       $.ajax(settings).done(function(response) {
//         console.log(response);
//         //Get the object and push it back up to dispaly
//
//       });
//
//     }
//
// }
//
// function completeQuarterlyGoals() {
//
//
// }
//
// function completeWeeklyGoals() {
//
//
// }

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
  let newGoal = $('.text-quarterly').val();
  console.log(newGoal);
  let data = {};
  data.text = `${newGoal}`;
  data.completed = false;
  console.log(JSON.stringify(data));

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
  console.log(newGoal);
  let data = {};
  data.text = `${newGoal}`;
  data.completed = false;
  console.log(JSON.stringify(data));

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
