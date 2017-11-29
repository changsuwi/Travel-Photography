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

// initial the map
function initMap() {
    // set user's center
    var icon_image = './assets/images/icons/camera.png';
    var center = { lat: 25.0894062, lng: 121.8475243 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: center,
    });
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    var show_infowindow
    // get data from server
    get_json("map_initial", function(data) {
        
        // decode json

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
