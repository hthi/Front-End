/*global $:false */
'use strict';

var users = (function(module){

  module.init = function(){
    module.$container = $('#container');
    module.$userShowTemplate = $('#userShowTemplate');
    module.user_path = 'https://agile-thicket-8420.herokuapp.com/users';
  };

  return module

})(users || {});

var tournaments = (function(module){

  module.init = function(){
    module.$container = $('#container');
    module.$allTournamentsTemplate = $('#allTournamentsTemplate')
    module.list = $('ul#tourney-list');
    module.tournaments_path = 'https://agile-thicket-8420.herokuapp.com/tournaments';
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

var environment = (function(module){

  module.host = 'https://agile-thicket-8420.herokuapp.com/';

  module.getParams = function(){
    var params = window.location.search;
    var re = /\d+/;
    return re.exec(params)[0];
  };


  return module

})(environment || {});

$(document).ready(function(){
  users.init();
  tournaments.init();
  images.init();
});
