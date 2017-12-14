function get_json(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Here the callback gets implemented
                var item = JSON.parse(xhr.responseText);
                callback(item);
            } else {

            }
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
}

window.onload = function () {
    get_json("index_new", function(data) {
        for(var k in data){
            console.log(k)
            console.log(data[k])
            var img_tag = "img" + String(k);
            var topic_tag = "topic" + String(k);
            var comments_tag = "comments" + String(k);
            var location_tag = "location" + String(k);
            var location = data[k].location;
            var img_src = data[k].path;
            var topic = data[k].topic;
            var comments = data[k].comments;
            console.log(img_src + "     " + img_tag);                              
            //點開後的圖片id為 img0in or img1in or img2in之類的 
            document.getElementById(img_tag).innerHTML = "<img src='" + img_src + "' class='img-responsive'>";
            document.getElementById(img_tag + 'in').innerHTML = "<img src='" + img_src + "'exif='ture' class='img-responsive'>";
            document.getElementById(location_tag).innerHTML = location;
            document.getElementById(topic_tag).innerHTML = topic;
            document.getElementById(topic_tag+ 'in').innerHTML = topic; 
            document.getElementById(comments_tag).innerHTML = comments; 
        }
    });
}
