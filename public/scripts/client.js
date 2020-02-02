/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  // Initially hide 'Textarea'
  $('.new-tweet').hide();


  // Tweet Form Ajax POST method
  $('#tweetForm').submit(function(event) {
    
    event.preventDefault();
    let textAreaContent = $('textarea').val();

    if (textAreaContent.length === 0) {
      $('.new-tweet p').slideUp();
      return $('.new-tweet').prepend("<p class='caution'>Please type any content before pushing tweet button.</p>");
    
    } else if (textAreaContent.length > 140) {
      $('.new-tweet p').slideUp();
      return $('.new-tweet').prepend("<p class='caution'>Your tweet content is too long. Please type less than 140 characters. Click 'Write a new tweet' (arrow) button again.</p>");
    }

    $.ajax('http://localhost:8080/tweets',{
      method: 'POST',
      data: $(this).serialize(),
      success: function(data) {
      }
    })
      .then(function(data) {
        $('.caution').remove();
        loadOneTweet();
        $('textarea').val('');
      });
  });

  // sanitation of textarea user input
  const escape = function(str) {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  };

  // New tweet HTML format
  const createTweetElement = function(tweet) {
    const userTweet = `${escape(tweet.content.text)}`;
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
      ${userTweet}
      </div> 
      <footer class="formButtonCounter">
        <span>${tweet.created_at}</span>
        <span class="icons">
        <img src="/images/flag.png">
        <img src="/images/retweet.png">
        <img src="/images/heart.png">
        </span>
      </footer>
    </article>`;

    return $tweet;
  };

  // Rendering of entire tweet 
  const renderTweets = function(tweetsArray) {
    console.log(tweetsArray);
    $tweet = '';
    for (let i = 0; i < tweetsArray.length; i++) {
      let lastTweet = tweetsArray.pop();
      $tweet += createTweetElement(lastTweet);
    }
    $('#tweet-container').prepend($tweet);
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
        function(response) {
          let lastTweet = response.pop();
          $tweet = '';
          $tweet = createTweetElement(lastTweet);
          $('#tweet-container').prepend($tweet);
        }
      );
  };
});
