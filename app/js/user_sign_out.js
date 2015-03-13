/*global $:false */
'use strict';

var users = (function(module){

  module.sign_out = function(){
    localStorage.authToken = '';
  };

  return module;

})(users || {});


$(document).ready(function(){

});
