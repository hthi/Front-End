/*global $:false */
'use strict';

var tournaments = (function(module){

  module.tournaments_page = function(option){
    environment.emptyContainers();
    $.ajax({
      url: module.tournaments_path,
    })
    .done(function(data){
      module.render(data, option);
    }).fail();
  };

  module.capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  module.render = function(response, option, place){
    response = _.filter(response, function(tournament){ return tournament.status == option});
    response.status = module.capitalize(option) + ' Tournaments';
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
