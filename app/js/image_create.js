/*global $:false */
'use strict';

var images = (function(module){

  module.getAmazonJson = function(){
    $.ajax({
      url: environment.host + '/amazon/sign_key',
      type: 'GET'
    }).done(function(data){
      // console.log(data.key);
      module.getUrl(data);
     }).fail();
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

  module.getUrl = function(data){
    module.amazonParse(data);
    AWS.config.update({accessKeyId: module.access_key, secretAccessKey: module.signature, region: 'us-east-1'});
    var s3 = new AWS.S3();
    var params = {Bucket: module.bucket, Key: module.key};
    s3.getSignedUrl('getObject', params, function(err, url){
      module.createImage(url);
      module.uploadImage(url);
    });

  };

  module.createImage = function(link){
    $.ajax({
      url: module.images_path,
      type: 'POST',
      data:{
        image:{
          url: link,
          tournament_id: 1
        }
      }
    }).done(function(data){
      console.log(data);
    }).fail();
  };

  module.uploadImage = function(link){
    $.ajax({
      url: 'https://my-pixelect-bucket.s3.amazonaws.com/',
      type: 'GET',
      formData:{
        key: "/" + module.key + "/" + $('#amazonfile').val(),
        AWSAccessKeyId: module.access_key,
        acl: module.acl,
        policy: module.policy,
        signature: module.signature,
        success_action_status: module.sas
      }
    }).done(function(data){
      console.log(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(textStatus);
      console.log(errorThrown);
    });
    // $.ajax({
    //   url: link,
    //   type: 'POST',
    //   data:{
    //     file: $('#amazonfile').val()
    //   }
    // }).done(function(data){
    //   console.log(data);
    // }).fail(function(jqXHR, textStatus, errorThrown){
    //   console.log(textStatus);
    //   console.log(errorThrown);
    // });
  };


  return module

})(images || {});


$(document).ready(function(){

});
