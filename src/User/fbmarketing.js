const axios = require('axios');
// user router for operations on oneself
const router = require('express').Router();

const jwt = require('../Token');
const config = require('../config');

const sortBy = require('lodash').sortBy

router.get('/', jwt, function getInerests(req, res) {
  const FB_API_TOKEN = config.fbApiToken;
  let query = req.query || 'golf';
  query = query[0].toUpperCase() + query.slice(1).toLowerCase();
  const AD_INTEREST_URL = `https://graph.facebook.com/search?type=adinterest&q=[${query}]&limit=10000&locale=en_US&access_token=${FB_API_TOKEN}`;
  const AD_INTEREST_SUGGESTION_URL = `https://graph.facebook.com/search?type=adinterestsuggestion&interest_list=[%22${query}%22]&limit=1000&locale=en_US&access_token=${FB_API_TOKEN}`;

  let DATA = [];
  axios
    .get(AD_INTEREST_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      if ('data' in result) {
        DATA = result.data;
      }
    });

  axios
    .get(AD_INTEREST_SUGGESTION_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      if ('data' in result) {
        // console.log(JSON.stringify(result));
        return (DATA = [...DATA, ...result.data]);
      }
    })
    .then(data => {
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
      const resData = sortBy(data, )
      res.send(datasortBy);
    });
});
