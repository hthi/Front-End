/*global $:false */
'use strict';

var tournaments = (function(module){

  module.renderStuff = function(){
    $('#container').empty();
    var template = Handlebars.compile($('#newTournamentTemplate').html());
    $('#container').html(template());
    $('input#file').change(module.putFileInList);
  };

  module.putFileInList = function(){
    $('#fileList').append($('<li>').text($('input#file').val()));
    $(this).replaceWith($(this).clone());
    $('input#file').change(module.putFileInList);
  };

  module.submitTournament = function(e){
    e.preventDefault();
  };

  return module

})(tournaments || {});


$(document).ready(function(){
  $('#newTournamentNav').click(tournaments.renderStuff);
  $('#newTournamentForm').submit(tournaments.submitTournament);
});
