/*global $:false */
'use strict';

var users = (function(module){

  module.sign_out = function(){
    localStorage.authToken = '';
    module.user = undefined;
    location.reload();
  };

  return module;

})(users || {});


$(document).ready(function(){

});
