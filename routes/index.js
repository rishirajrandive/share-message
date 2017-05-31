var express = require('express');
var router = express.Router();

var mandrill = require('node-mandrill')('6gzbwndAhPHpAbMab6aKrg');
var nodeMailer = require('nodemailer');
var fs = require('fs');
var url = require('url');

var twilioService = require('../twilio-service');
var msgStoreManager = require('../msg_store_manager');

var EMAIL_MOBILE_MESSAGE = 'Hello! click the link to see message for you ';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Post Message' });
});

/* Sends SMS to the entered mobile */
router.post('/sendsms', function (req, res) {
  console.log('Sending SMS '+ JSON.stringify(req.body));
  var mobileNumber = req.body.contact;
  var message = req.body.message;

  var id = Math.floor(Math.random() * (1000 - 1 + 1) + 1);

  msgStoreManager.saveMessage(message, id, function (err) {
    if(err){
      console.log('Saving to file failed');
      res.status(500);
      res.send({response: 'Saving message to file failed '+ err});
    }

    var sms = EMAIL_MOBILE_MESSAGE + getURL(req) + '/#!/show/' + id;

    twilioService.sendSMS(mobileNumber, sms, function (err) {
      if(err){
        console.log('Sending sms failed');
        res.send({status_code: err.status, response: 'Sorry! Sending SMS to '+ mobileNumber + ' failed. Please try again.'+ err});
      }
      console.log('Show success message');
      res.send({status_code: 200, response: 'Great! SMS is sent to ' +  mobileNumber + ' with link to your message'});
    });
  });
});

/* Sends Email to the entered email Id */
router.post('/sendemail', function(req, res) {
  console.log('Sending email');
  var emailId = req.body.contact;
  var message = req.body.message;

  var id = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
  var emailBody = EMAIL_MOBILE_MESSAGE + getURL(req) + '/#!/show/' + id;

  var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: 'share.messages1@gmail.com',
    to: emailId,
    subject: 'A message for you!',
    text: emailBody
  };

  msgStoreManager.saveMessage(message, id, function (err) {
    if (err) {
      console.log('Saving to file failed');
      res.status(500);
      res.send({response: 'Saving message to file failed ' + err});
    }
    transporter.sendMail(mailOptions, function(err, info){
      if (err) {
        console.log(err);
        res.status(500);
        res.send({response: 'Sorry! Sending email to ' + emailId + ' failed. Please try again.'+ err})
      } else {
        console.log('Email sent: ' + info.response);
        res.send({status_code: 200, response: 'Great! email is sent to ' +  emailId + ' with link to your message'})
      }
    });
  });

});

/* Returns message for the Id given */
router.get('/getmsg', function(req, res, next) {
  console.log('URL param '+ req);
  var id = parseInt(req.query.id);

  if(isNaN(id)){
    console.log('Id entered is not valid');
    res.send({status_code: 500, response: 'Sorry! Given message ID is not valid'});
  }else {
    msgStoreManager.getMessage(id, function (err, msg) {
      if(err){
        console.log('Failed fetching msg');
        res.send({status_code: 500, response: 'Sorry! failed to find message'});
      }else if(msg){
        console.log('Message is '+ msg);
        res.send({status_code: 200, response: msg});
      }else {
        console.log('Message not found');
        res.send({status_code: 404, response: 'Sorry! message not found'});
      }
    });
  }
});

/* Util function to get the current URL */
function getURL(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host')
  });
}

module.exports = router;
