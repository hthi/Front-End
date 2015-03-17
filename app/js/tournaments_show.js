/*global $:false */
'use strict';

var tournaments = (function(module){

  module.showTournament = function(){
    module.getTournament(74);
    };

  module.getTournament = function(id){
    $.ajax({
      url: module.tournaments_path + "/" + id.toString(),
    })
    .done(function(response) {
      if (response.status === 'open'){
        module.renderOpenTournament(response);
      } else {
        module.renderClosedTournament(response);
      }

    })
    .fail(function() {
      console.log("error");
    });
  };

  module.renderOpenTournament = function(response){
    var activeObject = {question: response.question, leftImage: response.images[0], rightImage: response.images[1]}
    var template = Handlebars.compile($('#showOpenTournamentTemplate').html());
    $('#container').html(template({
      tournament: activeObject
    }));
  };

  module.renderClosedTournament = function(response){
    var template = Handlebars.compile($('#showClosedTournamentTemplate').html());
    $('#container').html(template({
      tournament: response
    }));
  };



  return module

})(tournaments || {});


$(document).ready(function(){

});
