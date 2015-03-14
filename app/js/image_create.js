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
    // console.log(data);
    module.access_key = data.access_key;
    module.bucket = data.bucket;
  };

  module.getUrl = function(data){
    module.amazonParse(data);
    var s3 = new AWS.S3();
    var params = {Bucket: module.bucket, Key: module.access_key};
    console.log(params);
    s3.getSignedUrl('getObject', params, function(err, url){
      console.log(url);
    });

  };


  return module

})(images || {});


$(document).ready(function(){

});
