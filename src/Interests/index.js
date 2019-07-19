const axios = require('axios');
const router = require('express').Router();

// const jwt = require('../Token');
const config = require('../config');

// const sortBy = require('lodash').sortBy;

router.get('/', function getInerests(req, res) {
  const FB_API_TOKEN = config.fbApiToken;
  // console.log(FB_API_TOKEN);
  let query = req.query.search || 'golf';
  query = query[0].toUpperCase() + query.slice(1).toLowerCase();
  const AD_INTEREST_URL = `https://graph.facebook.com/search?type=adinterest&q=[${query}]&limit=10000&locale=en_US&access_token=${FB_API_TOKEN}`;
  const AD_INTEREST_SUGGESTION_URL = `https://graph.facebook.com/search?type=adinterestsuggestion&interest_list=[%22${query}%22]&limit=1000&locale=en_US&access_token=${FB_API_TOKEN}`;

  let DATA = [];
  const getFirstApi = new Promise(function(resolve, reject) {
    axios.get(AD_INTEREST_URL).then(res => resolve(res.data));
  });
  const getSecondApi = new Promise(function(resolve, reject) {
    axios.get(AD_INTEREST_SUGGESTION_URL).then(res => resolve(res.data));
  });
  Promise.all([getFirstApi, getSecondApi])
    .then(res => {
      let data = [...res[0].data, ...res[1].data];
      console.log(data);
      return (DATA = data.map(({ audience_size, id, name, topic }) => {
        return {
          audience_size,
          id,
          name,
          topic
        };
      }));
    })
    .then(data => {
      res.send(data);
    })
    .catch(function FbApiError(err) {
      console.error(err);
      res.sendStatus(404);
    });
});
module.exports = router;
