//current healthpoints and attackpoints of the attacker character
var healthPointsChar = 0;
var attackPointsChar = 0;
//current healthpoints and attackpoints of the defending enemy
var healthPointsDef = 0;
var counterAttackPointsDef = 0;
//number of enemies defeated
var score = 0;

//access the attack messages
var attackMessage1 = $(".attack-message1");
var attackMessage2 = $(".attack-message2");

//function to restart the game
function restart() {
    //reset all global variables
    healthPointsChar = 0;
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
    //unhide characters, remove bg-danger and bg-dark classes, add border-success class
    $(".character").show().removeClass("bg-danger").removeClass("bg-dark").addClass("border-success");
    //update the healthpoints of each character
    $(".character").each(function () {
        $(this).children(".card-footer").text($(this).attr("health-points"));
    });
    //prepend all characters to characters div in correct order
    $(".character[position='4']").prependTo($(".characters"));
    $(".character[position='3']").prependTo($(".characters"));
    $(".character[position='2']").prependTo($(".characters"));
    $(".character[position='1']").prependTo($(".characters"));
    //move all of the characters to the top
    $(".characters").appendTo(".spot1");
    //move your-char-text to after characters div
    $(".your-char-text").appendTo(".spot2");
    //unhide enemies div
    $(".enemies").show();
    //move enemies
    $(".enemies").appendTo(".spot3");
    //move enemies-text after enemies div
    $(".enemies-text").appendTo(".spot4");
    //hide restart button
    $(".restart-button").hide();
    //clear attack messages
    attackMessage1.text("");
    attackMessage2.text("");
};

$(".character, .bad-guy").on("click", function () {
    var theCharacter = $(this);
    if (theCharacter.hasClass("character")) {
        //move the character, move the enemies
        //make the rest of the characters enemies and red 
        //capture the character's health points and attack-power
        $(".your-char-text").appendTo(".spot1");
        $(".characters").appendTo(".spot2");
        $(".enemies-text").appendTo(".spot3");
        $(".enemies").appendTo(".spot4");
        var theCharacter = $(this);
        $(".card").appendTo($(".enemies")).addClass("bg-danger").addClass("bad-guy").removeClass("border-success").removeClass("character");
        theCharacter.appendTo($(".characters")).removeClass("bg-danger").removeClass("bad-guy").addClass("border-success").addClass("character");
        healthPointsChar = parseInt(theCharacter.attr("health-points"));
        attackPointsChar = parseInt(theCharacter.attr("attack-power"));
    }
    else if (theCharacter.hasClass("bad-guy")) {
        //move the enemy to the attack position only if there isn't already an enemy there
        //capture the character's health points and counter-attack-power
        //reset the attack message
        if (!($(".enemy").length)) {
            theCharacter.addClass("bg-dark").addClass("enemy").removeClass("bad-guy").removeClass("bg-danger").appendTo(".defender");
            healthPointsDef = parseInt(theCharacter.attr("health-points"));
            counterAttackPointsDef = parseInt(theCharacter.attr("counter-attack-power"));
            attackMessage1.text("");
        }
    }
});

$(".attack-button").on("click", function () {
    //if you haven't lost already
    if (score !== 100) {
        //check to make sure an enemy exists
        if ($(".enemy").length) {
            var enemy = $(".enemy");
            //recalculate the health-points, and update the card
            healthPointsChar = healthPointsChar - counterAttackPointsDef;
            $(".character > .card-footer").text(healthPointsChar);
            healthPointsDef = healthPointsDef - attackPointsChar;
            $(".enemy > .card-footer").text(healthPointsDef);
            if (healthPointsChar <= 0) {
                //else if the health-points of your character are less than or equal to zero, display you lose, restart button appears, set score to 100 so attack button stops working
                attackMessage1.text("You been defeated . . . GAME OVER!!!");
                attackMessage2.text("");
                $(".restart-button").show();
                score = 100;
            }
            else if ((healthPointsDef <= 0)) {
                //if the health-points of the enemy are less than or equal to zero, display message, hide the enemy
                attackMessage1.text("You have defeated " + $(".enemy > img").attr("alt") + ", you can choose to fight another enemy.");
                enemy.removeClass("enemy").addClass("character");
                attackMessage2.text("");
                enemy.hide();
                score++;
                if (score === 3) {
                    //if you defeat all of the enemies, restart button appears, display You Won!!!! GAME OVER!!!
                    attackMessage1.text("You Won!!!! GAME OVER!!!");
                    $(".restart-button").show();
                }
            }
            else {
                //otherwise update the attack messages and the attack points of the character
                attackMessage1.text("You attacked " + $(".enemy > img").attr("alt") + " for " + attackPointsChar + " damage.");
                attackMessage2.text($(".enemy > img").attr("alt") + " attacked you back for " + counterAttackPointsDef + " damage.");
                attackPointsChar += parseInt($(".character").attr("attack-power"));
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
