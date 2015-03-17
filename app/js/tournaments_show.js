/*global $:false */
'use strict';

var tournaments = (function(module){

  module.each_slice = function(arr){
    return _.chain(arr).groupBy(function(element,index){
      return Math.floor(index/2);
    }).toArray()._wrapped;
  };

  module.showTournament = function(){
    module.getTournament(74);
    };

  module.getTournament = function(id){
    $.ajax({
      url: module.tournaments_path + "/" + id.toString(),
    })
    .done(function(response) {
      module.active = response;
      if (response.status === 'open'){
        // module.renderOpenTournament(response);
        module.setup();
      } else {
        module.renderClosedTournament(response);
      }

    })
    .fail(function() {
      console.log("error");
    });
  };

  module.setup = function(){
    module.array = module.active.images;
    module.array = module.each_slice(module.array);
  };
  // declaring an array of images in the module.array variable. Then the second time around, we split the array into arrays of 2 objects within each array.
  //  i.e. arr = [1,2,3,4] --> [[1,2]], [[3,4]]

  module.renderOpenTournament = function(response){
    var activeObject = {question: response.question, leftImage: response.images[0], rightImage: response.images[1]}
    var template = Handlebars.compile($('#showOpenTournamentTemplate').html());
    $('#container').html(template({
      tournament: activeObject
    }));
  };

  module.renderClosedTournament = function(response){
    var template = Handlebars.compile($('#showClosedTournamentTemplate').html());
    $('#container').html(template({
      tournament: response
    }));
  };



  return module

})(tournaments || {});


$(document).ready(function(){

});
