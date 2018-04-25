'use strict';

var pubnub = new PubNub({
    publishKey: 'pub-c-38b1e44d-0a3e-42ea-ad1d-80d2b4179912',
    subscribeKey: 'sub-c-09635a68-3e0d-11e8-9e3f-0693e4e720a3',
    ssl: true
});

pubnub.addListener({
    message: function(event) {
        var message = event.message;
        jQuery('#display').text(message.slide + '.' + message.part);
    }
});

pubnub.subscribe({
    channels: ['output']
});

function buttonCommand(button) {
    pubnub.publish({
        channel : 'input',
        message : {button: button}
    });
}

jQuery(document).ready(function() {
    jQuery('.btn').click(function (eventObject) {
        var targetId = jQuery(this).attr('id');
        buttonCommand(targetId);
    });
});
