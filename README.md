# Share Message

This is a simple web app to send a message to either a mobile or an email id.

**Developed using**

Node v6.10.3

npm 3.10.10

AngularJS 1.6.4

Boostrap 3.3.7

**How to use**

1. App is deployed on Heroku, [click here](http://share-message.herokuapp.com/#!/) to access it.
2. Enter either mobile number (+15558675309) or an email id (abc@xyz.com)
3. Enter your message
4. Click send

Currently the app only works for US numbers.



**Tools used**

1. [Twilio](https://www.twilio.com/docs/) to send SMS
2. [Nodemailer](https://nodemailer.com/about/) to send the emails
3. [Dotenv](https://www.npmjs.com/package/dotenv) to manage the environment variables for app

**How to run (pre-requisite Node and npm)**

1. Clone the repository in your local
2. Assuming that npm and Node is installed on your machine, go the cloned repo use 'npm install' command in your terminal.
4. Create a .env file in your root directory as shown

TRIAL_ACCOUNT_SID=<your_twilio_account_sid>

TRIAL_AUTH_TOKEN=<your_twilio_auth_token>

TWILIO_SENDER=<your_twilio_phone_number>

EMAIL_USERNAME=<your_email_id>

EMAIL_PASSWORD=<your_email_password>

3. Once complete, run 'npm start' command and you should be able to run the app on http://localhost:3000/














