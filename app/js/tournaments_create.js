/*global $:false */
'use strict';

var tournaments = (function(module){

  module.renderStuff = function(){
    $('#container').empty();
    var template = Handlebars.compile($('#newTournamentTemplate').html());
    $('#container').html(template());
    module.renderHidden();
    $('#newTournamentForm').submit(module.submitTournament);

  };

  module.renderHidden = function(){
    images.getImageKey(images.buildObject);
  };

  module.submitTournament = function(event){
    event.preventDefault();
    var $uploadForm = $('.uploadForm');
    $uploadForm.splice($uploadForm.length-1);
    $uploadForm.each(function(i){
      setTimeout(function(){
        $uploadForm[i].submit();
        console.log(i);
      }, i*1000);
    });
  };

  return module;

})(tournaments || {});


$(document).ready(function(){
  $('#newTournamentNav').click(tournaments.renderStuff);
  // $('#newTournamentForm').submit(tournaments.submitTournament);
});
