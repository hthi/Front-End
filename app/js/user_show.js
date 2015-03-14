/*global $:false */
'use strict';

var users = (function(module){

  module.findUser = function(callback){
    var user;
    if (localStorage.authToken){
      module.authToken = localStorage.authToken;
    }
    $.ajaxPrefilter(function( options ) {
        options.headers = {};
        options.headers['AUTHORIZATION'] = module.authToken;
    });
    $.ajax({
      url: users.user_path
    }).done(function(data){
      module.user = data;
      callback(data);
    }).fail();
  };

  module.show_user_page = function(){
    users.$container.empty();
    $.ajaxPrefilter(function( options ) {
        options.headers = {};
        options.headers['AUTHORIZATION'] = module.authToken;
    });
    module.findUser(module.renderUser);
  };

  module.renderUser = function(data){
    $.ajax({
        url: module.user_path + "/" + data.id
      }).done(function(response){
        module.render(response)
      }).fail();
  };

  module.render = function(response){
    var template = Handlebars.compile(module.$userShowTemplate.html());
    module.$container.html(template({
      user: response
    }));
    var template2 = Handlebars.compile($('#allTournamentsTemplate').html());
    $('#tournaments-container').html(template2({
      tournaments: response.tournaments
    }));
  };

  return module;

})(users || {});


$(document).ready(function(){

});
