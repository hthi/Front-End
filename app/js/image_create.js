/*global $:false */
'use strict';

var images = (function(module){

  module.getImageKey = function(callback){
     $.ajax({
      url: environment.host + '/amazon/sign_key',
      type: 'GET'
    }).done(callback).fail();
  };

  module.buildObject = function(data){
    module.amazonParse(data);
    var thing = {
      key: module.key,
      access_key: module.access_key,
      policy: module.policy,
      signature: module.signature
    };
    var template = Handlebars.compile($('#imageHeaderTemplate').html());
    $('#secretContainer').append(template({imageHeader: thing}));
    $('.file').change(tournaments.renderHidden);
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

  return module

})(images || {});


$(document).ready(function(){

});
