let playerCharacters = [{ }, { }, { }, {}];

$(document).ready(function () {
  function startGame() {
    playerCharacters.forEach(function (player, index) {
      player.id = index + 1;
      player.health = 50;
      player.attack = Math.floor((Math.random() * 20) + 1);
      player.counterAttack = Math.floor((Math.random() * 20) + 1);
      $("#area1").append(
        $("<span class='playerChar'>")
          .text(player.id + " | ")
          .data("player", player)
      );
    });
    chooseCharacter();
  }

  function chooseCharacter() {
    $(".playerChar").on("click", function () {
      let player = $(this).data("player");
      let enemy;

      $(player).attr("type", "hero");
      // Clear area1 except for player
      $("#area1").text($(player).attr("id"));
      console.log(player);

      // If no player type is assigned, add attr "enemy"
      playerCharacters.forEach(function (player) {
        if (!player.type) {
          enemy = $(player).attr("type", "enemy");
          // Move enemies
          $("#area2").append($(enemy).attr("id"));
        }
      });
    });
    chooseEnemyToAttack();
  }

  function chooseEnemyToAttack() {
    // TODO:
  }

  startGame();
});
