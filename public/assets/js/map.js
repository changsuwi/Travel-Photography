var scene_data;
// get json from server
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

var icon_image = './assets/images/icons/camera.png';
var center = { lat: 25.0894062, lng: 121.8475243 };

function plot_marker(map, marker, data, show_infowindow){
    var placeid = data.placeid;
    var name = data.name;
    var hot = data.hot;
    var lat = data.lat;
    var lng = data.lng;
    var description = data.description;
    var live_path = data.live;
    var your_story_path = data.your_story;

    var point = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        map: map,
        position: point,
        title: name,
        icon: icon_image
    });
    console.log(data.placeid);

    // infowindow's html code
    var contentString = '<h1 style="color:black; text-align:center;">' + name + '</h1>' +
         '<p style="color:black; text-align:center;">' + description + '</p>' +
         '<div class="row">' +
         '<div class="col-sm-6">' +
         '<h2 style="color:black; text-align:center;"> 即時影像 </h2>' +
         '<img class="img-responsive" style="width: 200px ; display:block; margin:auto;" src =' + live_path + '>' + '</div>' +
         '<div class="col-sm-6">' +
         '<h2 style="color:black; text-align:center;"> 相關作品 </h2>' +
         '<img class="img-responsive" style="width: 200px ; display:block; margin:auto;" src =' + your_story_path + '>' + '</div>' +
         '</div>'
    // set the scene marker
    marker['infowindow'] = new google.maps.InfoWindow({
        content: contentString
    });

    // set scene infowindow

    google.maps.event.addListener(marker, 'click', function() {
        if(typeof show_infowindow != 'undefined'){
            console.log(typeof show_infowindow)
            show_infowindow.close();                 
        }
        this['infowindow'].open(map, this);
        show_infowindow = this['infowindow'];
    });

    /*google.maps.event.addListener(marker, 'mouseout', function() {
        this['infowindow'].close();
    });*/
}
// initial the map
function initMap() {
    // set user's center
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: center,
    });
    var marker = new google.maps.Marker({
        map: map,
        position: center,
    });

    var show_infowindow
    // get data from server
    get_json("map_initial", function(data) {
        
        // decode json
        scene_data = data;
        for (var k in data) {
            var placeid = data[k].placeid;
            var name = data[k].name;
            var hot = data[k].hot;
            var lat = data[k].lat;
            var lng = data[k].lng;
            var description = data[k].description;
            var live_path = data[k].live;
            var your_story_path = data[k].your_story;

            var point = new google.maps.LatLng(lat, lng);
            var marker = new google.maps.Marker({
                map: map,
                position: point,
                title: name,
                icon: icon_image
            });
            console.log(data[k].placeid);

            // infowindow's html code
            var contentString = '<h1 style="color:black; text-align:center;">' + name + '</h1>' +
                 '<p style="color:black; text-align:center;">' + description + '</p>' +
                 '<div class="row">' +
                 '<div class="col-sm-6">' +
                 '<h2 style="color:black; text-align:center;"> 即時影像 </h2>' +
                 '<img class="img-responsive" style="width: 200px ; display:block; margin:auto;" src =' + live_path + '>' + '</div>' +
                 '<div class="col-sm-6">' +
                 '<h2 style="color:black; text-align:center;"> 相關作品 </h2>' +
                 '<img class="img-responsive" style="width: 200px ; display:block; margin:auto;" src =' + your_story_path + '>' + '</div>' +
                 '</div>'
            // set the scene marker
            marker['infowindow'] = new google.maps.InfoWindow({
                content: contentString
            });

            // set scene infowindow

            google.maps.event.addListener(marker, 'click', function() {
                if(typeof show_infowindow != 'undefined'){
                    console.log(typeof show_infowindow)
                    show_infowindow.close();                 
                }
                this['infowindow'].open(map, this);
                show_infowindow = this['infowindow'];
            });

            /*google.maps.event.addListener(marker, 'mouseout', function() {
                this['infowindow'].close();
            });*/
        }
    });
}
function refresh_map(){
    var show_infowindow;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: center,
    });
    var marker = new google.maps.Marker({
        map: map,
        position: center,
    });

    var time_slide = document.getElementById("time_slide").value;
    switch(time_slide){

        case "1":
            for (var k in scene_data) {
                if(scene_data[k].hot.day >= 1){
                    console.log("innnnn1");
                    plot_marker(map, marker, scene_data[k], show_infowindow);
                }
                    
            }
            break;
        case "2":
            for (var k in scene_data) {
                if(scene_data[k].hot.week >= 1){
                    console.log("innnnn2");
                    plot_marker(map, marker, scene_data[k], show_infowindow);
                }
                    
            }
            break;
        case "3":
            for (var k in scene_data) {
                if(scene_data[k].hot.month >= 1){
                    console.log("innnnn3");
                    plot_marker(map, marker, scene_data[k], show_infowindow);
                }
                    
            }
            break;
        case "4":
            console.log(time_slide);
            for (var k in scene_data) {
                if(scene_data[k].hot.year >= 1){
                    console.log("innnnn4");
                    plot_marker(map, marker, scene_data[k], show_infowindow);
                }
                    
            }
            break;
        case "5":
            for (var k in scene_data) {
                if(scene_data[k].hot.total >= 1){
                    console.log("innnnn2");
                    plot_marker(map, marker, scene_data[k], show_infowindow);
                }
                    
            }
            break;
    }
}
