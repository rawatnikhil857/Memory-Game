const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var flag = 1;

$(document).keypress(function(){
    if(flag == 1)
    {
        flag = 0;
        setTimeout(nextSequence, 400);
    }
});

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
    var randomChosenColour = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
}

$(".btn").click(function(event){
    userChosenColor = event.target.id;
    animate(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
    {
        if(currentLevel == gamePattern.length - 1)
        {
            setTimeout(nextSequence, 1000);
        }
    }
    else 
    {
        wrong();
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    flag = 1;
}

//Showing animation and playing sound
function animate(Color){
    $("."+ Color).addClass("pressed");
    setTimeout(function(){
        $("."+ Color).removeClass("pressed");
    },40);
}
function playSound(colour){
    $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+colour+".mp3");
    audio.play();
}

function wrong(){
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("red");
    setTimeout(function(){
        $("body").removeClass("red");
    }, 200);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}