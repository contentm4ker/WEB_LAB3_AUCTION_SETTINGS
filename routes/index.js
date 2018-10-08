var express = require('express');
var router = express.Router();

//loading  auction data from json
var auctionInfo = require('../data/auction_settings');
auctionInfo = JSON.parse(JSON.stringify(auctionInfo));

var auctTimeSetts = auctionInfo.auctSettings;
var paintings = [];
for (key in auctionInfo.paintings) {
    auctionInfo.paintings[key].ind = Number(key);
    paintings.push(auctionInfo.paintings[key]);
}
var auctMembers = [];
for (key in auctionInfo.auctMembers) {
    auctionInfo.auctMembers[key].ind = Number(key);
    auctMembers.push(auctionInfo.auctMembers[key]);
}
console.log(paintings);
console.log(auctMembers);
console.log(auctTimeSetts);
//end of loading data

/* GET home page. */
router.get('/pics', function(req, res, next) {
    res.render('index', { pics: paintings });
});

/* GET painting. */
router.get('/pics/:num(\\d+)', function(req, res, next) {
    const painting = paintings.filter((p) => {
        if (p.ind == req.params.num) {
            return true;
        }
    })[0];
    console.log(painting);
    res.render('painting_page', {
        name: painting.name,
        author: painting.author,
        discription: painting.discription,
        inAuct: painting.inAuct,
        startPrice: painting.startPrice,
        sMin: painting.step.min,
        sMax: painting.step.max
    });
});

/* GET auction members. */
router.get('/members', function(req, res, next) {
    res.render('members', { members: auctMembers });
});

module.exports = router;
