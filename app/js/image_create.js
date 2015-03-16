/*global $:false */
'use strict';

var images = (function(module){

  module.getAmazonJson = function(){
    $.ajax({
      url: environment.host + '/amazon/sign_key',
      type: 'GET'
    }).done(function(data){
      // console.log(data.key);
      // module.getUrl(data);
      // module.getObject(data);
      module.createObject(data);
     }).fail();
  };

  module.createObject = function(data){
    module.amazonParse(data);
    var thing = {
      key: module.key,
      access_key: module.access_key,
      policy: module.policy,
      signature: module.signature
    };
    module.renderTemp(thing);
  };

  module.renderTemp = function(thing){
    AWS.config.update({accessKeyId: module.access_key, secretAccessKey: module.signature, region: 'us-east-1'});
    var templ = Handlebars.compile($('#imageHeaderTemplate').html());
    $('#imgContainer').html(templ({
      imageHeader: thing
    }));
    $('#uploadForm').on('submit', function(e){
      e.preventDefault();
      this.submit();
      images.createImage();
      $(this).replaceWith($(this).clone());
    })
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
    s3.getSignedUrl('putObject', params, function(err, url){
      module.createImage(url);
      module.uploadImage(url);
    });

  };

  // module.getObject = function(data){
  //   module.amazonParse(data);
  //   AWS.config.update({accessKeyId: module.access_key, secretAccessKey: module.signature, region: 'us-east-1'});
  //   new AWS.S3().listObjects({Bucket: module.bucket}, function(error, data) {
  //     if (error) {
  //       console.log(error); // an error occurred
  //     } else {
  //       console.log(data); // request succeeded
  //     }
  //   });
  // };

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

  module.uploadImage = function(link){
    $.ajax({
      url: 'https://my-pixelect-bucket.s3.amazonaws.com/',
      type: 'PUT',
      formdata:{
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
    //   type: 'PUT',
    //   formdata:{
    //     key: "/" + $('#amazonfile').val(),
    //     AWSAccessKeyId: module.access_key,
    //     acl: module.acl,
    //     policy: module.policy,
    //     signature: module.signature,
    //     success_action_status: module.sas
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
