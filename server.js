const express = require('express')
const app = express()
const port =  41781// 請改成其他你喜歡的數字
var data = {
	"placeid" : "ChIJs-vv2xlVXTQR87cVUnPn-Es",
	"hot" : 5.0,
	"category" : 1.0,
	"lat" : 25.108914,
	"lng" : 121.845868,
	"name" : "九份開成殿管理委員會",
	"description" : "九份夕陽 夜景 攝影點"

}
app.get("/ajax_data", function(req, res) {
  console.log(data.hot)
  res.json(data)
})
app.listen(port,() => {
    console.log(`Listening on port ${port}`)
    app.use(express.static(__dirname +'/public'))
})
