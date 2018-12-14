const authApi = 'https://obscure-ocean-89688.herokuapp.com/api/auth/login';

function handleLogin() {
  $('.topnav').hide();
  $('.login-form').hide();
  $('.logout-button').hide();
  $('.login-button').click(function() {
    $('.login-button').hide();
    getUser();
  });
  $('.logout-button').click(function() {
    location.reload();

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
    $.ajax(settings)
    .done(function(response){
      $('.error').hide();
      $('.logout-button').show();
      $('.login-form').hide();
      $('.topnav').show();
      console.log(response);
      localStorage.setItem('token', response.authToken);
      console.log(localStorage.getItem('token'));







    })
    .fail(function(xhr, status, error) {
        console.log('no obj');
        $('.error').show();
        $('.error').html('<p>Your username and password do not match</p>');
    });


  });
}









function handleUser() {
  handleLogin();

}

$(handleUser);
