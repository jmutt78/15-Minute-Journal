var TASKS = {
  "tasks": [{
      "id": "11111",
      "text": "Meditate",
      "publishedDate": 1470011976609,
      "dueDate": 1470011976609
    },
    {
        "id": "222222",
        "text": "Journal",
        "publishedDate": 1470011976609,
        "dueDate": 1470011976609
      },
      {
          "id": "333333",
          "text": "Daily Email",
          "publishedDate": 1470011976609,
          "dueDate": 1470011976609
        },
        {
            "id": "333333",
            "text": "Feed the dog",
            "publishedDate": 1470011976609,
            "dueDate": 1470011976609
          }
  ]
};


function getTasks(callbackFn) {
	setTimeout(function(){ callbackFn(TASKS)}, 1);
}

function displayTasks(data) {
    for (index in data.tasks) {
	   $('.display-tasks').append(
        '<p>' + data.tasks[index].text + '</p>');
    }
}
function getAndDisplayTasks() {
	getTasks(displayTasks);
}


$(function() {
	getAndDisplayTasks();

})
