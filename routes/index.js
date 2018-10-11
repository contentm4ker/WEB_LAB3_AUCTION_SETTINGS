var express = require('express');
var router = express.Router();

//loading  auction data from json
var auctionInfo = require('../data/auction_settings');
auctionInfo = JSON.parse(JSON.stringify(auctionInfo));

var paintings = [];
for (key in auctionInfo.paintings) {
    auctionInfo.paintings[key].ind = Number(key);
    paintings.push(auctionInfo.paintings[key]);
}
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

module.exports = router;
module.exports.paintings = paintings;