/*global $:false */
'use strict';

var images = (function(module){

  module.flagImage = function(id){
    $.ajax({
      url: images.images_path + '/' + id + '/flag',
      type: 'POST'
    }).done(function(){
      console.log('image flagged');
    }).fail();
  };

  return module

})(images || {});


$(document).ready(function(){

});
