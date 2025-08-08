var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

$(document).on("keydown", nextSequence);

var started = false;
var level = 0;
function nextSequence(){
    if(started === false){
        check();
    }
}

function check(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
    started = true;
}


$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var chosenSound = new Audio("./sounds/"+name+".mp3");
    chosenSound.play();
}

function animatePress(currentColour){
       $("#"+currentColour).addClass("pressed");
       setTimeout(function(){
        document.querySelector("#"+currentColour).classList.remove("pressed");
       }, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(check, 1000);
        } 
    } else{
        startOver();
    } 
}

function startOver(){
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over")
    }, 200);
    level = 0
    started = false;
    gamePattern = [];
}