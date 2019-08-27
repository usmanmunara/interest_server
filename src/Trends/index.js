// const axios = require('axios');
const router = require('express').Router();
const googleTrends = require('google-trends-api');
const axios = require('axios');

// const jwt = require('../Token');

router.get('/', function getTrends(req, res) {
  googleTrends.interestOverTime({keyword: req.body.keyword, startTime: new Date('January 01, 2019 00:00:00')})
      .then(function(results) {
        // console.log('These results are awesome', results);
        const resultDATA = JSON.parse(results);
        const resultsPromise = [];
        resultsPromise.push(resultDATA.default.timelineData.map((trend) => {
          // console.log(trend.formattedTime, trend.formattedValue[0]);
          return {
            time: trend.formattedTime,
            value: trend.formattedValue[0],
          };
        }));
        Promise.all(resultsPromise).then((finalResults) => {
          res.send(finalResults[0]);
        });
        // res.send(resultDATA);
      })
      .catch(function(err) {
        console.error('Oh no there was an error', err);
      });
});

router.get('/', function getTrends(req, res) {
  googleTrends.interestOverTime({keyword: req.params.keyword, startTime: new Date('January 01, 2019 00:00:00')})
      .then(function(results) {
        // console.log('These results are awesome', results);
        const resultDATA = JSON.parse(results);
        const resultsPromise = [];
        resultsPromise.push(resultDATA.default.timelineData.map((trend) => {
          // console.log(trend.formattedTime, trend.formattedValue[0]);
          return {
            time: trend.formattedTime,
            value: trend.formattedValue[0],
          };
        }));
        Promise.all(resultsPromise).then((finalResults) => {
          res.send(finalResults[0]);
        });
        // res.send(resultDATA);
      })
      .catch(function(err) {
        console.error('Oh no there was an error', err);
      });
});

router.get('/related', function getTrends(req, res) {
  googleTrends.relatedQueries({keyword: req.params.keyword})
      .then(function(results) {
        // console.log('These results are awesome', results);
        const resultDATA = JSON.parse(results);
        // res.send(resultDATA);
        const resultsPromise = [];
        resultsPromise.push(resultDATA.default.rankedList[0].rankedKeyword.map((trend) => {
          // console.log(trend.formattedTime, trend.formattedValue[0]);
          return {
            query: trend.query,
            value: trend.formattedValue,
            link: trend.link,
          };
        }));
        Promise.all(resultsPromise).then((finalResults) => {
          res.send(finalResults[0]);
        });
      })
      .catch(function(err) {
        console.error('Oh no there was an error', err);
      });
});

router.get('/relatedMuse', function getTrends(req, res) {
  axios.get('https://api.datamuse.com/words', {
    params: {
      ml: req.params.keyword,
    },
  }).then((result) => {
    res.send(result.data);
  })
      .catch(function(err) {
        console.error('Oh no there was an error', err);
      });
});


module.exports = router;
