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
    
    //validation in textarea
    //??????????????????????
    // beforesend: even if I used return, I still see 400 (Bad request)
    $.ajax('http://localhost:8080/tweets',{
        method: 'POST',
        beforeSend: function(){
          let textAreaContent = $('textarea').val();  
          //console.log('textAreaContent',textAreaContent);
          console.log('textAreaContent.length', textAreaContent.length);
          if (textAreaContent.length === 0) {
            return alert('Please type any content before pushing tweet button.');
            
          } else if (textAreaContent.length > 140) {
            return alert('Your tweet content is too long. Please type less than 140 characters.');
          }
        },
        data: $(this).serialize(),
        success: function(data){
          console.log('data inside ajax', $(this).serialize());
        }
    })
    .then(function(data){
      console.log('data', data);
      loadOneTweet();
      //$(document).scrollTop($(document).height());
    })
    // .then(
    //   function(){
    //     $('html').animate({
    //       scrollTop: $('html').height()
    //     }, 'slow');
    //   }
    // )
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

  const loadOneTweet = function() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets'
    })
    .then(
      function(response){
        let lastTweet = response.pop();
        $tweet = '';
        $tweet = createTweetElement(lastTweet);
        $('#tweet-container').append($tweet);
      }     
    )
  }
});

//renderTweets(data);

