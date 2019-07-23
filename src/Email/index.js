// user router for operations on oneself
const router = require('express').Router();
const config = require('../config');
const Mailgun = require('mailgun-js');

const sequelize = require('../model');
const userModel = sequelize.model(config.modelNames.userModel);

const apiKey = 'a02e958f461580360d508e59075e4db5-16ffd509-8889e58f';
const domain = 'fbpanda.lswong.com';

router.get('/registered/:email', function(req, res) {
  console.log('Me working baby');
  //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
  var mailgun = new Mailgun({ apiKey, domain });
  var data = {
    //Specify email data
    from: 'Admin <me@fbpanda.org>',
    //The email to contact
    to: req.params.email || 'usman12farooq@gmail.com',
    //Subject and text data
    subject: 'Hello from Panda',
    text:
      'Thank you so much for registering with FBPANDA we hope you have a nice expereince with us.'
  };
  //Invokes the method to send emails given the above data with the helper library
  mailgun.messages().send(data, function(err, body) {
    if (err) {
      res.send(err);
      console.log('got an error: ', err);
    } else {
      console.log(body);
    }
  });
});

router.get('/payment/:email', function(req, res) {
  console.log('Me working baby');
  //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
  var mailgun = new Mailgun({ apiKey, domain });
  var data = {
    //Specify email data
    from: 'Admin <me@fbpanda.org>',
    //The email to contact
    to: req.params.email || 'usman12farooq@gmail.com', //req.params.mail ||
    //Subject and text data
    subject: 'Payment to Panda',
    text:
      'Your payment have been made. Please enjoy the product and let us know if you haev any feedback'
  };
  //Invokes the method to send emails given the above data with the helper library
  mailgun.messages().send(data, function(err, body) {
    if (err) {
      res.send(err);
      console.log('got an error: ', err);
    } else {
      console.log(body);
    }
  });
});

router.get('/validate/:email', function(req,res) {
  var mailgun = new Mailgun({apiKey: api_key, domain: domain});
  var members = [
    {
      address: req.params.email
    }
  ];
//For the sake of this tutorial you need to create a mailing list on Mailgun.com/cp/lists and put its address below
  mailgun.lists('NAME@MAILINGLIST.COM').members().add({ members: members, subscribed: true }, function (err, body) {
    console.log(body);
    if (err) {
          res.send("Error - check console");
    }
    else {
      res.send("Added to mailing list");
    }
  });
})

module.exports = router;
