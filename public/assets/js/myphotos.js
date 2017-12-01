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
//function userlogin() {
//    var user = userid
//document.getElementById('user').innerHTML = user;

$(document).ready(function () {
    get_json("ajax_data", function(data) {
        for(var j=0;j<3;j++){
            for(var k in data){
                var img_tag = "img" + String(j);
                var topic_tag = "topic" + String(j);
                var comments_tag = "commnts" + String(j);
                var live[j] = data[k].option1;
                var story[j] = data[k].option2;
                var img_src[j] = data[k].path;
                var topic[j] = data[k].topic;
                var comments[j]  = data[k].comment;
                console.log(data[k].user);
                document.getElementById('livenumber').innerHTML = live.length; 
                document.getElementById('storynumber').innerHTML = story.length; 
                document.getElementById(img_tag).innerHTML = "<img src='" + img_src[j] + "exif='ture' class='img-responsive'>";
                document.getElementById(topic_tag).innerHTML = topic[j]; 
                document.getElementById(comments_tag).innerHTML = comments[j]; 
                }
        }
    });
});

// $(document).ready(function() {
  
//   $(window).scroll(function () {
//       //if you hard code, then use console
//       //.log to determine when you want the 
//       //nav bar to stick.  
//       console.log($(window).scrollTop())
//     if ($(window).scrollTop() > 60) {
//       $('.navbar').addClass('navbar-fixed-top');
//     }
//     if ($(window).scrollTop() < 60) {
//       $('.navbar').removeClass('navbar-fixed-top');
//     }
//   });
// });