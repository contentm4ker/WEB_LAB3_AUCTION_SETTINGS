var express = require('express');
var router = express.Router();

//loading  auction data from json
var auctionInfo = require('../data/auction_settings');
auctionInfo = JSON.parse(JSON.stringify(auctionInfo));

var auctMembers = [];
for (key in auctionInfo.auctMembers) {
    auctionInfo.auctMembers[key].ind = Number(key);
    auctMembers.push(auctionInfo.auctMembers[key]);
}
//end of loading data

/* GET auction members. */
router.get('/members', function(req, res, next) {
    res.render('members', { members: auctMembers });
});

/* delete auction member. */
router.post('/members/delete', function(req, res, next) {
    let body = req.body;
    if (!body.id.toString().match(/^\d+$/g)) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        auctMembers.splice(body.id, 1);
        for (let i = 0; i < auctMembers.length; i++) {
            auctMembers[i].ind = i;
        }
        res.render('members', { members: auctMembers });
    }
});

/* add auction member. */
router.post('/members/put/add', function(req, res, next) {
    let body = req.body;
    if (!body.name ||
        !body.money.toString().match(/^\d+$/g)) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        auctMembers.push({
            name: body.name,
            money: body.money,
            ind: auctMembers.length
        });
        res.render('members', { members: auctMembers });
    }
});

/* change auction member money. */
router.post('/members/put/change', function(req, res, next) {
    let body = req.body;
    if (!body.id ||
        !body.money.toString().match(/^\d+$/g)) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        for (let i = 0; i < auctMembers.length; i++) {
            if (auctMembers[i].ind == body.id) {
                auctMembers[i].money = body.money;
            }
        }
        res.render('members', { members: auctMembers });
    }
});

module.exports = router;
module.exports.auctMembers = auctMembers;