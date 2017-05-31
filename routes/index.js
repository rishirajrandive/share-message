var express = require('express');
var twilioService = require('../twilio-service');
var mandrill = require('node-mandrill')('6gzbwndAhPHpAbMab6aKrg');
var nodemailer = require('nodemailer');
var fs = require('fs');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Post Message' });
});

router.post('/sendsms', function (req, res) {
  console.log('Sending SMS '+ JSON.stringify(req.body));
  var mobileNumber = req.body.contact;
  var sms = 'Hello';
  twilioService.sendSMS(mobileNumber, 'Hellow', function (err) {
    if(err){
      console.log('Sending sms failed');
      res.send({status_code: 400, response: 'Sending SMS failed '+ err});
    }
    console.log('Show success message');
    res.send({status_code: 200, response: 'Sending SMS complete '});
  });
});

router.post('/sendemail', function(req, res) {
  console.log('Sending email');
  var emailId = req.body.contact;
  var message = "Hello";

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: 'share.messages1@gmail.com',
    to: 'iwtdsn@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
      res.send({status_code: 400, response: 'Sending email failed '+ err})
    } else {
      console.log('Email sent: ' + info.response);
      res.send({status_code: 200, response: info.response})
    }
  });
});

exports.saveMessage = function (message, callback) {

  fs.readFile('./message_store.json', 'utf-8', function(err, data) {
    if (err){
      console.log('Error reading the file' + err);
      callback(true);
    }
    var arrayOfMessages = JSON.parse(data);
    var id = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
    arrayOfMessages.messages.push({
      message: message,
      id: id
    });

    console.log(arrayOfMessages);

    fs.writeFile('./message_store.json', JSON.stringify(arrayOfMessages), 'utf-8', function(err) {
      if (err){
        console.log('Error writing the file' + err);
        callback(true);
      }
      console.log('Done!')
    })
  })
};

module.exports = router;
