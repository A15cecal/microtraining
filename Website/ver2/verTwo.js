
/* show/hide for the quiz-div*/
function showTutorial() {
  // var x = document.getElementById("Tutorial");
  // if (x.style.display === "block") {
  //   x.style.display = "none";
  // } else {
  //   x.style.display = "block";
  // }
}
/* show/hide for the form-div*/
// function showRegistration() {
//   var x = document.getElementById("formCreate");
//   if (x.style.display === "block") {
//     x.style.display = "none";
//   } else {
//     x.style.display = "block";
//   }
// }
// $(document).ready(function() {
//   $(".goBackText").click(function() {
//     $("#Tutorial").hide(1000);
//   });
// });

/*for the video, shows the div for set amount of time*/
// jQuery("#infor").delay(60000).fadeOut("slow");
/*end video*/


/*For the animations of the user-form*/
$(window, document, undefined).ready(function() {

  $('input').blur(function() {
    var $this = $(this);
    if ($this.val())
    $this.addClass('used');
    else
    $this.removeClass('used');
  });

  var $ripples = $('.ripples');

  $ripples.on('click.Ripples', function(e) {

    var $this = $(this);
    var $offset = $this.parent().offset();
    var $circle = $this.find('.ripplesCircle');

    var x = e.pageX - $offset.left;
    var y = e.pageY - $offset.top;

    $circle.css({
      top: y + 'px',
      left: x + 'px'
    });

    $this.addClass('is-active');

  });

  $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
    $(this).removeClass('is-active');
  });

});
// This is for the quiz

var questions = [{
  question: "Welcome",
  choices: [],
  correctAnswer: 0,
  type: "welcome"
}, {
  question: "https://www.youtube.com/embed/Fl72BJmzq-4?wmode=opaque&autohide=1&autoplay=1&enablejsapi=1&mute=1",
  choices: [],
  correctAnswer: 0,
  type: "video"

}, {
  question: "Are special characters good to use in a password?",
  choices: ["Always", "Never"],
  correctAnswer: 0,
  type: "multiple"
}, {
  question: "How many characters should a password consist of?",
  choices: ["less than 3", 6, 8, 12, "Preferably more than 12"],
  correctAnswer: 4,
  type: "multiple"
}, {
  question: "Should you combine capital and lowercase letters?",
  choices: ["yes", "no"],
  correctAnswer: 0,
  type: "multiple"
}, {
  question: "Please suggest a possible password",
  choices: [],
  correctAnswer: 0,
  type: "passwordbox"
}, {
  question: "Which one is the strongest password?",
  choices: ["wqerty123", "BluBB", "Alex!993", "Hulrlr500!?", "IlikeBuTTerFlies"],
  correctAnswer: 3,
  type: "multiple"
}, {
  question: "Should a passwordy consist of a common word?",
  choices: ["Never", "Always"],
  correctAnswer: 0,
  type: "multiple"
}];

var questionCounter = 0; //This is for keeping track of the question-number
var selections = []; //Array containing the position of made choices
var quiz = $('#quiz'); //Quiz div
// $("#quiz").delay(60000).fadeIn(3000); // This will hide it for 57 sec, and fade the last part of the video

/*for saving the password*/
var passArray = [];
function savePass() {
  passArray.push(document.getElementById("passwordbox").value);
  console.log(passArray); //to confirm it has been added to the array
}


// Click handler for the 'next' button
$('#next').on('click', function (e) {
  e.preventDefault();
  // handeling the fade-animation
  if(quiz.is(':animated')) {
    return false;
  }
  // gets the input if not -1 or -2, which is true for video and passwordbox
  if((selections[questionCounter]!=-1) && (selections[questionCounter] !=-2)) choose();

  // Validation, prompts user to choose
  if ((selections[questionCounter] != -1) && (selections[questionCounter] != -2)) {
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }

  } else {
    if (selections[questionCounter] == -2) {
      selections[questionCounter]=document.getElementById("passwordbox").value;
      // alert('Empty textbox');
      // return false;
    }
    questionCounter++;
    displayNext();
  }
  console.log(selections);
});


// Click-handler for the 'prev' button
$('#prev').on('click', function (e) {
  e.preventDefault();

  if(quiz.is(':animated')) {
    return false;
  }
  choose();
  questionCounter--;
  displayNext();
});

// Click-handler for the 'Start Over' button
$('#start').on('click', function (e) {
  e.preventDefault();

  if(quiz.is(':animated')) {
    return false;
  }
  questionCounter = 0;
  selections = [];
  displayNext();
});


// This creates the div for the questions
function createQuestionElement(index) {
  var questionElement = $('<div>', {
    id: 'question'
  });
  // Creates the question-header
  // var header = $('<h2>Question ' + (index + 1) + ':</h2>');
  // questionElement.append(header);

  // Creates the question-text
  if(questions[index].type!=="video"){
    var question = $('<h3 id="questionText">').append(questions[index].question);
    questionElement.append(question);
  }

  if(questions[index].type=="multiple"){
    var radioButtons = createRadios(index);
    questionElement.append(radioButtons);
    // Uses a textbox instead of radio-buttons
  }else if(questions[index].type=="passwordbox"){
    var passwordbox=$('<div id="passdiv"><input type="password" id="passwordbox" onchange="savePass();" required></div>');
    questionElement.append(passwordbox);
    selections[index]=-2;
    // selections[questionCounter].getElementById("passwordbox").value;
  }else if(questions[index].type=="welcome"){
    var welcome=$('<div id="welcomePage"><p>Please start the quiz by pressing next</p><br></div>');
    questionElement.append(welcome);
    selections[index]=-1;
  }else if(questions[index].type=="video"){
    /*how do I remove the URL so that it doesn't show???*/
    var video=$('<iframe id="videoFrame" width="520" height="315" src="'+questions[index].question+'"></iframe>');
    questionElement.append(video);
    selections[index]=-1;
  }
  return questionElement;
}

// Creates a list of the choices as radio inputs
function createRadios(index) {
  var radioList = $('<ul>');
  var item;
  var input = '';
  for (var i = 0; i < questions[index].choices.length; i++) {
    item = $('<li>');
    input = '<input id="radioBtn" type="radio" name="answer" value=' + i + ' />';
    input += questions[index].choices[i];
    item.append(input);
    radioList.append(item);
  }
  return radioList;
}


function choose() {
  selections[questionCounter] = +$('input[name="answer"]:checked').val();
}

// Show next
function displayNext() {
  quiz.fadeOut(function() {
    $('#question').remove();

    if(questionCounter < questions.length){
      var nextQuestion = createQuestionElement(questionCounter);
      quiz.append(nextQuestion).fadeIn();
      if (!(isNaN(selections[questionCounter]))) {
        $('input[value='+selections[questionCounter]+']').prop('checked', true);
      }

      // Controls 'prev' button
      if(questionCounter === 1){
        $('#prev').show();
      } else if(questionCounter === 0){

        $('#prev').hide();
        $('#next').show();
      }
    }else {
      var scoreElem = displayScore();
      quiz.append(scoreElem).fadeIn();
      $('#next').hide();
      $('#prev').hide();
    }
  });
}

// counts the score and returns it in a p-element
function displayScore() {
  var score = $('<p>',{id: 'question'});

  var numCorrect = 0;
  for (var i = 0; i < selections.length; i++) {
    //  alert(questions[i].correctAnswer); /*DENNA FUNKAR, GER VILKEN POSITION SOM ÄR RÄTT SVAR*/
    // alert(questions[i].choices[selections[i]]);
    if (selections[i] == questions[i].correctAnswer) {
      numCorrect++;
    }
  }

  score.append('You got ' + numCorrect + ' questions out of ' +
  questions.length + ' right!!!');
  return score;
}

// displays the first question
displayNext();
// End quiz
/*For the confirm password*/
var password = document.getElementById("password"), confirm_password = document.getElementById("confirm_password");

function validatePassword() {
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

function getPassword() {
  var SavePass = document.getElementById();
}
// password.onchange = validatePassword;
// confirm_password.onkeyup = validatePassword;
/*End confirm password*/

//
// $(document).ready(function() {
// 	$(".takeQuizText").click(function() {
// 		alert("TakeQuiz");
// 		$("#Tutorial").show(1000);
//   });
// });
