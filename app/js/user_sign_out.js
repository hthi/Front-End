/*global $:false */
'use strict';

var users = (function(module){

  module.sign_out = function(){
    localStorage.authToken = '';
    module.user = null;
  };

  return module;

})(users || {});


$(document).ready(function(){

});
