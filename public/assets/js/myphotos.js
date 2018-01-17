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
    console.log('onload finish')
    $(document).on('fbload',function() {
        console.log('get fbload trigger')
        window.FB.getLoginStatus(function(response) {
            console.log(response.status)
            if (response.status === 'connected') {
                window.FB.api('/me',function(response) {
                var userid = response.id;
                var username = response.name;
                document.getElementById("user").innerHTML = username;
                //document.getElementById("user").innerHTML = userid; 
                console.log(response.id);
                    get_json("myphoto/" + userid, function(data) {
                            for(var k in data){
                                console.log(k)
                                console.log(data[k])
                                var img_tag = "img" + String(k);
                                var topic_tag = "topic" + String(k);
                                var comments_tag = "comments" + String(k);
                                var location_tag = "location" + String(k);
                                var location = data[k].time;
                                var live = data[k].option1;
                                var story = data[k].option2;
                                var img_src = data[k].path;
                                var topic = data[k].topic;
                                var comments = data[k].comments;
                                console.log(img_src + "     " + img_tag);
                                document.getElementById('backgroundimg').innerHTML = "<img src='" + img_src + "' class='img-full'>";                                 
                                //點開後的圖片id為 img0in or img1in or img2in之類的 
                                document.getElementById(img_tag).innerHTML = "<img src='" + img_src + "' class='img-responsive'>";
                                document.getElementById(img_tag + 'in').innerHTML = "<img src='" + img_src + "'exif='ture' class='img-responsive'>";
                                document.getElementById(location_tag).innerHTML = lacation;
                                document.getElementById(topic_tag).innerHTML = topic; 
                                document.getElementById(comments_tag).innerHTML = comments; 
                            }
                    });
                });
            }
        });
    });
}
window.fbAsyncInit = function() {
  window.FB.init({
    appId:            '138219450232304',
    autoLogAppEvents: true,
    xfbml:            true, // if there exist fb plugin in the page, then change to true
    status: true,
    version:          'v2.11'
  });
  console.log(FB);
  $(document).trigger('fbload');
};
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/zh_TW/sdk/debug.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
