//initial
var fs = require('fs')
    http = require('http'),
    https = require('https'),
    express = require('express');

var options = {
    key: fs.readFileSync('./ssl/private.key'),
        cert: fs.readFileSync('./ssl/certificate.crt'),
        };
var app =express();
var multer = require('multer');
var moment = require('moment');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

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

// create ssh server
var server = https.createServer(options, app).listen(port, function(){
    console.log(`Listening on port ${port}`)
    app.use(express.static(__dirname + '/public'))
});

//save img path in mongodb(collections:files)
//include originalname, destination, filename, path
var imageSchema = new  mongoose.Schema({
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
    callback(null, './assets/upload');
  },
  filename: function (req, file, callback) {
  callback(null, file.fieldname + '-' + moment().format('MMMM Do YYYY, h:mm:ss a'));
  }
});

var upload = multer({ storage : storage}).single('userPhoto');
app.post('/upload',function(req,res,next){
   upload(req,res,function(err) {
   var myimg = new Image(req.file);
   myimg.save();

   if(err) {
      return res.end("Error uploading file.");
           }
      res.end("File is uploaded");
      console.log(req.file);
    });

});

// save user information in mongodb (collections:users)
var nameSchema = new mongoose.Schema({                                                                                                         
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
app.use(express.static(__dirname + '/public'));
app.post('/addname', function(req, res) {
   var myData = new User(req.body);
   myData.save()
     .then(item => {
      res.send("Name saved to database");
                   })

      .catch(err => {
       res.status(400).send("Unable to save to database");
        });
        console.log(req.body);
});
app.listen(port, () => {
    console.log("Server listening on port " + port);
});
