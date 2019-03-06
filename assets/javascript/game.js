let playerCharacters = [{ }, { }, { }, { }];
let hero;

$(document).ready(function () {
  function chooseEnemyToAttack() {
    $("#area2").empty();
    // Move enemies
    playerCharacters.forEach(function (player) {
      if (player.type === "enemy" && player.alive === true) {
        $("#area2").append(
          $("<span>")
            .addClass("enemy")
            .attr("id", player.id)
            .text(player.id)
            .data("player", player)
        );
      }
    });

    $(".enemy").on("click", function () {
      let enemyToAttack = $(this).data("player");
      $("#area3").empty();
      $("#area3").append(
        $("<span>")
          .addClass("currentlyFighting")
          .attr("id", enemyToAttack.id)
          .text(enemyToAttack.id)
          .data("player", enemyToAttack)
      ).append(
        $("<button>")
          .text("ATTACK")
          .attr("type", "button")
          .addClass("btn btn-primary")
          .on("click", function attack() {
            if (enemyToAttack.health > 0 && hero.health > 0) {
              enemyToAttack.health -= hero.attack;
              hero.health -= enemyToAttack.counterAttack;
              console.log(enemyToAttack.health);
              console.log(hero.health);
              
              if (enemyToAttack.health <= 0) {
                alert("ENEMY DEFEATED");
                enemyToAttack.alive = false;
                hero.attack += 5;
                hero.health = 50;
                chooseEnemyToAttack();
              }
              
              if (hero.health <= 0) {
                alert("You DIED!");
                startGame();
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

      // If no player type is assigned, add type "enemy"
      playerCharacters.forEach(function (player) {
        if (player.type !== "hero") {
          player.type = "enemy";
        }
      });
      chooseEnemyToAttack();
    });
  }

  function startGame() {
    $("#area1").empty();
    $("#area2").empty();
    $("#area3").empty();

    playerCharacters.forEach(function (player, index) {
      player.id = index + 1;
      player.alive = true;
      player.type = "";
      player.health = 50;
      player.attack = Math.floor((Math.random() * 20) + 1);
      player.counterAttack = Math.floor((Math.random() * 20) + 1);
      $("#area1").append(
        $("<span class='playerChar'>")
          .text(player.id + " | ")
          .data("player", player)
      );
    });
    console.log(playerCharacters)
    chooseCharacter();
  }

  startGame();
});
