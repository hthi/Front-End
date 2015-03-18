/*global $:false */
'use strict';

var tournaments = (function(module){

  module.each_slice = function(){
    var arr = [1,2,3,4,5,6,7,8,9];
    console.log(_.chain(arr).groupBy(function(element, index){
      return Math.floor(index/n);
    }).toArray().val());
  };

  module.renderStuff = function(){
    environment.emptyContainers();
    var template = Handlebars.compile($('#newTournamentTemplate').html());
    $('#container').html(template());
    module.renderFileUpload();
    $('#newTournamentForm').submit(module.submitTournament);
  };

  module.renderFileUpload = function(){
    var template = Handlebars.compile($('#imageHeaderTemplate').html());
    $('#uploadContainer').append(template({}));
    $('.file').change(function(){
      tournaments.renderFileUpload();
      $(this).prop('disabled', true);;
    });
  };

  module.submitTournament = function(event){
    event.preventDefault();
    module.image_array = [];
    module.$files = $('.file');
    module.$files.splice(module.$files.length-1);
    module.$files.each(function(){
      images.prepareToSend($(this));
    });
  };

  module.prepareTournament = function(data){
    var url = 'https://s3.amazonaws.com/my-pixelect-bucket/' + data.key;
    module.image_array.push({'url': url});
    module.safeToCreate();
  };

  module.safeToCreate = function(){
    if (module.image_array.length === module.$files.length){
      console.log('time to create');
      users.findUser(tournaments.createTournament);
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
          user_id: users.user.id,
          question: $('#question').val(),
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
