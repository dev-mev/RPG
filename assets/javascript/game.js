let playerCharacters = [
  { image: "assets/images/dog1.png" },
  { image: "assets/images/dog2.png" },
  { image: "assets/images/dog3.png" },
  { image: "assets/images/cat1.png" },
  { image: "assets/images/cat2.png" },
  { image: "assets/images/cat3.png" }
];
let hero;
let enemyToAttack;

$(document).ready(function () {
  function updateStats() {
    $(".hero-card").children(".attack-text").remove();
    $(".hero-card")
      .append(
        $("<div>")
          .addClass("attack-text hero-attack-text")
          .text("-" + enemyToAttack.counterAttack)
      );

    $(".enemy-card").children(".attack-text").remove();
    $(".enemy-card")
      .append(
        $("<div>")
          .addClass("attack-text enemy-attack-text")
          .text("-" + hero.attack)
      );

    $(".card-body").empty();
    $(".hero-card-body")
      .append(
        $("<p>")
          .addClass("card-text")
          .text("Health: " + hero.health)
      );

    $(".enemy-card-body")
      .append(
        $("<p>")
          .addClass("card-text")
          .text("Health: " + enemyToAttack.health)
      );
  }

  function chooseEnemyToAttack() {
    $("#area2").empty();
    $("#area2").show();
    $("#area3").hide();
    // Move enemies
    if (playerCharacters.some(player => player.type === "enemy" && player.alive === true) === true) {
      playerCharacters.forEach(function (player) {
        if (player.type === "enemy" && player.alive === true) {
          $("#area2").append(
            $("<img>")
              .attr("src", player.image)
              .addClass("enemy")
              .attr("id", player.id)
              .text(player.id)
              .data("player", player)
          );
        }
      });
    } else {
      alert("You win! All enemies have been defeated!");
      startGame();
    }

    $(".enemy").on("click", function () {
      enemyToAttack = $(this).data("player");
      $("#area3").empty();
      $("#area3").show();
      $("#area2").hide();
      $("#area3").append(
        $("<span>")
          .addClass("card enemy-card")
          .append(
            $("<img>")
              .attr("src", enemyToAttack.image)
              .addClass("currentlyFighting img-thumbnail")
              .attr("id", enemyToAttack.id)
              .data("player", enemyToAttack)
          )
          .append(
            $("<span>")
              .addClass("card-body enemy-card-body")
          )
      );
      $(".attack-button").show();
      $(".attack-button")
        .on("click", function attack() {
          if (enemyToAttack.health > 0 && hero.health > 0) {
            enemyToAttack.health -= hero.attack;
            hero.health -= enemyToAttack.counterAttack;
            updateStats();

            if (enemyToAttack.health <= 0) {
              updateStats();
              alert("ENEMY DEFEATED");
              enemyToAttack.alive = false;
              hero.attack += 5;
              hero.health = 50;
              chooseEnemyToAttack();
            }

            if (hero.health <= 0) {
              updateStats();
              alert("You lost!");
              startGame();
            }
          }
        });
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
          .addClass("card hero-card")
          .append(
            $("<img>")
              .attr("src", hero.image)
              .attr("id", hero.id)
              .data("player", hero)
              .addClass("hero img-thumbnail")
          )
          .append(
            $("<span>")
              .addClass("card-body hero-card-body")
          )
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
    $(".attack-button").hide();

    playerCharacters.forEach(function (player, index) {
      player.id = index + 1;
      player.alive = true;
      player.type = "";
      player.health = 50;
      player.attack = Math.floor((Math.random() * 20) + 1);
      player.counterAttack = Math.floor((Math.random() * 20) + 1);
      $("#area1").append(
        $("<img>")
          .attr("src", player.image)
          .addClass("playerChar")
          .text(player.id + " | ")
          .data("player", player)
      );
    });
    chooseCharacter();
  }

  startGame();
});
