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
      if (callback) {
        callback(data);
      }
    }).fail();
  };

  module.show_user_page = function(){
    environment.emptyContainers();
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
        module.render(response);
      }).fail();
  };

  module.render = function(response){
    var template = Handlebars.compile(module.$userShowTemplate.html());
    $('#openContainer').html(template({
      user: response
    }));
    var template2 = Handlebars.compile($('#userTournamentsTemplate').html());
    $('#closedContainer').html(template2({
      tournaments: response.tournaments
    }));
    var template3 = Handlebars.compile($('#newTournamentTemplate').html());
    $('#openContainer').append(template3({}));
    tournaments.renderFileUpload();
    $('#newTournamentForm').submit(tournaments.submitTournament);
    $('.delete').click(function(event){
      event.preventDefault();
      tournaments.delete_a_tournament(this.id);
    });
    $('.tournament').click(function(){
      tournaments.showTournament(this.id);
    });
  };

  return module;

})(users || {});


$(document).ready(function(){

});
