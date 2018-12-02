'use strict';
const taskApi = 'https://obscure-ocean-89688.herokuapp.com/tasks';


//***************CORE FUNCTIONS**************
//-------------Get requests-------------------//
function getTasks() {
  $('#tasks-nav').click(function() {
    $('.task-page').show();
    $('.landing-page').hide();
    $('.goals-page').hide();
    $('.daily-page').hide();
    $('.task-edit-button').hide();
    $('.task-delete-button').hide();
    $('.task-complete-button').hide();
    $.ajax({
      type: 'GET',
      url: taskApi,
      datatype: 'jsonp',
      error: function() {
        $('.info').html('<p>An error has occurred</p>');
      },
      success: function(taskData) {
        console.log('success', taskData);
        dispalyTasks(taskData);
       deleteTasks(taskData)

      }

    });
    });
  }

  //-------------Task display-------------------//
  function dispalyTasks(taskData) {

    for (var i = 0; i < taskData.length; i++) {
console.log(taskData[i].id);


      $('.task-display').append(
        `        <textarea class="task-display-text" rows="1" cols="50">
                ${taskData[i].text}
                </textarea>
                <textarea class="task-id" hidden>
                ${taskData[i].id}
                </textarea>
                <button class="task-edit-button" type="submit">Edit</button>
                <button class="task-delete-button" type="submit">Delete</button>
                <button class="task-complete-button" type="submit">Complete</button>`
      )
  }
}

  //-------------Post-------------------//
  function createTasks() {


  }
  //-------------Complete Tasks-------------------//
  function completeTasks() {


  }
  //-------------Delete Tasks-------------------//
  function deleteTasks() {
    $('.task-delete-button').click(function() {
      let taskId = $('.task-id').val();
      console.log(taskId);

        // $.ajax({
        //   method: 'DELETE',
        //   url: `${taskApi}/${}`,
        //   async: true,
        //   crossDomain: true,
        //   headers: {
        //     contentType: "application/json",
        //     cacheControl: "no-cache",
        //   },
        //   processData: false,
        //   datatype: 'jsonp',
        //   data: {},
        //   error: function() {
        //     $('.info').html('<p>An error has occurred</p>');
        //   },
        //   success: function(stretchData) {
        //     console.log('success', stretchData);
        //
        //   }
        // });


    });

  }

  function handleTasks() {
    getTasks();

  }

$(handleTasks);
