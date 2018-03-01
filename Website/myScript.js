
function showTutorial() {
  var x = document.getElementById("Tutorial");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

$(document).ready(function(){
    $(".takeQuizText").click(function(){
        $("#formCreate").hide(1000);
    });
});

/*For the animations and siplay of the user-form*/
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
/*end animations user-form*/

//  MAKE REAL QUESTIONS LATER
// This is for the quiz
(function() {
  var questions = [{
    question: "Are special characters good to use in a password?",
    choices: ["Always", "Never"],
    correctAnswer: 0
  }, {
    question: "How many characters should a password consist of?",
    choices: ["less than 3", 6, 8, 12, "Preferably more than 12"],
    correctAnswer: 4
  }, {
    question: "Should you combine capital and lowercase letters?",
    choices: ["yes", "no"],
    correctAnswer: 0
  }, {
    question: "Which one is the strongest password?",
    choices: ["wqerty123", "BluBB", "Alex!993", "Hulrlr500!?", "IlikeBuTTerFlies"],
    correctAnswer: 3
  }, {
    question: "Should a passwordy consist of a common word?",
    choices: ["Never", "Always"/*, 40, 16, 64*/],
    correctAnswer: 0
  }];

  var questionCounter = 0; //This is for keeping track of the question-number
  var selections = []; //Array containing the position of made choices
  var quiz = $('#quiz'); //Quiz div

  // Display question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // handeling the fade-animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // Validation, prompts user to choose
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
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

  // Animates buttons on hover
  /*im using hover in the css instead...*/
  // $('.quizBtn').on('mouseenter', function () {
  //   $(this).addClass('active');
  // });
  // $('.quizBtn').on('mouseleave', function () {
  //   $(this).removeClass('active');
  // });

  // This creates the div for the questions
  function createQuestionElement(index) {
    var questionElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    questionElement.append(header);

    var question = $('<p>').append(questions[index].question);
    questionElement.append(question);

    var radioButtons = createRadios(index);
    questionElement.append(radioButtons);

    return questionElement;
  }

  // Creates a list of the choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  // handles the selected one and puts it in the array
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
    alert(questions[i].choices[selections[i]]);
      if (selections[i] == questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
    questions.length + ' right!!!');
    return score;
  }

})();
// End quiz
