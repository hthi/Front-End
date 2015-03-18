/*global $:false */
'use strict';

var tournaments = (function(module){


  module.delete_a_tournament = function(id){
    var overlay = $('<div></div>').prependTo('body').attr('id', 'overlay');
    $('#signContainer').empty();
    var template = Handlebars.compile($('#deleteTemplate').html());
    $('#signContainer').html(template({
      id: {target: id}
    }));
    $('#destroy').click(function(){
      module.actually_delete_a_tournament($('#target_id').val());
      users.removeModal();
    });
    $('#cancel').click(function(){
      users.removeModal();
    });
  };

  module.actually_delete_a_tournament = function(id){
    $.ajax({
      url: tournaments.tournaments_path + "/" + id,
      type: 'DELETE'
    }).done(function(){
      users.removeModal();
      users.show_user_page();
    });
  };

  return module;

})(tournaments || {});

$(document).ready(function(){

});
