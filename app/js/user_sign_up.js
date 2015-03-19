/*global $:false */
'use strict';

var users = (function(module){

  module.renderSignUp = function(){
    var overlay = $('<div></div>').prependTo('body').attr('id', 'overlay');
    $('#signContainer').empty();
    var template = Handlebars.compile($('#signUpTemplate').html());
    $('#signContainer').html(template({}));
    $('#signSubmit').click(function(event){
      event.preventDefault();
      module.submitRegistration();
    });
    $('#signCancel').click(function(){
      module.removeModal();
    });
  };


  module.submitRegistration = function() {
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

  return module;

})(users || {});

$(document).ready(function(){
  $('form#registration-form').on('submit',users.submitRegistration);
});

