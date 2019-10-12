const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient;

var url = "mongodb://khalid:khalid123741@ds026898.mlab.com:26898/soccer";
var dbo = undefined;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("soccer");
});

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/addJoueur', async function  (req, res) {
    try {
        let data = req.query;
        var res = await dbo.collection("customers").insertOne(data);
        console.log(res.ops)
    }catch (e) {
        console.log('eerr',e)
    }
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

