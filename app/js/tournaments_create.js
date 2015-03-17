/*global $:false */
'use strict';

var tournaments = (function(module){

  module.renderStuff = function(){
    $('#container').empty();
    var template = Handlebars.compile($('#newTournamentTemplate').html());
    $('#container').html(template());
    module.renderFileUpload();
    $('#newTournamentForm').submit(module.submitTournament);
  };

  module.renderFileUpload = function(){
    var template = Handlebars.compile($('#imageHeaderTemplate').html());
    $('#uploadContainer').append(template({}));
    $('.file').change(tournaments.renderFileUpload);
  };

  module.submitTournament = function(event){
    event.preventDefault();
    module.image_array = [];
    module.$files = $('.file');
    module.$files.splice(module.$files.length-1);
    module.$files.each(function(i){
        console.log(i);
        images.prepareToSend($(this), i);
    });
  };

  module.prepareTournament = function(){
    var url = 'https://s3.amazonaws.com/my-pixelect-bucket/' + images.key;
    module.image_array.push({'url': url});
    module.safeToCreate();
  };

  module.safeToCreate = function(){
    if (module.image_array.length === module.$files.length){
      console.log('time to create');
      module.createTournament();
    } else {
      console.log('not yet.');
    }
  };

  module.createTournament = function(){
    $.ajax({
      url: module.tournaments_path,
      type: 'POST',
      data: {
        tournament:{
          user_id: 3,
          question: 'same',
          images_attributes: module.image_array
        }
      }
    })
    .done(function(data) {
      console.log(data);
    })
    .fail(function() {
      console.log("error");
    });
  };

  return module;

})(tournaments || {});


$(document).ready(function(){
  $('#newTournamentNav').click(tournaments.renderStuff);
  // $('#newTournamentForm').submit(tournaments.submitTournament);
});
