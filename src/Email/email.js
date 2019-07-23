
const mailgun = require("mailgun-js");
const apiKey = 'a02e958f461580360d508e59075e4db5-16ffd509-8889e58f';
const DOMAIN = 'fbpanda.lswong.com';
const mg = mailgun({apiKey: apiKey, domain: DOMAIN});
const data = {
    from: 'Excited User <me@fbpanda.org>',
    to: 'usman12farooq@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
    console.log(body);
});
