var QUESTION1 = {
  "question1": [{
    "id": "11111",
    "publishedDate": 1470011976609,
    "name": "3 things they are thankful for",
    "text1": "life",
    "text2": "wife",
    "text3": "dog"
  }]
};
var QUESTION2 = {
  "question2": [{
    "id": "222222",
    "publishedDate": 1470011976609,
    "name": "3 things that will make today great",
    "text1": "finsh this code",
    "text2": "pary",
    "text3": "live"
  }]
};
var QUESTION3 = {
  "question3": [{
    "id": "3333333",
    "publishedDate": 1470011976609,
    "name": "Daily affirmation",
    "text": "fun"
  }]
};



function getJournal(callbackFn) {
  setTimeout(function() {
    callbackFn(QUESTION1)
  }, 1);
  setTimeout(function() {
    callbackFn(QUESTION2)
  }, 1);
  setTimeout(function() {
    callbackFn(QUESTION3)
  }, 1);
}

function displayJournal(data) {
  //Stretch Goasl
  for (index in data.question1) {
    $('.display-journal').append(
      '<p>' + data.question1[index].name  + '<br>' + data.question1[index].text1 + '<br>' + data.question1[index].text2 + '<br>' + data.question1[index].text3 + '</p>');
}
for (index in data.question2) {
  $('.display-journal').append(
    '<p>' + data.question2[index].name  + '<br>' + data.question2[index].text1 + '<br>' + data.question2[index].text2 + '<br>' + data.question2[index].text3 + '</p>');
}
for (index in data.question3) {
 $('.display-journal').append(
    '<p>' + data.question3[index].name + '<br>' + data.question3[index].text + '</p>');
}
};

function getAndDisplayJournal() {
  getJournal(displayJournal);
}




$(function() {
  getAndDisplayJournal();

})
