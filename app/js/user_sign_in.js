/*global $:false */
'use strict';

var users = (function(module){

  module.run = function() {
    module.authToken = localStorage.getItem('authToken');

    module.setupAjaxRequests();

    $('#login-form').on('submit', users.submitLogin);
  };

  module.setupAjaxRequests = function() {
    $.ajaxPrefilter(function( options ) {
        options.headers = {};
        options.headers['AUTHORIZATION'] = "Token token=" + module.authToken;
    });
  };

  module.submitLogin = function(event) {
    event.preventDefault();
    $.ajax({
      url: module.user_path + '/sign_in',
      type: 'POST',
      data: {
          name: $('#name').val(),
          password: $('#password').val()
      }
    })
    .done(function(data) {
      module.loginSuccess(data);
    })
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

  module.acceptFailure = function(error) {
    if (error.status === 401) {
        console.log('SEND TO LOGIN SCREEN');
        window.location.href = '/sign_in.html';
    }
  };

  return module;

})(users || {});


$(document).ready(function(){
  users.run();
});
