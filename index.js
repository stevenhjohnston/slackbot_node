'use strict';

var Slack = require('slack-client');
var Twitter = require('twitter');

var slack = new Slack('xoxb-9875027141-BkPrKVrKEeFZ7AxCPdBdma8U', true, true);

var open = function() {
  console.log('Connected');
};

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

slack.on('open', open);

slack.on('message', function(message) {
  var channel = slack.getChannelGroupOrDMByID(message.channel);
  var user = slack.getUserByID(message.user);

  var regex = /fuck|shit|cunt/i;

  if (regex.test(message.text)) {
    channel.send('Now, now, ' + user.name + ' no need to be so uncivilised...');
    return;
  }

  var tweet = /tweet: /gi;
  if (tweet.test(message.text)) {
    var msg = message.text.replace('tweet: ', '');
    client.post('statuses/update', {status: msg},  function(error, tweet){
      if(error) throw error;
      console.log('success', tweet);  // Tweet body.
    });
  }
});

slack.login();
