/*global $:false */
'use strict';

var tournaments = (function(module){

  module.delete_a_tournament = function(id){
    $.ajax({
      url: tournaments.tournaments_path + "/" + id,
      type: 'DELETE'
    }).done(function(){
      location.reload();
    });
  };

  return module;

})(tournaments || {});

$(document).ready(function(){

});
