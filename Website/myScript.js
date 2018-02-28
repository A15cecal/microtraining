
function showTutorial() {
  var x = document.getElementById("Tutorial");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

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

// HUR FIXAR JAG DETTA MED TEXT ISTÄLLET FÖR SIFFROR??!!
// This is for the quiz
(function() {
  var questions = [{
    question: "What is 2+5?",
    choices: [2, 5, 7, 15, 20],
    correctAnswer: 7
  }, {
    question: "What is 3+6?",
    choices: [3, 6, 9, 12, 18],
    correctAnswer: 9
  }, {
    question: "What is 8-7?",
    choices: [72, 99, 1, 134, 156],
    correctAnswer: 1
  }, {
    question: "What is 1*7?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 7
  }, {
    question: "What is 8+8?",
    choices: [20, 30, 40, 16, 64],
    correctAnswer: 16
  }];

  var questionCounter = 0; //This is for keeping track of the question-number
  var selections = []; //Array containing the made choices
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
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.quizBtn').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.quizBtn').on('mouseleave', function () {
    $(this).removeClass('active');
  });

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
        $('#start').show();
      }
    });
  }

  // counts the score and returns it in a p-element
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
    questions.length + ' right!!!');
    return score;
  }
})();
// End quiz
