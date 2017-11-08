const express = require('express')
const app = express()
const port =  41781// 請改成其他你喜歡的數字
var data = {
	placeid : "ChIJs-vv2xlVXTQR87cVUnPn-Es",
	hot : 10.0,
	category : 1.0,
	lat : 25.0894062,
	lng : 121.8475243,
	name : "不厭亭",
	description : ""
}
var json_data = JSON.stringify(data)
app.get("/ajax_data", function(req, res) {
  console.log("json!!!")
  res.json(json_data)
})
app.listen(port,() => {
    console.log(`Listening on port ${port}`)
    app.use(express.static(__dirname +'/public'))
})
