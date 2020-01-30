/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) {
// let $tweet = $('<article>').addClass('tweet');
// // ...
// return $tweet;

  let $tweet = `<article class="tweet-container">
  <div class="tweet-container-header">
    <div style="flex-grow: 1;">
        <img class="newton" src="${data.user.avatars}">
    </div>
    <div style="flex-grow: 1;">
        <h1>${data.user.name}</h1> 
    </div>
    <div style="flex-grow: 8;"></div>
    <div style="flex-grow: 1;">
        <h2></h2>
    </div>
  </div>
  <form method="POST" action="http://localhost:8080/tweets">
    <div class="tweetStyleText">
      <textarea rows="2" name="text" placeholder="Wow! What a tweeterific app!"></textarea>
    </div>
  <footer class="formButtonCounter">
    <span>10 days ago</span>
    <span class="counter">icons</span>
  </footer>
  </form>
</article>`

}


$(document).ready(function() {
  $('.tweet-container')
  .mouseover(function(){
    $(this).removeClass('tweet-container')
    .addClass('tweet-container-shadow').find('h2').text('@SirIsaac');
  })
  .mouseout(function(){
    $(this).removeClass('tweet-container-shadow').addClass('tweet-container').find('h2').text('');
  })
});

renderTweets(data);



// 1/29 8:20pm

const serverURL = 'http://localhost:8080';

const showComments = function(comments) {
    let $commentsContainer =
        $('.post-comments__comments-container');

    // Build out the new DOM
    for (comment of comments) {
        let $comment = $('<li>');
        let $user = $('<h4>');
        let $message = $('<p>');

        $user.text(`${comment.user} says:`);
        $message.text(comment.message);

        $comment
            .addClass('post-comments__comment')
            .append($user)
            .append($message);

        $commentsContainer.append($comment);
    }

    $commentsContainer.removeClass('hide');
    $('.post-comments__load').addClass('hide');
    $('.post-comments__success')
        .text('Comments have been loaded.');
};

const handleCommentLoadErrors = function(jqXHR, textStatus, errorThrown) {
    $('.post-comments__errors')
      .addClass('has-errors')
      .append('<span>Error: could not load comments</span>');

};

const $button = $('.post-comments__load-button');

$button.on('click', function() {
    $.ajax({
        method: 'GET',
        url: `${serverURL}/comments.json`
    })
    .done(showComments)
    .fail(handleCommentLoadErrors);
});

