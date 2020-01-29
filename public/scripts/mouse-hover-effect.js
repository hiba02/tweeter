$(document).ready(function() {
  $('.tweet-container')
  .mouseover(function(){
    $(this).removeClass('tweet-container')
    .addClass('tweet-container-shadow').find('h2').text('@Lazzeri');
  })
  .mouseout(function(){
    $(this).removeClass('tweet-container-shadow').addClass('tweet-container').find('h2').text('');
  })
});

