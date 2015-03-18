/*global $:false */
'use strict';

var tournaments = (function(module){

  module.all_tournaments_page = function(){
    tournaments.$container.empty();
    $.ajax({
      url: module.tournaments_path,
    })
    .done(module.render).fail();
  };

  module.render = function(response){
    var template = Handlebars.compile(module.$allTournamentsTemplate.html());
    module.$container.html(template({
        tournaments: response
    }));
    $('.tournament').click(function(){
      tournaments.showTournament(this.id);
    });
  };

  return module

})(tournaments || {});


$(document).ready(function(){

});
