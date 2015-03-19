/*global $:false */
'use strict';

var images = (function(module){

  module.getImageKey = function(callback, holder){
     $.ajax({
      url: 'https://agile-thicket-8420.herokuapp.com/amazon/sign_key',
      type: 'GET'
    }).done(function(data){
      callback(data, holder);
    }).fail();
  };

  module.createImage = function(){
    $.ajax({
      url: module.images_path,
      type: 'POST',
      data:{
        image:{
          url: 'https://s3.amazonaws.com/my-pixelect-bucket/' + module.key,
          tournament_id: 1
        }
      }
    }).done(function(data){
    }).fail();
  };

  module.prepareToSend = function(input){
    var file = input[0].files[0];
    module.getImageKey(module.postRequests, file);
  };

  module.postRequests = function(data, holder){
    module.amazonAjax(data, holder);
    tournaments.prepareTournament(data);
  };

  module.test = function(){
    module.getImageKey(module.tryAjax);
  };

  module.amazonAjax = function(data, file){
    $.ajaxPrefilter(function(options){
      options.headers = {};
      options.headers['Accept'] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8";
    });
    var fd = new FormData();

    fd.append('key', data.key);
    fd.append('AWSAccessKeyId', data.access_key);
    fd.append('policy', data.policy);
    fd.append('signature', data.signature);
    fd.append('Content-Type', file.type);
    fd.append('file', file);
    $.ajax({
      url: 'https://s3.amazonaws.com/my-pixelect-bucket',
      type: 'POST',
      data: fd,
      processData: false,
      contentType: false
    }).done(function(){
      console.log('sent to amazon');
      tournaments.updateProgress();
    }).fail(function(data){
      console.log(data);
      tournaments.updateProgress();
    });
  }

  return module

})(images || {});


$(document).ready(function(){

});
