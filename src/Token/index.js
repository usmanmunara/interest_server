const fs = require('fs');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const config = require('../config');

const privateKey = fs.readFileSync('./src/Token/rsa_private.pem');
const publicKey = fs.readFileSync('./src/Token/rsa_public.pem');
const hashKey = config.tokenKeys.hmacKey;

// JWT Signature
/* HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret) */

const signingOptions = {
  algorithm: 'RS256',
  expiresIn: '7 days',
  issuer: process.env.EXTERNAL_DOMAIN,
};

const verifyOptions = {
  algorithm: ['RS256'],
  issuer: [process.env.EXTERNAL_DOMAIN],
};

const hashOptions = {
  algorithm: 'HS256',
  expiresIn: '7 days',
  issuer: process.env.EXTERNAL_DOMAIN,
};

const verifyHashOptions = {
  algorithm: ['HS256'],
  issuer: process.env.EXTERNAL_DOMAIN,
};

function signToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, signingOptions, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, verifyOptions, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

function signHashToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, hashKey, hashOptions, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

function verifyHashToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, hashKey, verifyHashOptions, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

function decodeToken(token) {
  return jwt.decode(token);
}

function verifyTokenMiddleware(throwError, secret) {
  return expressJWT({
    secret: secret || publicKey,
    credentialsRequired: throwError,
    getToken: (req) => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      } else if (req.cookies && req.cookies[config.tokenCookieName]) {
        return req.cookies.token;
      }
      return null;
    },
  });
}

module.exports = {
  decodeToken,
  signToken,
  verifyToken,
  signHashToken,
  verifyHashToken,
  verifyTokenMiddleware,
};
