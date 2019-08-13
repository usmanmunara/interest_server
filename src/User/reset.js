// reset email router for sending reset password email
const router = require('express').Router();
const config = require('../config');

const validator = require('validator');
const sequelize = require('../model');
const userModel = sequelize.model(config.modelNames.userModel);

const resetEmail = require('../Email/forgetPassword');


// reset password email
router.post('/reset', function resetPasswordRequest(req, res) {
  // field completeness check
  if (!req.body.email || !validator.isEmail(req.body.email)) {
    res.sendStatus(400);
    return;
  }

  userModel.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      throw new Error('User not found');
    }
    resetEmail(user.email, `https://fbpanda.lswong.com/reset?id=${user.id}`).catch((err) => {
      console.error('Error sending password reset email: ', err);
    });
    res.sendStatus(202);
  }).catch((err) => {
    if (err.message === 'User not found') {
      res.sendStatus(404);
      return;
    }
    console.error('Error processing password reset: ', err);
    res.sendStatus(500);
  });
});


module.exports = router;
