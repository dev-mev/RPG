let playerCharacters = [{ }, { }, { }, { }];
let hero;

$(document).ready(function () {

  function chooseEnemyToAttack() {
    $(".enemy").on("click", function () {
      console.log(playerCharacters)
      let enemyToAttack = $(this).data("enemy");
      $("#area3").append(
        $("<span>")
          .addClass("currentlyFighting")
          .attr("id", enemyToAttack.id)
          .text(enemyToAttack.id)
          .data("enemy", enemyToAttack)
      ).append(
        $("<button>")
          .text("ATTACK")
          .attr("type", "button")
          .attr("id", "attackButton")
          .addClass("btn btn-primary")
          .on("click", function attack() {
            if (enemyToAttack.health > 0 && hero.health > 0) {
              enemyToAttack.health -= hero.attack;
              hero.health -= enemyToAttack.counterAttack;
              console.log(enemyToAttack.health);
              console.log(hero.health);
              
              if (enemyToAttack.health <= 0) {
                alert("ENEMY DEFEATED")
              }
              
              if (hero.health <= 0) {
                alert("You DIED!")
              }
            }
          })
      );
    });
  }

  function chooseCharacter() {
    $(".playerChar").on("click", function () {
      hero = $(this).data("player");

      hero.type = "hero";
      // Clear area1 except for player
      $("#area1").empty();
      $("#area1").append(
        $("<span>")
          .attr("id", hero.id)
          .text(hero.id)
          .data("player", hero)
      );

      // If no player type is assigned, add attr "enemy"
      playerCharacters.forEach(function (player) {
        if (!player.type) {
          player.type = "enemy";
        }

        // Move enemies
        if (player.type === "enemy") {
          $("#area2").append(
            $("<span>")
              .addClass("enemy")
              .attr("id", player.id)
              .text(player.id)
              .data("enemy", player)
          );
        }
      });
      chooseEnemyToAttack();
    });
  }

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

  startGame();
});
