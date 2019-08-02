// const axios = require('axios');
const router = require('express').Router();


const config = require('../config');
const jwt = require('../Token');

const sequelize = require('../model');

const userModel = sequelize.model(config.modelNames.userModel);

router.all('/confirmPayment', function confirmPayment(req, res) {
  console.log(req.body);
  if (!req.body.data) {
    res.sendStatus(401);
    return;
  }

  userModel.findOne({where: {email: req.body.data.object.client_reference_id}}).then((user) => {
    if (user) {
      user.update({
        paymentStatus: true,
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
});

router.post(
    '/stopSubscription',
    function stopSubscription(req, res) {
      userModel.findByPk(req.user.id).then((user) => {
        if (user) {
          userModel.update({
            paymentStatus: false,
          });
        // Configure stripe here too.
        }
      // });
      });
    }
);

router.get('/paymentStatus',
    jwt.verifyTokenMiddleware(true),
    function confirmPayment(req, res) {
      userModel.findOne({where: {id: req.user.id}}).then((user) => {
        if (user) {
          res.send(user);
        } else {
          res.sendStatus(404);
        }
      });
    });
module.exports = router;
