const authApi = 'http://localhost:8080/api/auth/login';

function handleLogin() {
  $('.topnav').hide();
  $('.login-form').hide();
  $('.login-button').click(function() {
    getUser();
  });
}



//***************CORE FUNCTIONS**************
//-------------Get requests-------------------//

function getUser() {
  $('.login-form').show();
  $('.landing-page').hide();
  $('.login-form').submit(function() {
    event.preventDefault();
    let userName = $('.username').val();
    let password = $('.user-password').val();
    console.log(userName);
    console.log(password);
    let data = {};
    data.username = `${userName}`;
    data.password = `${password}`;
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `${authApi}`,
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
      localStorage.setItem('token', response.authToken);
      console.log(localStorage.getItem('token'));
    });

  });
}









function handleUser() {
  handleLogin();

}

$(handleUser);
