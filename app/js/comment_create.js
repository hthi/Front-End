/*global $:false */
'use strict';

var comments = (function(module){

  module.createComment = function(tourney){
    $.ajax({
      url: 'https://agile-thicket-8420.herokuapp.com/tournaments/' + tourney.id + "/comments",
      type: 'POST',
      data: {
        comment: {
          body: $('#comment').val() + '--' + users.user.name,
          user_id: users.user.id
        }
      }
    }).done(function(data){
      tournaments.renderClosedTournament(data);
    }).fail();
  };

  module.createWinnerComment = function(tourney){
    console.log('here');
    $.ajax({
      url: 'https://agile-thicket-8420.herokuapp.com/tournaments/' + tourney.id + "/comments",
      type: 'POST',
      data: {
        comment: {
          body: $('#comment').val() + '--' + users.user.name,
          user_id: users.user.id
        }
      }
    }).done(function(data){
      console.log(data);
      tournaments.renderWinner(data);
    }).fail(function(){
      console.log('err');
    });
  };

  module.addSubcomment = function(button){
    $.ajax({
      url: 'https://agile-thicket-8420.herokuapp.com/comments/' + button.id,
      type: 'PATCH',
      data:{comment:{
        subcomment: $(button).parent().find('textarea').val()
        }
      }
    }).done(function(response){
      tournaments.renderClosedTournament(response);
    }).fail();
  };

  return module

})(comments || {});


$(document).ready(function(){

});
