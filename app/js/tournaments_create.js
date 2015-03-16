/*global $:false */
'use strict';

var tournaments = (function(module){

  module.renderStuff = function(){
    $('#container').empty();
    var template = Handlebars.compile($('#newTournamentTemplate').html());
    $('#container').html(template());
    module.renderHidden();
    $('#newTournamentForm').submit(module.submitTournament);

  };

  module.renderHidden = function(){
    images.getImageKey(images.buildObject);
  };

  module.submitTournament = function(event){
    event.preventDefault();
    var image_array = [];
    var $uploadForm = $('.uploadForm');
    $uploadForm.splice($uploadForm.length-1);
    $uploadForm.each(function(i){
      setTimeout(function(){
        var a = $uploadForm[i];
        a.submit();
        var url = 'https://s3.amazonaws.com/my-pixelect-bucket/' + $(a).find('.imageKey').val();
        image_array.push({'url': url});
        console.log(image_array);
        console.log(i);
      }, i*1000);
    });
    console.log("array:" + image_array);
    setTimeout(function(){
      $.ajax({
      url: module.tournaments_path,
      type: 'POST',
      data: {
        tournament:{
          user_id: 3,
          question: $('#question').val(),
          images_attributes: image_array
        }
      }
    })
    .done(function(data) {
      console.log(data);
    })
    .fail(function() {
      console.log("error");
    });
    }, 10000);

  };


  module.testajax = function(){
    $.ajax({
      url: module.tournaments_path,
      type: 'POST',
      data: {
        tournament:{
          user_id: 3,
          question: 'same',
          images:
            [{url: 'www.image1.com'},
            {url: 'www.image2.com'},
            {url: 'www.image3.com'}]
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
