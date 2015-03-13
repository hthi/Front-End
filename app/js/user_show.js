/*global $:false */
'use strict';

var users = (function(module){

  module.findUser = function(){
    if (localStorage.authToken){
      module.authToken = localStorage.authToken;
    }

  };

  module.show_user_page = function(){
    users.$container.empty();
    $.ajax({
      url: module.user_path + "/" + environment.getParams()
    }).done(module.render).fail();
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

  return module

})(users || {});


$(document).ready(function(){

});
