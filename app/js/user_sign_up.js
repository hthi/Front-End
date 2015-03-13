/*global $:false */
'use strict';

var users = (function(module){

  module.submitRegistration = function(event) {
  event.preventDefault();
  $.ajax({
    url: module.user_path,
    type: 'POST',
    data: { user: {
      name: $('#name').val(),
      email: $('#email').val(),
      password: $('#password').val(),
      password_confirmation: $('#password-confirmation').val()
    }
  },
  }).done(module.loginSuccess)
  .fail(function(error) {
    console.log(error);
  });
  return false;
};

  module.loginSuccess = function(userData) {
    localStorage.setItem('authToken', userData.token);
    console.log('logged in!');
    window.location.href = '/';
  };

  return module;

})(users || {});

$(document).ready(function(){
  $('form#registration-form').on('submit',Pixelect.submitRegistration);
});

