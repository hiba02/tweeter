$(document).ready(function() {
  // --- our code goes here ---
  
  $('.tweetStyleText textarea').keypress(function(event){
    let countChar = 140; 
    //console.log('countChar:  ', countChar);
    charNum = $(this).val().length + 1;
    // console.log('char:  ',charNum);
    countChar = countChar - charNum;
    if (countChar < 0) {
      $('.counter').css({"color":"red"});
    }
    $('.counter').text(countChar);
  });

  
});