/*global $:false */
'use strict';

var tournaments = (function(module){

  module.tournaments_page = function(option){
    tournaments.$container.empty();
    $.ajax({
      url: module.tournaments_path,
    })
    .done(function(data){
      module.render(data, option);
    }).fail();
  };

  module.render = function(response, option, place){
    response = _.filter(response, function(tournament){ return tournament.status == option});
    console.log(response);
    var template = Handlebars.compile(module.$allTournamentsTemplate.html());

    if (place){
      place.html(template({
        tournaments: response
    }));
    } else {
      module.$container.html(template({
        tournaments: response
    }));
    }

    $('.tournament').click(function(){
      tournaments.showTournament(this.id);
    });
  };

  return module

})(tournaments || {});


$(document).ready(function(){

});
