/**
 * Created by rishi on 5/30/17.
 */


var accountSid = process.env.TRIAL_ACCOUNT_SID;
var authToken = process.env.TRIAL_AUTH_TOKEN;

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);
var dotenv = require('dotenv').config();


exports.sendSMS = function (receiver, smsBody, callback) {
    console.log('receiver '+ receiver + ' sender ' + process.env.TWILIO_SENDER);
    console.log('sms '+ smsBody);

    // client.messages.create({
    //     to: receiver,
    //     from: process.env.TWILIO_SENDER,
    //     body: smsBody,
    // }, function(err, message) {
    //     if(err){
    //         console.log('Error ' + err);
    //         callback(true)
    //     }
    //     console.log(message.sid);
    //     callback(false);
    // });
};
