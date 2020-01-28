$(document).ready(function() {
  // --- our code goes here ---
  let countChar = 0; 
  $('.tweetStyleText textarea').keypress(function(event){
    countChar++;
    //console.log('countChar:  ', countChar);
    if (countChar > 140) {
      $('#characterCounter').css({"color":"red"});
    }
    $('#characterCounter').text(countChar);
  });
});