$(function(){
  //
  // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    authDomain: "alba-game.firebaseapp.com",
    databaseURL: "https://alba-game.firebaseio.com",
    projectId: "alba-game"
  };

  firebase.initializeApp(config);
  database = firebase.database();

  getUserData()

  function getUserData(){
    ref = database.ref('users');

    ref.on('value', function(snapshot) {
      $(".user").remove();
      var list = snapshot.val();

      //https://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
      var sortable = [];
      for (var user in list) {
          sortable.push([user, list[user]]);
      }

      sortable.sort(function(a, b) {
          return (a[1] < b[1] ? 1 : -1);
      });

      sortable.forEach(function(ele) {
        $(".rank").append("<p class='user'><span style='text-align:left; width:40%  ;display: inline-block;'>" + ele[0] + "</span><span style='width:20%;text-align:right;'>"+ele[1]+" ポイント</span></p>");
      });

      console.log(sortable);
    });
  };
});
