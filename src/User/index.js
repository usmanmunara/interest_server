// user router for operations on oneself
const router = require('express').Router();
const config = require('../config');

// const email = require('../Email');
const jwt = require('../Token');
const hashPassword = require('./hashPBKDF2');

const validator = require('validator');

const sequelize = require('../model');
const Sequelize = require('sequelize');
const userModel = sequelize.model(config.modelNames.userModel);

const registrationEmail = require('../Email/index');
const verificationEmail = require('../Email/verifyEmail.js');


// {
// organization: 'edvant',
// email: 'usman@edvant.net',
// type: 'admin',
// password: '123456',
// fullName: 'Muhammmad Usman Farooq',
// }
// register a user
router.post('/', function createUser(req, res) {
  const {email, password, fullName} = req.body;
  // field completeness check
  if (!email || !password || !fullName) {
    res.status(400).send('Missing fields.');
    return;
  }

  // password verification
  if (password.length < 6) {
    res
        .status(400)
        .send('Password Length should be greater than or equal to 6');
    return;
  }

  // email format and domain verification
  if (!validator.isEmail(email)) {
    res.status(400).send('invalid email');
    return;
  }

  hashPassword(password)
      .then(({hash, salt}) => {
        const user = {
          email,
          salt: salt.toString('base64'),
          password: hash.toString('base64'),
          fullName,
        };

        userModel.sequelize
            .transaction((t) => {
              // create user in own database
              return userModel
                  .create(user, {
                    transaction: t,
                  })
                  .then((newUser) => {
                    user.id = newUser.id; // why add user.id to newUser.id?
                    return jwt.signHashToken({
                      id: user.id,
                    });
                  });
            })
            .then(() => {
              delete user.password, delete user.salt;
              res.send({
                message: 'User created succesfully',
                // userData: {
                //   ...user,
                //   paymentStatus: false,
                // },
              });
              // registrationEmail(user.email);
              verificationEmail(user.email, `https://fbpanda.lswong.com/verify?id=${user.id}`);
            })
            .catch(function createUserError(err) {
              console.error(err);
              if (err instanceof Sequelize.UniqueConstraintError) {
                res.status(409).send(err.errors[0].message);
                return;
              }
              throw err;
            });
      })
      .catch((err) => {
        console.error('Error creating user: ', err);
        res.sendStatus(500);
      });
});

/**
 * @api {patch} /user Update profile of logged in user
 * @apiName UpdateProfile
 * @apiDescription Update profile
 * @apiGroup User
 *
 * @apiExample Example request body (only these fields can be updated; all fields are optional)? In our case all fields will be updated right?
{
  "email": "1234567890@link.cuhk.edu.hk",
  "fullName": "John Doe"
}
 *
 * @apiSuccess (successGroup) 200 OK: All changes  comitted to database.
 * @apiError (errorGroup) 400 Bad Request: Invalid email address format.
 * @apiError (errorGroup) 401 Unauthorized: No authorization token found.
 * @apiError (errorGroup) 500 Internal Server Error: operation failed due to server error.
 */

// update current user
router.patch('/', jwt.verifyTokenMiddleware(true), function updateUser(
    req,
    res
) {
  const {email, fullName} = req.body;

  // email format validation
  if (email && !validator.isEmail(email)) {
    res.sendStatus(400);
    return;
  }
  userModel
      .findByPk(req.user.id)
      .then((user) => {
        if (!user) {
          throw new Error('User not found');
        }
        // update user; force update last modified date
        user.update({
          fullName: fullName ? fullName : user.fullName,
          email: email ? email : user.email,
        });
        user.changed('updatedAt', true);
        return {...user.dataValues, email};
      // return user.save();
      })
      .then((user) => {
        delete user.password;
        delete user.salt;
        res.send({...user, message: 'User Updated'});
      })
      .catch(function updateUserError(err) {
        if (err.message === 'User not found') {
          res.sendStatus(404);
          return;
        }
        console.error('Error updating user: ', err);
        res.sendStatus(500);
      });
});

/**
 * @api {post} /user/password Change password of logged in user
 * @apiName ChangePassword
 * @apiDescription Change password
 * @apiGroup User
 *
 * @apiExample Example request body (only these fields can be updated here)
{
  "oldPassword": "passw0rd",
  "newPassword": "passw1rd"
}
 *
 * @apiError (errorGroup) 400 Bad Request: Old or new passwords are not sent.
 * @apiError (errorGroup) 403 Forbidden: User is not logged in.
 * @apiError (errorGroup) 500 Internal Server Error: operation failed due to server error.
 */

// change password
router.post(
    '/password',
    jwt.verifyTokenMiddleware(true),
    function changePassword(req, res) {
    // console.log(req.user);
      const {oldPassword, newPassword} = req.body;
      // field completeness check
      if (!oldPassword || !newPassword) {
        res.sendStatus(400);
        return;
      }

      // password verification
      if (newPassword.length < 6) {
        res.sendStatus(400);
        return;
      }

      userModel
          .findOne({
            where: {
              id: req.user.id, // req.user.email
            },
          })
          .then((user) => {
            if (!user) {
              throw new Error('Invalid credentials');
            }

            // hash old password and verify
            return hashPassword(oldPassword, Buffer.from(user.salt, 'base64'))
                .then(({hash}) => {
                  if (hash.toString('base64') !== user.password) {
                    // the password in user.passsword is hashed right?
                    throw new Error('Invalid credentials');
                  }
                  return hashPassword(req.body.newPassword);
                })
                .then(({hash, salt}) => {
                  user.update({
                    salt: salt.toString('base64'),
                    password: hash.toString('base64'),
                  });
                  // return user.save();
                  return;
                });
          })
          .then(() => {
            res.send('User password update successfully');
          })
          .catch((err) => {
            if (err.message === 'Invalid credentials') {
              res.sendStatus(403);
            } else {
              console.error('Error authenticating user: ', err);
              res.sendStatus(500);
            }
          });
    }
);

/**
 * @api {post} /user/auth Authenticate user and issue token //LOGIN
 * @apiName HandleUserAuthentication
 * @apiDescription Authenticate user and issue token
 * @apiGroup User
 *
 * @apiExample Example request body
{
  "username": "john",
  "password": "passw0rd"
}
 *
 * @apiSuccessExample {json} Success response: object with user token
{
  token: "..."
}
 *
 * @apiError (errorGroup) 400 Bad Request: missing username or password
 * @apiError (errorGroup) 403 Forbidden: invalid credentials
 * @apiError (errorGroup) 500 Internal Server Error: operation failed due to server error.
 */

// authenticate user
router.post('/auth', function authUser(req, res) {
  const {email, password} = req.body;

  // field completeness check
  if (!email || !password) {
    res.status(400).send('Please complete all the fields');
    return;
  }

  userModel
      .findOne({
        where: {
          email: email,
        },
      })
      .then((user) => {
        if (!user) {
          throw new Error('Invalid credentials');
        }

        if (!user.emailVerified) {
          res.status(403).send({message: 'User email not verified'});
        }

        // hash password and verify
        return hashPassword(password, Buffer.from(user.salt, 'base64'))
            .then(({hash}) => {
              if (hash.toString('base64') !== user.password) {
                throw new Error('Invalid credentials');
              }

              // issue JSON web token as response
              return jwt.signToken({
                id: user.id,
                email: user.email,
                paymentStatus: user.paymentStatus,
                props: user.props,
              });
            })
            .then((token) => {
              res.cookie(config.tokenCookieName, token, config.cookieOptions);
              res.send({
                token: token,
                userData: {
                  id: user.id,
                  email: user.email,
                  paymentStatus: user.paymentStatus,
                  props: user.props,
                },
                message: 'User Authentication Successful',
              });
            });
      })
      .catch((err) => {
        if (err.message === 'Invalid credentials') {
          res.status(403).send('Invalid credentials');
        } else {
          console.error('Error authenticating user: ', err);
          res.status(500).send(err);
        }
      });
});

// verifyUser

router.post('/verifyEmail', function authUser(req, res) {
  const {id} = req.body;

  // field completeness check
  if (!id) {
    res.status(400).send('User ID not found.');
    return;
  }

  userModel
      .findByPk(id)
      .then((user) => {
        if (!user) {
          throw new Error('Invalid user id');
        }
        user.update({emailVerified: true});
        res.send({
          message: 'User Verified',
        });
        registrationEmail(user.email);
      }).catch((err) => {
        if (err.message === 'Invalid credentials') {
          res.status(403).send('Invalid credentials');
        } else {
          console.error('Error verifying user email: ', err);
          res.status(500).send(err);
        }
      });
});

// sign out
router.all('/logout', function logoutUser(req, res) {
  res.clearCookie(config.tokenCookieName);
  res.send('Logout Successful');
  return; // this all changed
});


// reset password

/**
 * @api {post} /user/password Change password of logged in user
 * @apiName ChangePassword
 * @apiDescription Change password
 * @apiGroup User
 *
 * @apiExample Example request body (only these fields can be updated here)
{
  "oldPassword": "passw0rd",
  "newPassword": "passw1rd"
}
 *
 * @apiError (errorGroup) 400 Bad Request: Old or new passwords are not sent.
 * @apiError (errorGroup) 403 Forbidden: User is not logged in.
 * @apiError (errorGroup) 500 Internal Server Error: operation failed due to server error.
 */

// change password
router.post(
    '/resetPassword',
    function changePassword(req, res) {
      const {password, confirmPassword, id} = req.body;
      // field completeness check
      if (!password || !confirmPassword || !id) {
        res.sendStatus(400);
        return;
      }

      // password verification
      if (password.length < 6 || password !== confirmPassword) {
        res.sendStatus(400);
        return;
      }
      userModel
          .findOne({
            where: {
              id: req.body.id, // req.user.email
            },
          })
          .then((user) => {
            if (!user) {
              throw new Error('Invalid credentials');
            }
            // hash old password and verify
            hashPassword(password)
                .then(({hash, salt}) => {
                  user.update({
                    salt: salt.toString('base64'),
                    password: hash.toString('base64'),
                  });
                  return;
                });
          })
          .then(() => {
            res.send('User password update successfully');
          })
          .catch((err) => {
            if (err.message === 'Invalid credentials') {
              res.sendStatus(403);
            } else {
              console.error('Error authenticating user: ', err);
              res.sendStatus(500);
            }
          });
    }
);

module.exports = router;
