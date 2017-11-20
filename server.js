//initial
var fs = require('fs')
    http = require('http'),
    https = require('https'),
    express = require('express');

var options = {
    key: fs.readFileSync('./ssl/private.key'),
        cert: fs.readFileSync('./ssl/certificate.crt'),
        };
var app =express();//移過來的
var multer = require('multer');
var moment = require('moment');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/public'));
//const app = express()//我移到前面宣告
const port = 41781

// mongo 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://wp2017_groupi:wp2017_groupi@luffy.ee.ncku.edu.tw:27017/wp2017_groupi";

// when map.js request ajax from maps.html
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

var multer  =   require('multer');
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/assets/upload');
    },
    filename: function (req, file, callback) {
        callback(null, moment().format('MMMM_Do_YYYY_h:mm:ss_a') + '.jpg');
    }
});
var upload = multer({ storage : storage}).single('userPhoto');
app.post('/upload',function (req,res){
   upload(req,res,function(err) {
       path = '/' + req.file.path
       console.log(path)
       firstName = req.body.firstName
       lastName = req.body.lastName
       MongoClient.connect(url, function(err, db) {
           if (err) throw err;
	         db.collection("files").insertOne({
           "path": path,
           "firstname": firstName,
           "lastname": lastName
           })
       })
       res.sendFile(__dirname + path); //填想跳轉的頁面  
   });
});



// create ssh server
var server = https.createServer(options, app).listen(port, function(){
    console.log(`Listening on port ${port}`)
    app.use(express.static(__dirname + '/public'))
});


