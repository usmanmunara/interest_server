const crypto = require('crypto');

function hashPassword(phrase, givenSalt) {
  return new Promise((resolve, reject) => {
    const salt = givenSalt || crypto.randomBytes(24);
    crypto.pbkdf2(String(phrase), salt, 300000, 64, 'sha512', (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          hash,
          salt,
        });
      }
    });
  });
}

module.exports = hashPassword;
