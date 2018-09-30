var healthPointsChar = 0;
var originalAttackPointsChar = 0;
var attackPointsChar = 0;
var healthPointsDef = 0;
var counterAttackPointsDef = 0;
var score = 0;

//function to restart the game
function restart() {
    //reset all global variables
    healthPointsChar = 0;
    originalAttackPointsChar = 0;
    attackPointsChar = 0;
    healthPointsDef = 0;
    counterAttackPointsDef = 0;
    score = 0;
    //if there is an enemy, change it to a character
    if ($(".enemy").length) {
        $(".enemy").removeClass("enemy").addClass("character");
    }
    //if there are bad guys, change them to characters
    if ($(".bad-guy").length) {
        $(".bad-guy").removeClass("enemy").addClass("character");
    }
    //unhide characters, remove enemy, and bad-guy classes, remove bg-danger and bg-dark classes, add border-success class
    $(".character").show().removeClass("bg-danger").removeClass("bg-dark").addClass("border-success");
    //append all characters to characters div
    $(".character").prependTo($(".characters"));
    //move your-char-text to after characters div
    $(".your-char-text").before($(".characters"));
    //unhide enemies div
    $(".enemies").show();
    //move enemies-text after enemies div
    $(".enemies-text").before($(".enemies"));
    //hide restart button
    $(".restart-button").hide();
    //hide messages
    $(".attack-message1").text("");
};

$(".character, .bad-guy").on("click", function () {
    var yourCharacter = $(this);
    if (yourCharacter.hasClass("character")) {
        //remove the character, make the rest of the characters enemies and red, move the character, move the enemies
        //capture the character's health points and attach-power
        yourCharacter.remove();
        $(".card").appendTo($(".enemies")).addClass("bg-danger").addClass("bad-guy").removeClass("border-success").removeClass("character");
        yourCharacter.appendTo($(".characters"));
        $(".characters").before($(".your-char-text")).after($(".enemies-text"));
        healthPointsChar = parseInt(yourCharacter.attr("health-points"));
        attackPointsChar = parseInt(yourCharacter.attr("attack-power"));
        originalAttackPointsChar = attackPointsChar;
    }
    else if ((yourCharacter.hasClass("bad-guy")) && !($(".enemy").length)) {
        //move the enemy to the attack position only if there isn't already an enemy there
        //capture the character's health points and counter-attack-power
        //reset the attack message
        yourCharacter.addClass("bg-dark").addClass("enemy").removeClass("bad-guy").removeClass("bg-danger").appendTo(".defender");
        healthPointsDef = parseInt(yourCharacter.attr("health-points"));
        counterAttackPointsDef = parseInt(yourCharacter.attr("counter-attack-power"));
        $(".attack-message1").text("");
        if (score === 2) {
            $(".enemies").hide();
        }
    }
});

$(".attack-button").on("click", function () {
    //if you haven't lost already
    if (score !== 100) {
        var attackMessage1 = $(".attack-message1");
        var attackMessage2 = $(".attack-message2");
        //check to make sure an enemy exists
        if ($(".enemy").length) {
            var enemy = $(".enemy");
            //recalculate the health-points, and update the card
            healthPointsChar = healthPointsChar - counterAttackPointsDef;
            $(".character > .card-footer").text(healthPointsChar);
            healthPointsDef = healthPointsDef - attackPointsChar;
            $(".enemy > .card-footer").text(healthPointsDef);
            if (healthPointsDef <= 0) {
                //if the health-points of the enemy are less than or equal to zero, display message, hide the enemy
                attackMessage1.text("You have defeated " + $(".enemy > img").attr("alt") + ", you can choose to fight another enemy.");
                attackMessage2.hide();
                $(".enemy > .card-footer").text(enemy.attr("health-points"));
                enemy.attr("current-health-points", enemy.attr("health-points")).removeClass("enemy").addClass("character").hide();
                score++;
                if (score === 3) {
                    //if you defeat all of the enemies, restart button appears, display You Won!!!! GAME OVER!!!
                    attackMessage1.text("You Won!!!! GAME OVER!!!");
                    $(".character > .card-footer").text($(".character").attr("health-points"));
                    $(".restart-button").show();
                }
            }
            else if (healthPointsChar <= 0) {
                //else if the health-points of your character are less than or equal to zero, display you lose, restart button appears, set score to 100 so attack button stops working
                attackMessage1.text("You been defeated . . . GAME OVER!!!");
                attackMessage2.hide();
                enemy.attr("current-health-points", enemy.attr("health-points"));
                $(".enemy > .card-footer").text(enemy.attr("health-points"));
                $(".character").attr("current-health-points", $(".character").attr("health-points"));
                $(".character > .card-footer").text($(".character").attr("health-points"));
                $(".restart-button").show();
                score = 100;
            }
            else {
                //otherwise update the attack messages and the attack points of the character
                attackMessage2.removeAttr("style");
                attackMessage1.text("You attacked " + $(".enemy > img").attr("alt") + " for " + attackPointsChar + " damage.");
                attackMessage2.text($(".enemy > img").attr("alt") + " attacked you back for " + counterAttackPointsDef + " damage.");
                attackPointsChar += originalAttackPointsChar;
            }
        }
        else if (score !== 3) {
            //attack is pressed and no enemy is there and you haven't won yet
            attackMessage1.text("No enemy here.");
        }
    }
});

$(".restart-button").on("click", function () {
    //if restart button is pressed, restart the game.
    restart();
});


//fix:
//put the characters in order
//get their assigned health-points back at restart - when you defeat all 3, their points are updated to 
//check that when you defeat an enemy, you also haven't been defeated