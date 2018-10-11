var express = require('express');
var router = express.Router();

//loading  auction data from json
var auctionInfo = require('../data/auction_settings');
auctionInfo = JSON.parse(JSON.stringify(auctionInfo));

var auctTimeSetts = auctionInfo.auctSettings;
//end of loading data

/* GET settings page. */
router.get('/settings', function(req, res, next) {
    res.render('auct_setts', { setts: auctTimeSetts});
});

/* POST update settings */
router.post('/settings', function(req, res, next) {
    let body = req.body;
    if (!body.DateTime || !body.timeout || !body.allTime || !body.researchPause) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        auctTimeSetts.DateTime = body.DateTime;
        auctTimeSetts.timeout = body.timeout;
        auctTimeSetts.researchPause = body.researchPause;
        auctTimeSetts.allTime = body.allTime;
        res.status(200);
        res.json({message: "Success"});
    }
});

module.exports = router;
module.exports.auctTimeSetts = auctTimeSetts;