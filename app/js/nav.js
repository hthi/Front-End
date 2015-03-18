var users = (function(module){

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
        window.location.href = '/sign_in.html'
      });

      $('#signUpNav').show();
      $('#signUpNav').click(function(){
        window.location.href = '/sign_up.html'
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

  return module

})(users || {});

$(document).ready(function(){
  users.setUpNav();
});
