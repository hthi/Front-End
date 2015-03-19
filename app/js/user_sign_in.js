/*global $:false */
'use strict';

var users = (function(module){

  module.renderSignIn = function(){
    var overlay = $('<div></div>').prependTo('body').attr('id', 'overlay');
    $('#signContainer').empty();
    var template = Handlebars.compile($('#signInTemplate').html());
    $('#signContainer').html(template({}));
    $('#signInSubmit').click(function(event){
      event.preventDefault();
      module.submitLogin();
    });
    $('#signCancel').click(function(){
      module.removeModal();
    });
  };

  module.removeModal = function(){
    $('#overlay').remove();
    $('.modal').remove();
  };

  module.submitLogin = function() {
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
    module.findUser();
    module.removeModal();
    environment.setUpNav();
  };

  return module;

})(users || {});


$(document).ready(function(){
});
