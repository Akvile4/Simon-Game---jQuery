var gamePattern = [];

var userClickedPattern = [];

var buttonColours = [
    "red",
    "blue",
    "green",
    "yellow"
];

var level = 0;

var started = false;

// if the keyboard has been clicked and when it happens for the first time call the function
$("body").keypress( function() {
    if(!started) {
        $("h1").text("Level " + level);

        nextSequence();

        started = true;
    }
    
});

// targetting button class (don't forget . infront)
$(".btn").click (function() {

    // this targets what was clicked, attr - targets attributes in this case ID
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    // passing the last index of the user sequence
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        // checking if the arrays match
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout( function() {
                nextSequence()
            }, 1000);
        }
    }
    else {

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout( function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

};

function nextSequence() {

    // once function is triggered we want to emty the array
    userClickedPattern = [];

    // increase by 1 level every time this function is called
    level++;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout( function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
};  

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
