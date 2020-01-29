/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {
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
  let $tweet = `
  <article class="tweet-container">
    <div class="tweet-container-header">
      <div style="flex-grow: 1;">
          <img class="newton" src="${tweetData.user.avatars}">
      </div>
      <div style="flex-grow: 1;">
          <h1>${tweetData.user.name}</h1> 
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
    </article>`;

  return $tweet;
}


$tweet = createTweetElement(tweetData);
$('#tweets-container').append($tweet);


  $('.tweet-container')
  .mouseover(function(){
    $(this).removeClass('tweet-container')
    .addClass('tweet-container-shadow').find('h2').text('@SirIsaac').css({'color':'powerblue'});
  })
  .mouseout(function(){
    $(this).removeClass('tweet-container-shadow').addClass('tweet-container').find('h2').text('');
  })


});

//renderTweets(data);



