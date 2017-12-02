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

// Express Router

// 建立 Router 物件
var router = express.Router();

// when map.js request ajax from maps.html
router.get("/map_initial", function(req, res) {
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

//回傳live＆your_story//判斷前端的呼應
/*app.get("/ajax_data", function(req, res) {
    MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    console.log("Database created!");
	    db.collection("Live").find({}).toArray(function(err, result) {
	        if (err) throw err;
	        console.log(result);
	        res.json(result);
	        db.close();
	    })
	})
}) 
app.get("/ajax_data", function(req, res) {
    MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    console.log("Database created!");
	    db.collection("Your_Story").find({}).toArray(function(err, result) {
	        if (err) throw err;
	        console.log(result);
	        res.json(result);
	        db.close();
	    })
	})
}) 

*/
router.get("/search_autocomplete", function(req, res) {
    console.log(req.query.query)
    query = req.query.query
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
      db.collection("Location").find({'name': {'$regex': query}}).toArray(function(err, result) {
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
router.post('/upload',function (req,res){
   upload(req,res,function(err) {
       console.log(req.body)
       path = req.file.path.slice(6)
       console.log(path)
       user = req.body.user
       console.log(user)
       topic = req.body.topic                                                   
       time = req.body.time
       comments = req.body.comments
       options = req.body.options
       location = req.body.location
       console.log(location)
       if(options == '作品集') db_collect = 'Your_Story'
       else db_collect = 'Live'
	   
       MongoClient.connect(url, function(err, db) {
           if (err) throw err;
	         db.collection(db_collect).insertOne({
           "path": path,
           "user": user,
           "topic":topic,
           "time":time,
           "comments":comments,
           "options":options,
           "location": location
           })
           if( location != "" ){
            
            var myquery = {"name": location };
            var newvalue;
            if(db_collect == 'Live') newvalues = {$set: {live : path },$inc: {"hot.day" : +1,"hot.week" : +1, "hot.month" : +1,"hot.year" : +1,"hot.total" : +1}};
            else newvalues = {$set: {your_story : path },$inc: {"hot.day" : +1,"hot.week" : +1, "hot.month" : +1,"hot.year" : +1,"hot.total" : +1}};
            db.collection("Location").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log(location + " " + db_collect);
              db.close();
            });
           }
       })
       res.sendFile(__dirname + path); //填想跳轉的頁面  
   });
});

router.get('/myphoto/:userid', function(req, res){
    console.log(req.params.userid)
    MongoClient.connect(url, function(err, db){
        if(err) throw err
        db.collection('Your_Story').find({'user': req.params.userid}).toArray( function(err, res){
            if(err) throw err;
            console.log(res);
        })
    })
})
app.use('/', router)

// create ssh server
var server = https.createServer(options, app).listen(port, function(){
    console.log(`Listening on port ${port}`)
    app.use(express.static(__dirname + '/public'))
});


