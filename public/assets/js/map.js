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
        zoom: 14,
        center: center,
    });
    var marker = new google.maps.Marker({
        map: map,
        position: center,
    });

    // get data from server
    get_json("ajax_data", function(data) {
        
        // decode json

        for (var k in data) {
            var placeid = data[k].placeid;
            var name = data[k].name;
            var hot = data[k].hot;
            var lat = data[k].lat;
            var lng = data[k].lng;
            var description = data[k].description;
            var point = new google.maps.LatLng(lat, lng);
            var marker = new google.maps.Marker({
                map: map,
                position: point,
                title: name,
                icon: icon_image
            });
            console.log(data[k].placeid);

            // infowindow's html code
            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1>' + name + '</h1>' +
                '<p>' + description + '</p>' +
                '</div>';
            // set the scene marker
            marker['infowindow'] = new google.maps.InfoWindow({
                content: contentString
            });

            // set scene infowindow

            google.maps.event.addListener(marker, 'mouseover', function() {
                this['infowindow'].open(map, this);
            });

            google.maps.event.addListener(marker, 'mouseout', function() {
                this['infowindow'].close();
            });
        }


    });

}
