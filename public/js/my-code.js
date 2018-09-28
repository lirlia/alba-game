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

  _touch = ('ontouchstart' in document) ? 'touchstart' : 'click';

  // 名前入力時に前回データ検索
  $("#player").on("change", function(event){ readDB(); });

  // 計算機
  $('#calc-plus').on(_touch, function() {
    if ($("#player").val() != "") {
      $(".point").text(parseInt($(".point").text()) + 1);
      updateDB()
    } else { window.alert("名前を入力してください"); };
  });

  $('#calc-minus').on(_touch, function() {
    if ($("#player").val() != "") {
      if (parseInt($(".point").text()) > 0 ){
        $(".point").text(parseInt($(".point").text()) - 1);
        updateDB()
      }
    } else { window.alert("名前を入力してください"); };
  });

  function readDB(){
    var name = $('#player').val()
    ref = database.ref('users/' + name);

    return ref.once('value').then(function(snapshot) {
      $(".point").text(snapshot.val() || "0");
    });
  }

  function updateDB(){
    var name = $('#player').val()
    ref = database.ref('users/' + name).set(parseInt($(".point").text()));
  }
});
