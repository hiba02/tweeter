/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


////////////////////////////////////////////////////////////////////////
//Remove the hard-coded tweets object that we added earlier in order to drive our renderTweets function.
////////////////////////////////////////////////////////////////////////
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







$(document).ready(function() {
  // $tweet = createTweetElement();
  // $('#tweet-container').append($tweet);

  //Ajax -- tweet button 
  // $(function() {
    
  //   $button.on('click', function () {
  //     event.preventDefault();
  //     $.ajax("test.html", { method: 'POST' })
  //     .then(function (morePostsHtml) {
  //       $button.replaceWith(morePostsHtml);
  //     });
  //   });
  // });




  const testComments = function() {
    // $('#testAjax').text('Hello world');
    $('#testAjax').text($('form').serialize());
    const tweetComments = $('form').serialize();
    console.log(tweetComments);
    console.log(tweetComments.length);

  };



  ///??? POST => 404 error!!
  // need to change GET to POST
  const $button = $('.tweetButton');
  $button.on('click', function() {
    event.preventDefault();
    $.ajax('http://localhost:8080/tweets',{
        method: 'GET',
        name: name 
    })
    .then(testComments)
  });


  //form validation
  //Implement validation before sending the form data to the server. 



  // $("button").click(function(){
  //   $("div").text($("form").serialize());
  // });

  ////////
//   $button.on('click', function() {
//     $.ajax({
//         method: 'GET',
//         url: `${serverURL}/comments.json`
//     })
//     .then(showComments)
//     .fail(handleCommentLoadErrors);
// });


const createTweetElement = function(tweet) {
  // let $tweet = $('<article>').addClass('tweet');
  // // ...
  // return $tweet;
    
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
  }



  const renderTweets = function(tweetsArray) {

// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container

    console.log(tweetsArray);
    $tweet = '';
    for (let eachTweet of tweetsArray) {
      console.log('eachTweet.user.name:  ', eachTweet.user.name);
      console.log('eachTweet.user.avatars:  ', eachTweet.user.avatars);      
      console.log('eachTweet.user.handle:  ', eachTweet.user.handle);
      console.log('eachTweet.content.text:  ', eachTweet.content.text);
      console.log('eachTweet.created_at: ', eachTweet.created_at);
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









//   $('.tweet-container')
//   .mouseover(function(){
//     $(this).removeClass('tweet-container')
//     .addClass('tweet-container-shadow');
//     console.log('mouse in');
//   })
//   .mouseout(function(){
//     $(this).removeClass('tweet-container-shadow')
//     .addClass('tweet-container');
//   })

});

//renderTweets(data);

