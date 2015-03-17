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
      if (reponse.status === 'open'){
        module.renderOpenTournament(response);
      } else {
        module.renderClosedTournament(response);
      }

    })
    .fail(function() {
      console.log("error");
    });
  };

  module.renderOpenTournament = function(){

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
