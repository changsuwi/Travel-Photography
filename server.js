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
//mongoose
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;                                                                                                             
mongoose.connect('mongodb://wp2017_groupi:wp2017_groupi@luffy.ee.ncku.edu.tw:27017/wp2017_groupi',{ useMongoClient: true });

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

var imageSchema = new  mongoose.Schema({
  img:String,
  data:String,
  firstName:String,
  lastName:String,
//fieldname:String ,
  originalname:String ,
//encoding:String ,
//mimetype:String ,
  destination:String ,
  filename: String,
  path:String ,
//size: String,
//topic:String,
//time:String,
//options:String,  
//1.即時2.作品
//comments:String
//User 經緯度
	 });

var files = mongoose.model('files', imageSchema);
//module.exports = mongoose.model('files', imageSchema);
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



//save img path in mongodb(collections:files)
//include originalname, destination, filename, path
/*var imageSchema = new  mongoose.Schema({
//  fieldname:String ,
  originalname:String ,
 // encoding:String ,
 // mimetype:String ,
  destination:String ,
  filename: String,
  path:String ,
 // size: String
          });
var Image = mongoose.model('files', imageSchema);
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/assets/upload');
  },
  filename: function (req, file, callback) {
  callback(null, file.fieldname + '-' + moment().format('MMMM_Do_YYYY_h:mm:ss_a')+'.jpg');
  }
});
var file;//全域變數
var upload = multer({ storage : storage}).single('userPhoto');
app.post('/upload',function(req,res,next){
   upload(req,res,function(err) {
   var myimg = new Image(req.file);
   myimg.save();
   file = req.file;
   res.sendfile("./public/upload_to_mongo_test.html"); //填想跳轉的頁面
   //if(err) {
      //return res.end("Error uploading file.");
     //      }
      //res.end(req.file.path);
      //console.log(req.file);
    //});

});*/

// save user information in mongodb (collections:users)
/*var nameSchema = new mongoose.Schema({                                                                                                         
    topic:String,
    time:String,
//  options:String,  //1.即時2.作品
//  comments:String
    //User 經緯度
    firstName: String,
    lastName: String,
   // path:String 
});

var User = mongoose.model("users", nameSchema);
//app.use(express.static(__dirname + '/public'));
app.post('/addname', function(req, res) {
   var myData = new User(req.body);
   myData.save()
   // console.log(file);
   // var img = new User(file);
   // img.save()
     /*.then(item => {
      res.send("Name saved to database");
                   })

      .catch(err => {
       res.status(400).send("Unable to save to database");
        });
        //console.log(req.body);
});*/
// create ssh server
var server = https.createServer(options, app).listen(port, function(){
    console.log(`Listening on port ${port}`)
    app.use(express.static(__dirname + '/public'))
});


