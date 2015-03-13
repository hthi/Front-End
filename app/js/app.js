/*global $:false */
'use strict';

var users = (function(module){

  var user_path = 'https://agile-thicket-8420.herokuapp.com/users';

  module.init = function(){

  };

  return module

})(users || {});

var tournaments = (function(module){

  var tournament_path = 'https://agile-thicket-8420.herokuapp.com/tournaments';

  module.init = function(){
    module.container = $('#container');
    module.list = $('ul#tourney-list');
    tournament_path;
  };

  return module

})(tournaments || {});

var images = (function(module){

  var images_path = 'https://agile-thicket-8420.herokuapp.com/images';
  var tournament_path = 'https://agile-thicket-8420.herokuapp.com/tournaments'

  module.init = function(){

  };

  return module

})(images || {});

$(document).ready(function(){
  users.init();
  tournaments.init();
  images.init();
});
