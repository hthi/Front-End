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
  };

  module.getUrl = function(data){
    module.amazonParse(data);
    AWS.config.update({accessKeyId: module.access_key, secretAccessKey: module.signature, region: 'us-east-1'});
    var s3 = new AWS.S3();
    var params = {Bucket: module.bucket, Key: module.key};
    s3.getSignedUrl('getObject', params, function(err, url){
      console.log(url);
    });

  };


  return module

})(images || {});


$(document).ready(function(){

});
