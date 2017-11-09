const express = require('express')
const app = express()
const port = 41781 // 請改成其他你喜歡的數字

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://wp2017_groupi:z076rgzw@luffy.ee.ncku.edu.tw:27017/wp2017_groupi";

app.get("/ajax_data", function(req, res) {
    MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    console.log("Database created!");
	    db.collection("Location").find({}).toArray(function(err, result) {
	        if (err) throw err;
	        console.log(result);
	        res.json(result);
	        db.close();
	    })
	})
}) 
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    app.use(express.static(__dirname + '/public'))
});