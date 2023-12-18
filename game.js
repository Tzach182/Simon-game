//global variables
//-----------------------------------------------------------------------------
var gamePattern = [];
var userClickedPattern = [];
const buttonColors = ["red","blue","green","yellow"];
var level = 0; 
var gameStarted = false;
var highScore = 0;
//-----------------------------------------------------------------------------  


//events
//------------------------------------------------------------------ 

/**
 * handles button click by adding button color to list, aninmating click and checking answer
 */
$(".btn").on("click", function(event) {

    var userChosenColor = event.target.id;

    userClickedPattern.push(userChosenColor);
    makeSound(userChosenColor);
    animatePress(userChosenColor, false);
    checkAnswer(userClickedPattern.length - 1);
    
});

/**
 * handles button press for starting game
 */
$(document).on("keydown",function() {
    
    if(gameStarted == false) {
        gameStarted = true;
        nextSequence();
    }
})
//-------------------------------------------------------------------------------

//functions
//-------------------------------------------------------------------------------

/**
 * function to add random color to sequence
 */
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level );

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    animatePress(randomChosenColor, true);
        
}

/**
 * animating button press by computer or user
 * @param {string} currentColor color of button to be pressed
 * @param {boolean} isComputer who's turn it is true if computer, false if user  
 */
function animatePress(currentColor, isComputer) {
    
    if(isComputer) {
        makeSound(currentColor);
        $("#" + currentColor).fadeOut(100).fadeIn(100);
    }
    else{

        $("#"+currentColor).addClass("pressed");
        setTimeout(function() {
            $("#"+currentColor).removeClass("pressed");
        },100);
    }
}

/**
 * checks if user's current choice is correct
 * @param {int} currentLevel the location in the sequence arrays that should be checked
 */
function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
        if(userClickedPattern.length === gamePattern.length) {
            checkHighScore();
            setTimeout(function() {
            nextSequence();
            }, 1000);
        }
    }
    else {
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").html("Game Over, Press A Key to Restart");
        startOver();
    }
}

/**
 * reinitialises the starting paramaters  
 */
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

/**
 * creates sound according to color given
 * @param {string} color color of button to be played
 */
function makeSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

/**
 * checks high score and updates accordingly
 */
function checkHighScore() {
    if(level > highScore) {
        highScore = level;
        $("#high-score").html("High Score: " + highScore);
    }
}

//----------------------------------------------------------------









