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
    getGoalsData();
  });

}

//***************CORE FUNCTIONS**************
//-------------Get requests-------------------//
function getGoalsData() {
  let stretchGoalUrl = stretchApi;
  let quarterlyGoalUrl = quarterlyApi;
  let weeklyGoalUrl = weeklyApi;
  $('#goals-nav').click(function() {
//hide show to start the page
    $('.stretch-edit-button').hide();
    $('.stretch-delete-button').hide();
    $('.stretch-complete-button').hide();
    $('.quarterly-edit-button').hide();
    $('.quarterly-delete-button').hide();
    $('.quarterly-complete-button').hide();
    $('.weekly-edit-button').hide();
    $('.weekly-delete-button').hide();
    $('.weekly-complete-button').hide();
//ajax get request for stretch goals
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
        deleteStretchGoals(stretchData);

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
        deleteQuarterlyGoals(quarterlyData);
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
        deleteQuarterlyGoals(weeklyData);
      }

    });
  });
}
//Stretch goal display
function fetchStretchResults(stretchData) {
  for (var i = 0; i < stretchData.length; i++) {
    if (Object.keys(stretchData).length === 0) {
      $('.stretch-go-button').show();
      $('.text-stretch').removeAttr('readonly', 'readonly');
    } else {
      $('.stretch-go-button').hide();
      $('.stretch-edit-button').show();
      $('.stretch-delete-button').show();
      $('.stretch-complete-button').show();
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
      $('.quarterly-go-button').show();
      $('.text-quarterly').removeAttr('readonly', 'readonly');
    } else {
      $('.quarterly-go-button').hide();
      $('.quarterly-edit-button').show();
      $('.quarterly-delete-button').show();
      $('.quarterly-complete-button').show();
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
      $('.weekly-go-button').show();
      $('.text-weekly').removeAttr('readonly', 'readonly');
    } else {
      $('.weekly-go-button').hide();
      $('.weekly-edit-button').show();
      $('.weekly-delete-button').show();
      $('.weekly-complete-button').show();
      $('.text-weekly').attr('readonly', 'readonly');
      $('.text-weekly').html(
        `${weeklyData[i].text}`
      )
    }
  }
}


//-------------Edit-------------------//
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
          async: true,
          crossDomain: true,
          headers: {
            contentType: "application/json",
            cacheControl: "no-cache",
          },
          processData: false,
          datatype: 'jsonp',
          data: {
            "id": "5bf8b06750ae3f00165c3da2",
            "text": "This dsapp will be the best thing ever",
            "created": 1543024743839,
            "completed": false
          },
          error: function() {
            $('.info').html('<p>An error has occurred</p>');
          },
          success: function(stretchData) {
            console.log('success', stretchData);

          }

        });

        //Postman Call works
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://obscure-ocean-89688.herokuapp.com/stretch/5bf8b06750ae3f00165c3da2",
          "method": "PUT",
          "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Postman-Token": "35ed830e-06b8-4718-b6de-7fda3b25282b"
          },
          "processData": false,
          "data": "    {\n        \"id\": \"5bf8b06750ae3f00165c3da2\",\n        \"text\": \"This dsapp will be the best thing ever\",\n        \"created\": 1543024743839,\n        \"completed\": false\n    }"
        }

        $.ajax(settings).done(function(response) {
          console.log(response);
        });
      }
    });
  });
}

function editQuarterlyGoals() {


}

function editWeeklyGoals() {


}


//-------------Delete requests-------------------//
function deleteStretchGoals(stretchData) {
  $('.stretch-delete-button').click(function() {
    for (var i = 0; i < stretchData.length; i++) {
      console.log(stretchData[i].id);

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

        }
      });
    }
    $('.stretch-edit-button').hide();
    $('.stretch-delete-button').hide();
    $('.stretch-complete-button').hide();
    $('.stretch-go-button').show();
    $('.text-stretch').removeAttr('readonly', 'readonly');
    $('.text-stretch').html(
      " "
    )
  });
}


function deleteQuarterlyGoals() {
  $('.quarterly-delete-button').click(function() {
    for (var i = 0; i < quarterlyData.length; i++) {
      console.log(quarterlyData[i].id);

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

        }
      });
    }
    $('.quarterly-edit-button').hide();
    $('.quarterly-delete-button').hide();
    $('.quarterly-complete-button').hide();
    $('.quarterly-go-button').show();
    $('.text-quarterly').removeAttr('readonly', 'readonly');
    $('.text-quarterly').html(
      " "
    )
  });

}

function deleteWeeklyGoals() {
  $('.weekly-delete-button').click(function() {
    for (var i = 0; i < weeklyData.length; i++) {
      console.log(weeklyData[i].id);

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
          console.log('success', quarterlyData);
        }
      });
    }
    $('.weekly-edit-button').hide();
    $('.weekly-delete-button').hide();
    $('.weekly-complete-button').hide();
    $('.weekly-go-button').show();
    $('.text-weekly').removeAttr('readonly', 'readonly');
    $('.text-weekly').html(
      " "
    )
  });

}

//-------------Edit Complete Goal-------------------//
function completeStretch() {


}

function completeQuarterlyGoals() {


}

function completeWeeklyGoals() {


}

//-------------POST requests-------------------//
function postStretchGoals() {
  $('.stretch-go-button').click(function() {
    let newGoal = $('.text-stretch').val();
    console.log(newGoal);
    let data = {};
    data.id= "5bf8b06750ae3f00165c3da2";
    data.text= "This dsapp will be the best thing ever";
    data.created= 543024743839;
    data.completed= false;
  console.log(JSON.stringify(data));

    $.ajax({
      method: 'POST',
      url: `${stretchApi}`,
      async: true,
      crossDomain: true,
      headers: {
        contentType: "application/json",
        cacheControl: "no-cache",
      },
      processData: false,
      datatype: 'json',
      data: JSON.stringify(data),
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(stretchData) {
        console.log('success', stretchData);
      }

    });

  });
}

function postQuarterlyGoals() {


}

function postWeeklyGoals() {


}


//handle the journal
function handleGoal() {
  $('.goals-page').hide();
  $('.task-page').hide();
  $('.daily-page').hide();
  getGoalsData();
  handleNavBar();
  postStretchGoals();
}


$(handleGoal);
