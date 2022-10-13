var time = 60; //define the time
var id; // hold id
var questions, qloop; // hold questions and loop

//Get the ids of elemts
var qcontain = document.getElementById("question-container");
var startcontain = document.getElementById("start-container");
var qhold = document.getElementById("question");


function run() { // Start the function
var starthold = document.getElementById("start-btn");
var nxt = document.getElementById("next-btn");

    var iscorrect = document.getElementById("check-answer");

    starthold.addEventListener("click", start);
    nxt.addEventListener("click", () => {
        qloop++;
        next();
    });

    function timeTick() { // Decrease time
        time--;
        timehold.textContent = "Time: " + time;
        if (time <= 0) {
            saveScore(); // if time runs out save the save
        }
    }

    function start() { // start the clock
        id = setInterval(timeTick, 1000);
        startcontain.classList.add("hide");
        questions = questions.sort(() => Math.random() - 0.5);
        qloop = 0;
        qcontain.classList.remove("hide");
        timeTick();
        next();
    }
    var highscore = document.getElementById("highscores-link");

    function next() { // next question 
        resetState();
        show(questions[qloop]);
    }

    function show(question) { // display the question
        qhold.innerText = question.question;
        question.answers.forEach((answer) => {
            var button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("btn");
            if (answer.correct) {
                button.dataset.correct = answer.correct; // check if answer is correct
            }
            button.addEventListener("click", selectAnswer);
            answerbtn.appendChild(button); // load button
        });
    }

    function resetState() { // reset
        nxt.classList.add("hide");
        iscorrect.classList.add("hide");
        while (answerbtn.firstChild) {
            answerbtn.removeChild(answerbtn.firstChild);
        }
    }

    function selectAnswer(e) {
        var selectedButton = e.target;
        var correct = selectedButton.dataset.correct;
        iscorrect.classList.remove("hide");
        if (correct) { // check if correct
            iscorrect.innerHTML = "You got it right!";
        } else {
            iscorrect.innerHTML = "Sorry that was not the correct answer.";
            if (time <= 10) {
                time = 0;
            } else {
                time -= 10; // subtract time if wrong
            }
        }
        Array.from(answerbtn.children).forEach((button) => {
            setStatusClass(button, button.dataset.correct);
        });
        if (questions.length > qloop + 1) { 
            nxt.classList.remove("hide");
            iscorrect.classList.remove("hide");
        } else {
            starthold.classList.remove("hide");
            saveScore();
        }
    }
    var answerbtn = document.getElementById("answer-buttons");

    function clearStatusClass(element) {
        element.classList.remove("correct");
        element.classList.remove("wrong");
    }

    function setStatusClass(element, correct) { // set wrong/right
        clearStatusClass(element);
        if (correct) {
            element.classList.add("correct");
        } else {
            element.classList.add("wrong");
        }
    }
    var submit = document.getElementById("submit-btn");

    function saveScore() { // Display final score
        clearInterval(id);
        timehold.textContent = "Time: " + time;
        setTimeout(function() {
            qcontain.classList.add("hide");
            document.getElementById("score-container").classList.remove("hide");
            document.getElementById("your-score").textContent =
                "Your score is " + time;
        }, 2000);
    }
    var restartgame = document.getElementById("restart-btn");
    var scores = document.getElementById("player-score");
    var loadScores = function() { // load scores from local storage
        if (!savedScores) {
            return false;
        }
        savedScores = JSON.parse(savedScores);
        var initials = document.querySelector("#initials-field").value;
        var newScore = {
            score: time,
            initials: initials,
        };
        savedScores.push(newScore);
        console.log(savedScores);
        savedScores.forEach((score) => {
            namefield.innerText = score.initials;
            scores.innerText = score.score;
        });
    };
    var localstoragescore = JSON.parse(localStorage.getItem("scores")) || [];

    function showHighScores(initials) { // show highscores froms
        document.getElementById("highscores").classList.remove("hide");
        document.getElementById("score-container").classList.add("hide");
        startcontain.classList.add("hide");
        qcontain.classList.add("hide");
        if (typeof initials == "string") {
            var score = {
                initials,
                timeLeft: time,
            };
            localstoragescore.push(score);
        }
        var highScoreEl = document.getElementById("highscore");
        highScoreEl.innerHTML = "";
        for (i = 0; i < localstoragescore.length; i++) { // loop through scores
            var div1 = document.createElement("div");
            div1.setAttribute("class", "name-div");
            div1.innerText = localstoragescore[i].initials;
            var div2 = document.createElement("div");
            div2.setAttribute("class", "score-div");
            div2.innerText = localstoragescore[i].timeLeft;
            highScoreEl.appendChild(div1);
            highScoreEl.appendChild(div2);
        }
        localStorage.setItem("scores", JSON.stringify(localstoragescore)); // set to local storage
    }
    highscore.addEventListener("click", showHighScores); 
    submit.addEventListener("click", function(event) {
        event.preventDefault();
        var initials = document.querySelector("#initials-field").value;
        showHighScores(initials); // showhighscores
    });
    restartgame.addEventListener("click", function() { // restart game on click
        window.location.reload();
    });
    clear.addEventListener("click", function() {
        localStorage.clear();
        document.getElementById("highscore").innerHTML = "";
    });
}

var clear = document.getElementById("clear-btn");
var namefield = document.getElementById("player-name");
var timehold = document.getElementById("timer");

run()