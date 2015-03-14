/*global $:false */
'use strict';

var tournaments = (function(module){

  module.delete_a_tournament = function(id){
    $.ajax({
      url: module.tournaments_path + "/" + id,
      type: 'DELETE'
    })
    .done(function(data)).fail();
  };

  return module;

})(tournaments || {});

$(document).ready(function(){

});
