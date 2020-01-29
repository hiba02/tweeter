$(document).ready(function() {
  // --- our code goes here ---
  let countChar = 0; 
  $('.tweetStyleText textarea').keypress(function(event){
    countChar++;
    //console.log('countChar:  ', countChar);
    if (countChar > 140) {
      $('.counter').css({"color":"red"});
    }
    $('.counter').text(countChar);
  });
});