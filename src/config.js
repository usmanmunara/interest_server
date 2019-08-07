module.exports = {
  tokenCookieName: 'token',
  cookieOptions: {
    httpOnly: true,
    secure: true,
  },

  tokenKeys: {
    hmacKey: Buffer.from(process.env.TOKEN_HMAC_KEY, 'base64'),
  },

  userTokenTypes: {
    activateAccount: 'ActivateAccount',
    resetPassword: 'ResetPassword',
    updateEmail: 'UpdateEmail',
    newAccount: 'ActivateAccount',
  },

  modelNames: {
    userModel: 'User',
  },

  fbApiToken: process.env.FB_API_TOKEN,

  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
};
