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

function getPicObjForRender(fullObj) {
    return {
        id: fullObj.ind,
        name: fullObj.name,
        author: fullObj.author,
        discription: fullObj.discription,
        inAuct: fullObj.inAuct,
        startPrice: fullObj.startPrice,
        sMin: fullObj.step.min,
        sMax: fullObj.step.max,
        imgPath: fullObj.imgPath
    }
}

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
    res.render('painting_page', getPicObjForRender(painting));
});

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

/* POST new pic info. */
router.post('/pics/:num(\\d+)', function(req, res, next) {
    let body = req.body;
    let painting;
    if (body.length === 6) {
        if (!body.author || !body.picName || !body.discription ||
            !body.sMin || !body.sMax || !body.startPrice.toString().match(/^\d+$/g)) {
            res.status(400);
            res.json({message: "Bad Request"});
        }
    }

    for (let i = 0; i < paintings.length; i++) {
        if (paintings[i].ind == req.params.num) {
            if (Object.keys(body).length === 6) {
                paintings[i].author = body.author;
                paintings[i].name = body.picName;
                paintings[i].discription = body.discription;
                paintings[i].startPrice = body.startPrice;
                paintings[i].step.min = body.sMin;
                paintings[i].step.max = body.sMax;
            } else if (Object.keys(body).length === 1) {
                paintings[i].inAuct = body.inAuct !== 'true';
            }
            painting = paintings[i];
            break;
        }
    }

    if (painting) {
        res.render('painting_page', getPicObjForRender(painting));
    } else {
        res.status(400);
        res.json({message: "Bad Request"});
    }
});

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
module.exports.paintings = paintings;
module.exports.auctMembers = auctMembers;
module.exports.auctTimeSetts = auctTimeSetts;