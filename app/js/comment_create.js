/*global $:false */
'use strict';

var comments = (function(module){

  module.submitComment = function(){
   $('#newComment').submit(module.createComment);
  };

  module.createComment = function(){
    $.ajax({
      url: module.tournament_path,
      type: 'POST',
      data: {
        comment: {
          tournament_id: tournaments.tournament.id,
          body: $('#comment').val()
        }
      }
    }).done(function(data){
      console.log(data);
    }).fail();
  };

  return module

})(comments || {});


$(document).ready(function(){

});
