$(document).ready(function() {
  $('.tweet-container')
  .mouseover(function(){
    $(this).removeClass('tweet-container')
    .addClass('tweet-container-shadow');
  })
  .mouseout(function(){
    $(this).removeClass('tweet-container-shadow').addClass('tweet-container');
  })

});

