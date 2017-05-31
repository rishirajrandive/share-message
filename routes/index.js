var express = require('express');
var twilioService = require('../twilio-service');
var mandrill = require('node-mandrill')('6gzbwndAhPHpAbMab6aKrg');
var nodemailer = require('nodemailer');

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
    }
    console.log('Show success message');
  });
});

router.post('/sendemail', function(req, res) {
  // console.log('Sending email');
  // var emailId = req.body.contact;
  // var message = "Hello";
  //
  // mandrill('/messages/send', {
  //   message: {
  //     to: [{email: emailId, name: 'Test Name'}],
  //     from_email: 'randive.rishiraj@gmail.com',
  //     subject: "Hey, what's up?",
  //     text: "Hello, I sent this message using mandrill."
  //   }
  // }, function(error, response)
  // {
  //   //uh oh, there was an error
  //   if (error) console.log( JSON.stringify(error) );
  //
  //   //everything's good, lets see what mandrill said
  //   else console.log(response);
  // });



  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'randive.rishiraj@gmail.com',
      pass: '20Ty$0n12'
    }
  });

  var mailOptions = {
    from: 'randive.rishiraj@gmail.com',
    to: 'iwtdsn@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});
module.exports = router;
