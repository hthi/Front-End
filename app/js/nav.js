var environment = (function(module){

  module.setUpNav = function(){
    module.findUser(module.showCorrectButtons)
  };

  module.showCorrectButtons = function(){
    $('#tournamentDropNav').click(function(){
      $('#tournamentDropNav').find('ul').toggle();
    });

    if (module.user){
      $('#tournamentDropNav').show();

      $('#signInNav').hide();
      $('#signInNav').unbind();

      $('#signUpNav').hide();
      $('#signUpNav').unbind();

      $('#signOutNav').show();
      $('#signOutNav').click(function(){
        users.sign_out();
      });

      $('#newTournamentNav').show();
      $('#newTournamentNav').click(function(){
        tournaments.renderStuff();
      });

      $('#tournamentOpenIndexNav').show();
      $('#tournamentOpenIndexNav').click(function(){
        tournaments.tournaments_page('open');
      });

      $('#tournamentClosedIndexNav').show();
      $('#tournamentClosedIndexNav').click(function(){
        tournaments.tournaments_page('closed');
      });


      $('#userNav').show();
      $('#userNav').click(function(){
        users.show_user_page();
      });

    } else {
      $('#tournamentDropNav').show();
      $('#signInNav').show();
      $('#signInNav').click(function(){
        users.renderSignIn();
      });

      $('#signUpNav').show();
      $('#signUpNav').click(function(){
        users.renderSignUp();
      });

      $('#signOutNav').hide();
      $('#signOutNav').unbind();

      $('#newTournamentNav').hide();
      $('#newTournamentNav').unbind();

      $('#tournamentOpenIndexNav').show();
      $('#tournamentOpenIndexNav').click(function(){
        tournaments.tournaments_page('open');
      });

      $('#tournamentClosedIndexNav').show();
      $('#tournamentClosedIndexNav').click(function(){
        tournaments.tournaments_page('closed');
      });

      $('#userNav').hide();
      $('#userNav').unbind();

    }
  };

  module.renderLandingPage = function(){
    $.ajax({
      url: tournaments.tournaments_path,
    })
    .done(function(response){
      tournaments.render(response, 'open', $('#openContainer'));
      tournaments.render(response, 'closed', $('#closedContainer'));
    }).fail();
  };

  module.emptyContainers = function(){
    $('#container').empty();
    $('#signContainer').empty();
    $('#openContainer').empty();
    $('#closedContainer').empty();
  };

  return module

})(users || {});

$(document).ready(function(){
  environment.setUpNav();
  environment.renderLandingPage();
});
