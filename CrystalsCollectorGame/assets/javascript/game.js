var randNumText = $("#random-number-text");
var winsText = $("#wins-text");
var lossText = $("#losses-text");
var resultsText = $("#results-text");
var scoreText = $("#your-score");

var targetNumber = 0;
var counter = 0;
var winCounter = 0;
var lossCounter = 0;

function reset() {
    //create a random number between 19 & 120 and display it
    targetNumber = (Math.floor(Math.random() * 102) + 19);
    randNumText.text(targetNumber);

    //reset the score text
    scoreText.text(0);

    //reset counter
    counter=0;

    //re-assign data values to the rocks
    //create a random crystal value between 1 and 12 and assign to each crystal

    $("#image1").attr("data-crystalvalue", (Math.floor(Math.random() * 12) + 1));
    $("#image2").attr("data-crystalvalue", (Math.floor(Math.random() * 12) + 1));
    $("#image3").attr("data-crystalvalue", (Math.floor(Math.random() * 12) + 1));
    $("#image4").attr("data-crystalvalue", (Math.floor(Math.random() * 12) + 1));
}

//-------------------------------------------------------------------------------------------------

reset();

//when a crystal is clicked, 
$(".crystal-image").on("click", function () {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
    counter += crystalValue;

    // All of the same game win-lose logic applies. So the rest remains unchanged.
    scoreText.text(counter);
    console.log(counter);

    if (counter === targetNumber) {
        winCounter++;
        winsText.text(winCounter);
        resultsText.text("You won!!");
        reset();
    }

    else if (counter >= targetNumber) {
        lossCounter++;
        lossText.text(lossCounter);
        resultsText.text("You lost!");
        reset();
    }

});