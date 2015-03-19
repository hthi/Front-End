/*global $:false */
'use strict';

var tournaments = (function(module){

  module.each_slice = function(arr){
    return _.chain(arr).groupBy(function(element,index){
      return Math.floor(index/2);
    }).toArray()._wrapped;
  };

  module.showTournament = function(id){
    environment.emptyContainers();
    module.getTournament(id);
    };

  module.getTournament = function(id){
    $.ajax({
      url: module.tournaments_path + "/" + id.toString(),
    })
    .done(function(response) {
      module.active = response;
      if (response.status === 'open'){
        module.setup();
        module.runTournament();
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
  };
  // declaring an array of images in the module.array variable. Then the second time around, we split the array into arrays of 2 objects within each array.
  //  i.e. arr = [1,2,3,4] --> [[1,2]], [[3,4]]

  module.runTournament = function(){
    module.count = 0;
    module.array = _.flatten(module.array);
    module.array = _.shuffle(module.array);

    if(module.array.length === 1){
      module.updateWinner(module.renderWinner);
    }
    else{
      module.array = module.each_slice(module.array);
      module.renderOpenTournament();
    }
  };

  module.renderOpenTournament = function(){
    if(module.count === module.array.length || module.array[module.count].length < 2){
      module.runTournament();

    }
    else{
      module.renderPairing();
    }
  };

  module.renderPairing = function(){
    var activeObject = {question: module.active.question, leftImage: module.array[module.count][0], rightImage: module.array[module.count][1]};
    var template = Handlebars.compile($('#showOpenTournamentTemplate').html());
    $('#container').html(template({
      tournament: activeObject
    }));
    $('#leftImage').click(function(){
      module.array[module.count].pop();
      module.count += 1;
      module.renderOpenTournament();
    });
    $('#rightImage').click(function(){
      module.array[module.count].shift();
      module.count += 1;
      module.renderOpenTournament();
    });
    $('.leftFlag').click(function(event){
      event.preventDefault();
      images.flagImage(this.id)
      module.array[module.count].shift();
      module.count += 1;
      module.renderOpenTournament();
    });
    $('.rightFlag').click(function(event){
      event.preventDefault();
      images.flagImage(this.id);
      module.array[module.count].pop();
      module.count += 1;
      module.renderOpenTournament();
    });
  };

  module.renderWinner = function(){
    environment.emptyContainers();
    module.active.winner = module.array[0];
    module.active.current = users.user;
    if(users.user && users.user.id === module.active.user_id){
      var template = Handlebars.compile($('#showWinnerTournamentTemplate').html());
      $('#openContainer').html(template({
        tournament: module.active
      }));
      var template2 = Handlebars.compile($('#showWinnerCommentsTemplate').html());
      $('#closedContainer').html(template2({
        tournament: module.active
      }));
      $('#commentSubmit').click(function(e){
        e.preventDefault();
        comments.createComment(module.active);
      });
      $('.subcomment').click(function(){
        comments.addSubcomment(this);
      });
    } else {
      var template = Handlebars.compile($('#showVisitorWinnerTournamentTemplate').html());
      $('#openContainer').html(template({
        tournament: module.active
      }));
      var template2 = Handlebars.compile($('#showVisitorWinnerCommentsTemplate').html());
      $('#closedContainer').html(template2({
        tournament: module.active
      }));
      $('#commentSubmit').click(function(e){
        e.preventDefault();
        comments.createComment(module.active);
      });
      $('.subcomment').click(function(){
        comments.addSubcomment(this);
      });
    }


  };

  module.updateWinner = function(callback){
    $.ajax({
      url: images.images_path + "/" + module.array[0].id + "/win",
      type: 'POST'
    })
    .done(function(data) {
      if(callback){
        callback();
      }
    })
    .fail(function() {
      console.log("error");
    });

  };

  module.renderClosedTournament = function(response){
    response.current = users.user;
    if (users.user && users.user.id === module.active.user_id){
      var template = Handlebars.compile($('#showClosedTournamentTemplate').html());
      $('#openContainer').html(template({
        tournament: response
      }));
      var template2 = Handlebars.compile($('#showClosedCommentsTemplate').html());
      $('#closedContainer').html(template2({
        tournament: response
      }));
      $('.subcomment').click(function(){
        comments.addSubcomment(this);
      });
    } else {
      var template = Handlebars.compile($('#showVisitorClosedTournamentTemplate').html());
      $('#openContainer').html(template({
        tournament: response
      }));
      var template2 = Handlebars.compile($('#showVisitorClosedCommentsTemplate').html());
      $('#closedContainer').html(template2({
        tournament: response
      }));
    }

    $('#commentSubmit').click(function(e){
      e.preventDefault();
      comments.createComment(response);
    });

  };



  return module

})(tournaments || {});


$(document).ready(function(){

});
