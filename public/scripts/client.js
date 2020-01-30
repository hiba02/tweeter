/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


////////////////////////////////////////////////////////////////////////
//Remove the hard-coded tweets object that we added earlier in order to drive our renderTweets function.
////////////////////////////////////////////////////////////////////////




$(document).ready(function() {


  $('#tweetForm').submit(function(event) {
    
    event.preventDefault();
    
    $.ajax('http://localhost:8080/tweets',{
        method: 'POST',
        data: $(this).serialize(),
        success: function(data){
          console.log('data inside ajax', data);
        }
    })
    .then(function(data){
      console.log('data', data);
      loadTweets();
    })
  });





const createTweetElement = function(tweet) {

    let $tweet = `<article class="tweet-container">
    <div class="tweet-container-header">
      <div style="flex-grow: 1;">
          <img class="newton" src="${tweet.user.avatars}">
      </div>
      <div style="flex-grow: 1;">
          <h1>${tweet.user.name}</h1> 
      </div>
      <div style="flex-grow: 8;"></div>
      <div style="flex-grow: 1;">
          <h2>${tweet.user.handle}</h2>
      </div>
    </div>
    <div class="tweet-container-content">
    ${tweet.content.text}
    </div>
    <footer class="formButtonCounter">
      <span>${tweet.created_at}</span>
      <span class="counter">icons</span>
    </footer>
  </article>`
  return $tweet;
};



  const renderTweets = function(tweetsArray) {
    console.log(tweetsArray);
    $tweet = '';
    for (let eachTweet of tweetsArray) {
      // console.log('eachTweet.user.name:  ', eachTweet.user.name);
      // console.log('eachTweet.user.avatars:  ', eachTweet.user.avatars);      
      // console.log('eachTweet.user.handle:  ', eachTweet.user.handle);
      // console.log('eachTweet.content.text:  ', eachTweet.content.text);
      // console.log('eachTweet.created_at: ', eachTweet.created_at);
      $tweet += createTweetElement(eachTweet);
    }
    $('#tweet-container').append($tweet);
  };


  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets'
    })
    .then(renderTweets);
  };
 
  loadTweets();


});

//renderTweets(data);

