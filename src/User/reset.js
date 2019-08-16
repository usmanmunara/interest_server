// reset email router for sending reset password email
const router = require('express').Router();
const config = require('../config');

const validator = require('validator');
const sequelize = require('../model');
const userModel = sequelize.model(config.modelNames.userModel);

const resetEmail = require('../Email/forgetPassword');


// reset password email
router.post('/', function resetPasswordRequest(req, res) {
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
    resetEmail(user.email, `${process.env.EXTERNAL_DOMAIN}/reset?id=${user.id}`);
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
