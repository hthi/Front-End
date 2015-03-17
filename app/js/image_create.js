/*global $:false */
'use strict';

var images = (function(module){

  module.getImageKey = function(callback){
     $.ajax({
      url: environment.host + '/amazon/sign_key',
      type: 'GET'
    }).done(function(data){
      module.amazonParse(data);
      callback();
    }).fail();
  };

  module.buildObject = function(data){
    module.amazonParse(data);
    var thing = {
      key: module.key,
      access_key: module.access_key,
      policy: module.policy,
      signature: module.signature
    };
  };

  module.amazonParse = function(data){
    module.access_key = data.access_key;
    module.key = data.key;
    module.bucket = data.bucket;
    module.signature = data.signature;
    module.acl = data.acl;
    module.policy = data.policy;
    module.sas = data.sas;
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
      console.log(data);
    }).fail();
  };

  module.prepareToSend = function(input, index){
    module.file = input[0].files[0];
    module.getImageKey(module.postRequests);
  };

  module.postRequests = function(){
    module.amazonAjax();
    tournaments.prepareTournament();
  };

  module.test = function(){
    module.getImageKey(module.tryAjax);
  };

  module.amazonAjax = function(){
    $.ajaxPrefilter(function(options){
      options.headers = {};
      options.headers['Accept'] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8";
    });
    var fd = new FormData();

    fd.append('key', module.key);
    fd.append('AWSAccessKeyId', module.access_key);
    fd.append('policy', module.policy);
    fd.append('signature', module.signature);
    fd.append('Content-Type', module.file.type);
    fd.append('file', module.file);
    $.ajax({
      url: 'https://s3.amazonaws.com/my-pixelect-bucket',
      type: 'POST',
      data: fd,
      processData: false,
      contentType: false
    }).done(function(){console.log('sent to amazon')});
  }

  return module

})(images || {});


$(document).ready(function(){

});
