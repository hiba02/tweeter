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
  $('.new-tweet').hide();

  $('#arrowButton').click(function(){
    $('.new-tweet').toggle();
    $('.new-tweet').css('marginTop','80px');
    $(this).scrollTop();
    $('textarea').focus();
    $('textarea').val('');
    $('.counter').text(140);
    $('.counter').css({"color":"rgb(46, 48, 51)"});
  });

  $('.navWrite').click(function(){
    $('textarea').focus();
  });

  setInterval(function(){
    $("#arrowAnimation").toggleClass("arrowMove");

  },500)
  // setInterval(function(){
  //   $('#arrowButton').slideUp()
  //   $('#arrowButton').slideDown()
  // },500)

  //??????????????????????????????
  // animation of arrow is not working
  // setInterval(function(){
  //   $('#arrowButton').animate({paddingTop: '5px'});
  //   $('#arrowButton').animate({paddingBottom: '5px'});
  // },500);


  // setInterval(function(){
  //   $('#arrowButton').css('paddingTop','5px')
  //   $('#arrowButton').css('paddingBottom','5px');
  // },500);






  //new Tweet up and down
  // $('.arrowButton').click(function(){
  //   $('.new-tweet').slideUp()
  // })

  // $('.arrowButton').click(function(){
  //   $('.new-tweet').toggle()
  // })



  // $('#arrowButton').mouseover(function(){
  //   $('#arrowButton img').css("height", "200%");
  //   console.log('bbbbb');
  // })
  
  // setInterval(function(){
  //   $('arrowButton').animate("height", "120%");
  // }, 500);


  $('.arrow').css('cursor', 'pointer');
  $('.navWrite').css('cursor', 'pointer');

  $('#tweetForm').submit(function(event) {
    
    event.preventDefault();
    let textAreaContent = $('textarea').val();
          
    console.log('escape textAreaContent:  ', textAreaContent);  

    if (textAreaContent.length === 0) {
      $('.new-tweet p').slideUp();
      // return alert('Please type any content before pushing tweet button.');
      return $('.new-tweet').prepend("<p class='caution'>Please type any content before pushing tweet button.</p>");
    
    } else if (textAreaContent.length > 140) {
      $('.new-tweet p').slideUp();
      // return alert('Your tweet content is too long. Please type less than 140 characters.');
      return $('.new-tweet').prepend("<p class='caution'>Your tweet content is too long. Please type less than 140 characters. Click Write a new tweet (arrow) button again.</p>");
      //event.stopPropagation();
    }
    //validation in textarea
    //??????????????????????
    // beforesend: even if I used return, I still see 400 (Bad request)
    $.ajax('http://localhost:8080/tweets',{
        method: 'POST',
        data: $(this).serialize(),
        success: function(data){
          // console.log('data inside ajax', $(this).serialize());
        }
    })
    .then(function(data){
      // console.log('data', data);
      $('.caution').remove();
      loadOneTweet();
      //$(document).scrollTop($(document).height());
      $('textarea').val('');
    })
    // .then(
    //   function(){
    //     $('html').animate({
    //       scrollTop: $('html').height()
    //     }, 'slow');
    //   }
    // )
  });






  // ${$("<div class='tweet-container-content'>").text(tweet.content.text)}

  

//   <div class="tweet-container-content">
//   ${tweet.content.text}
//   </div>

// ${$('div').text(tweet.content.text).addClass('tweet-container-content')}


// const userTweet = `${escape(tweet.content.text)}`;
const escape =  function(str) {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}

const createTweetElement = function(tweet) {
  // const userTweet = $('div').addClass('tweet-container-content').text(tweet.content.text);
  const userTweet = `${escape(tweet.content.text)}`;
  // console.log('userTweet', userTweet);
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
      <span class="counter">
      <img src="/images/flag.png">
      <img src="/images/retweet.png">
      <img src="/images/heart.png">
      </span>
    </footer>
  </article>`

  // console.log("createTweetElement: tweet.content.text", tweet.content.text);
  // console.log("createTweetElement: tweet", tweet);
  // console.log($("<div class='tweet-container-content'>").text(tweet.content.text));
  return $tweet;
};



  const renderTweets = function(tweetsArray) {
    console.log(tweetsArray);
    $tweet = '';
    // for (let eachTweet of tweetsArray) {
      
    //   $tweet += createTweetElement(eachTweet);
    // }

    // to take last element first 
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
      function(response){
        let lastTweet = response.pop();
        $tweet = '';
        $tweet = createTweetElement(lastTweet);
        $('#tweet-container').prepend($tweet);
      }     
    )
  }
  // page loading -> textarea
  // $(document).ready(function(){ $("textarea").focus();})


});

//renderTweets(data);

