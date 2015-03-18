var users = (function(module){

  module.setUpNav = function(){
    module.findUser(module.showCorrectButtons)
  };

  module.showCorrectButtons = function(){
    if (module.user){
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

      $('#tournamentIndexNav').show();
      $('#tournamentIndexNav').click(function(){
        tournaments.all_tournaments_page();
      });


      $('#userNav').show();
      $('#userNav').click(function(){
        users.show_user_page();
      });

    } else {
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

      $('#tournamentIndexNav').show();
      $('#tournamentIndexNav').click(function(){
        tournaments.all_tournaments_page();
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
