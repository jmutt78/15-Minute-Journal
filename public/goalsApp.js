var STRETCH_GOALS = {
  "stretchGoals": [{
      "id": "11111",
      "text": "I want to go see the world and travel.",
      "publishedDate": 1470011976609
    }
  ]
};

var QUARTERLY_GOALS = {
  "quarterlyGoals": [{
      "id": "55555",
      "text": "I want to run 1 mile.",
      "publishedDate": 1470011976609
    }
  ]
};

var WEEKLY_GOALS = {
  "weeklyGoals": [{
      "id": "9999999",
      "text": "I want to finsh this code.",
      "publishedDate": 1470011976609
    }
  ]
};

function getGoals(callbackFn) {
	setTimeout(function(){ callbackFn(STRETCH_GOALS)}, 1);
  setTimeout(function(){ callbackFn(QUARTERLY_GOALS)}, 1);
  setTimeout(function(){ callbackFn(WEEKLY_GOALS)}, 1);
}

function displayGoals(data) {
//Stretch Goasl
    for (index in data.stretchGoals) {
	   $('.display-goals').append(
        '<p>' + data.stretchGoals[index].text + '</p>');
    }
//Quarterly Goals
    for (index in data.quarterlyGoals) {
     $('.display-goals').append(
        '<p>' + data.quarterlyGoals[index].text + '</p>');
    }
//Weekly Goals
    for (index in data.weeklyGoals) {
	   $('.display-goals').append(
        '<p>' + data.weeklyGoals[index].text + '</p>');
    }
}

function getAndDisplayGoals() {
	getGoals(displayGoals);
}




$(function() {
	getAndDisplayGoals();

})
