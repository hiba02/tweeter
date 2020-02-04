$(document).ready(function() {
  // 'Arrow button' for tweet type
  $('#arrowButton').click(function() {
    $('.new-tweet').toggle();
    $('.new-tweet').css('marginTop','80px');
    window.scrollTo(0, 0);
    $('textarea').focus();
    $('textarea').val('');
    $('.counter').text(140);
    $('.counter').css({"color":"rgb(46, 48, 51)"});
  });

  // 'Write new Tweet' for tweet type
  $('.navWrite').click(function() {
    $('.new-tweet').toggle();
    $('.new-tweet').css('marginTop','80px');
    window.scrollTo(0, 0);
    $('textarea').focus();
    $('textarea').val('');
    $('.counter').text(140);
    $('.counter').css({"color":"rgb(46, 48, 51)"});
  });

  // 'ArrowButton' animation
  setInterval(function() {
    $("#arrowAnimation").toggleClass("arrowMove");
  },500);
  $('.arrow').css('cursor', 'pointer');
  $('.navWrite').css('cursor', 'pointer');
  // $('.icons').css('cursor', 'pointer');
});