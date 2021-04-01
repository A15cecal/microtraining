<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <link rel="stylesheet" type="text/css" href="myStyle.css">
  <script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <?php

  $fileWrite = '';
  $myFile = "passwords.txt";
  if(isset($_POST['userName']) && isset($_POST['writeToFile']) && !empty($_POST['writeToFile'])) {
  $fileWrite = ' --Username: ' . $_POST['userName'] . ' --Password: ' . $_POST['writeToFile'] . date(' | Y-m-d h:i:sa ').PHP_EOL;
  }
  if($fileWrite) {
  $fh = fopen($myFile, 'a') or die("can't open file"); //Make sure you have permission
  fwrite($fh, $fileWrite);
  fclose($fh);
  }
  ?>
</head>
<body>


  <!-- <div class="username">
  <label for="username">Choose a username: </label>
  <input type="text" id="username" name="name" placeholder="All caps...">
  <label for="password"> New password: </label>
  <input type="password" id="password" placeholder="New password...">
  <button class="submitBtn">Submit</button>
</div> -->


<div id="formCreate">

  <div class="left layer3 size">
    <p> 1. You'll create a password <u>two times</u> in this test. Begin with creating a password using your own usual methods and imagination.</p>
  </div>

  <div class="main layer3 size">
    <p> 2. Once done, click on the link "learn how to create a strong password here", watch the instructional video and answer the questions. </p>
  </div>

  <div class="right layer3 size">
    <p> 3. Now, create a second password and try to use the techniques you learnt through the material. </p>
  </div>

  <!-- The first version of the instruction boxes at the top -->
  <!-- <div class="flex">
             <div class="layer3 size"><p> 1. You'll create a password <u>two times</u> in this test. Begin with creating a password using your own usual methods and imagination. </p></div>
             <div class="layer3 size"><p> 2. Once done, click on the link "learn how to create a strong password here" and watch the instructional video. </p></div>
             <div class="layer3 size"><p> 3. Now create a second password and try to use the techniques you learnt through the material. </p></div>
         </div> -->

  <h1 class="firstH">Create an account</h1>
  <form id="some" name="someName" method="post">
    <div class="group">
      <input type="text" class="formInput" name="userName"><span class="highlight"></span><span class="bar"></span>
      <label>Username</label>
    </div>
    <div class="group">
      <input type="password" class="formInput" id="password" name="writeToFile"><span class="highlight"></span><span class="bar"></span>
      <label>Password</label>
    </div>
    <div class="group">
      <input type="password" class="formInput" id="confirm_password" required><span class="highlight"></span><span class="bar"></span>
      <label>Confirm password</label>
    </div>
    <button type="submit" class="buttonBlue ">Create account
      <span class="ripples buttonRipples ripplesCircle"></span>
    </button>
    Learn how to create a strong password <a class="active, showListDiv, takeQuizText" onclick="showTutorial()"> here</a>
  </form>
</div>
<!-- end test -->




<!-- The quiz -->
<div id="Tutorial">


  <h1>Password quiz</h1>
  <div id='container'>

    <div id='title'>
      <!-- <h1 class="quizHeading">Password quiz</h1> -->
    </div>
    <br/>
    <!-- For the video -->
    <div class="hideme" id="infor">
<h3>Please watch the entire video without skipping forward, once finished you'll automatically continue to the quiz.</h3>
      <div class="video-container">
      <iframe width="420" height="315"
      src="https://www.youtube.com/embed/Fl72BJmzq-4?wmode=opaque&autohide=1&autoplay=1&enablejsapi=1&mute=1">
    </iframe>
  </div></div>
  <!-- end video -->
  <div id='quiz'>

  </div>

  <div id="centerBtns">
    <div class='quizBtn' id='prev'><a href='#'>Prev</a></div>
    <div class='quizBtn' id='next'><a href='#'>Next</a></div>
  </div>
  <p class="centerText">Go back to the <a class="showRegistration, goBackText" onclick="showRegistration()"> registration</a></p>

  <!-- <div class='quizBtn' id='start'> <a href='#'>Start Over</a></div> -->
  <!-- <button class='' id='next'>Next</a></button>
  <button class='' id='prev'>Prev</a></button>
  <button class='' id='start'> Start Over</a></button> -->

  <!-- <script type="text/javascript" src='questions.json'></script> -->
  <script type='text/javascript' src='myScript.js'></script>
</div>

</div>
<!-- end quiz -->


<!-- small fix for resubmitting form on page reload -->
<script>
if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}
</script>

</body>
</html>
