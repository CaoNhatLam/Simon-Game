var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;
var number=0;
function nextSequence() {
    //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);
    var random_number = Math.floor(Math.random() * 4);
    var random_Colours = buttonColours[random_number];
    gamePattern.push(random_Colours);
    $("#" + random_Colours).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    number=0;
}

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(color) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[number-1] === color) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (number === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        console.log("wrong");
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function ()
        {
           $("body").removeClass("game-over");
        },200);
        startOver();
    }

}
function startOver()
{
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    number++;
    animatePress(userChosenColor);
    checkAnswer(userChosenColor);

});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
};
