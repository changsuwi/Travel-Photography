
var currentImgDataLive;
var currentImgDataGallery;

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

var count = 2;
function check_open(map, marker){
    count--;
    if(count == 0){

    }
}
// google map global varable
var scene_data;
var icon_image = './assets/images/icons/camera.png';
var center = { lat: 25.0894062, lng: 121.8475243 };
var show_infowindow;
var opened_marker = [];
function append_image(data,mod, callback){
    for (var k in data) {
        console.log(k);
        console.log(data[k]);
        if(mod == 0){
            $('#images-live').append(
              '<a href="#location-details-photoview" class="inline-popup">' +
                  '<img alt="Title 1" src=' + data[k].compresspath + ' onclick="setPhotoviewLive(' + k + ')">' +
              '</a>'
            );
            
        }
        else{
             $('#images-gallery').append(
                '<a href="#location-details-photoview" class="inline-popup">' +
                     '<img alt="Title 1" src=' + data[k].compresspath + ' onclick="setPhotoviewGallery(' + k + ')">' +
                 '</a>'
             );

        }
    }
    callback()
}
// google mpa plot func
function plot_marker(map, marker, data, hot){
    var placeid = data.placeid;
    var name = data.name;
    var lat = data.lat;
    var lng = data.lng;
    var description = data.description;
    var live_path = data.live;
    var your_story_path = data.your_story;
    var size;

    var live_img_load_num = 1;
    var gallery_img_load_num = 1;

    if(hot <1) size = 32;
    else if(hot<3) size = 40;
    else if(hot<10) size = 48;
    else size =56;
    var point = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        map: map,
        position: point,
        title: name,
        icon: {
            url: icon_image,
            scaledSize : new google.maps.Size(size, size),
        }
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
         '<img  class="img-responsive" style="width: 200px ; display:block; margin:auto;" src =' + your_story_path + '>' + '</div>' +
         '</div>' +
         //'<a href="/description.html">description</a> ' +
         '<a href="#location-details" class="inline-popup">details</a>' +

        '<div id="location-details" class="map-popup mfp-hide">' +
            '<div class="container-fluid">' +
                '<div class="pop-up-color" style="background-color:#fff;">' + 
                    '<div class="row" style="background-color:#fff;">' +
                        '<br><br>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-6">' +
                            '<h1 class="popup-head">' + name + '</h1>' +
                            '<h4 class="popup-subhead">地址: 台南市大學路一號</h4>' +
                            '<button class="btn-special" onclick="" style="margin-left: 50px;"><lebel>導航囉</lebel></button>' +
                            '<p class="popup-parapraph">' + description + '</p>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                            '<img src=' + your_story_path + ' class="img-responsive" alt="Responsive image">' +
                        '</div>' +
                        
                        
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-12">' +
                            '<h3 class="popup-head">即時影像</h3>' +
                            '<hr class="popup-hr">' +
                        '</div>' +
                        '<div class="col-md-12">' +
                            '<div id="images-live" class="gallery">' +
                            '</div>' +
                        '</div>' +


                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-12">' +
                            '<h3 class="popup-head">漂亮相片</h3>' +
                            '<hr class="popup-hr">' +
                        '</div>' +
                        '<div class="col-md-12">' +
                            '<div id="images-gallery" class="gallery">' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row" style="background-color:#fff;">' +
                        '<br>' +
                    '</div>' +
                '</div>' +
                
            '</div>' +
        '</div>'


         /*'<div id="location-details" class="white-popup mfp-hide">' +
            '<div class="container-fluid">' +
              '<div class="row">' +
                '<div class="pop-up-color">' +
                  '<div class="col-md-5">' +
                    '<h3 class="popup-head">' + name + '</h4>' +
                    '<p class="popup-parapraph">' + description +'</p>' +
                    '<p class="popup-parapraph">hihihi</p>' +
                  '</div>' +
                  '<div class="col-md-7">' +
                    '<img id="images-live" class="img-responsive" style="width: 200px ; display:block; margin:auto;">' + '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="row">' +
                '<img id="images-gallery" class="img-responsive" style="width: 200px ; display:block; margin:auto;">' + '</div>' +
              '</div>' +
            '</div>' +
         '</div>'*/

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
        marker['infowindow'].open(map, marker);
        show_infowindow = marker['infowindow'];
 
      // load gallery settings
      var open = 0;
      for(i = 0; i<opened_marker.length; i++){
          if(opened_marker[i] == marker.title){
              open = 1;
              break;
          }
      }
      if(open == 0){
          get_json("location_img/" + name + "/Live/" + live_img_load_num, function(data) {
              console.log(data)
              currentImgDataLive = data;
              append_image(data,0, function(){
                  get_json("location_img/" + name + "/Your_Story/" + gallery_img_load_num, function(data) {
                      currentImgDataGallery = data;
                      append_image(data, 1,  function(){
                        $('.inline-popup').magnificPopup({
                          type: 'inline',
                          midClick: true
                          //gallery:{
                          //  enabled:true
                          //}
                        });

                          $(".gallery").justifiedGallery({
                          rowHeight : 200,
                          lastRow : 'nojustify',
                          margins : 3
                          });
                      })
                  });
              })
          });

          opened_marker.push(marker.title)
      }   
           // while the page pops up, loads gallery images
        
            


    });

    google.maps.event.addListener(marker['infowindow'], 'domready', function() {
      /*$('.inline-popup').magnificPopup({
        type: 'inline',
        midClick: true
        //gallery:{
        //  enabled:true
        //}
      });*/
      // location_img/location/gallery or live/img number
      
      // while the page pops up, loads live images
 
     // when the user clicks the button with id="??", loads live images
      /*document.getElementById("??").addEventListener("click", function(){
        get_json("location_img/" + name + "/live/" + live_img_load_num, function(data) {
          for (var k in data) {
            console.log(k);
            console.log(data[k]);
            $('#images-live').attr("src",data[k]);
          }
        });
      });
      // when the user clicks the button with id="??", loads gallery images
      document.getElementById("??").addEventListener("click", function(){
        get_json("location_img/" + name + "/live/" + live_img_load_num, function(data) {
          for (var k in data) {
            console.log(k);
            console.log(data[k]);
            $('#images-live').attr("src",data[k]);
          }
        });
      });*/

    });

}



// initial the map
function initMap() {
    // set user's center
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: center,
    });
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(center);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    var marker = new google.maps.Marker({
        map: map,
        position: center,
    });

    // get data from server
    get_json("map_initial", function(data) {
        
        // decode json
        scene_data = data;
        for (var k in scene_data) {
            hot = scene_data[k].hot.total;
            plot_marker(map, marker, scene_data[k], hot);
        }
    });
}

// when slidebar value is changing, exec this func to refresh markers
function refresh_map(){

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
                    hot = scene_data[k].hot.day;
                    console.log("innnnn1");
                    plot_marker(map, marker, scene_data[k], hot);
                }
                    
            }
            break;
        case "2":
            for (var k in scene_data) {
                if(scene_data[k].hot.week >= 1){
                    console.log("innnnn2");
                    hot = scene_data[k].hot.week;
                    plot_marker(map, marker, scene_data[k], hot);
                }
                    
            }
            break;
        case "3":
            for (var k in scene_data) {
                if(scene_data[k].hot.month >= 1){
                    console.log("innnnn3");
                    hot = scene_data[k].hot.month;
                    plot_marker(map, marker, scene_data[k], hot);
                }
                    
            }
            break;
        case "4":
            console.log(time_slide);
            for (var k in scene_data) {
                if(scene_data[k].hot.year >= 1){
                    console.log("innnnn4");
                    hot = scene_data[k].hot.year;
                    plot_marker(map, marker, scene_data[k], hot);
                }
                    
            }
            break;
        case "5":
            for (var k in scene_data) {
                hot = scene_data[k].hot.total;
                plot_marker(map, marker, scene_data[k], hot);
            }
            break;
    }
}

function setPhotoviewLive(index){
    $('#location-details-photoview').html(
        '<a href="#location-details" class="inline-popup">click me to back</a>' +
        '<img alt="Title 1" src=' + currentImgDataLive[index].path + ' class="img-responsive">'
    );
    $('#location-details-photoview').promise().done(function(){
        $('.inline-popup').magnificPopup({
            type: 'inline',
            midClick: true
            //gallery:{
            //  enabled:true
            //}
        });
    })
    
}

function setPhotoviewGallery(index){
    $('#location-details-photoview').html(
        '<a href="#location-details" class="inline-popup">click me to back</a>' +
        '<img alt="Title 1" src=' + currentImgDataGallery[index].path + ' class="img-responsive">'
    );
    $('#location-details-photoview').promise().done(function(){
        $('.inline-popup').magnificPopup({
            type: 'inline',
            midClick: true
            //gallery:{
            //  enabled:true
            //}
        });
    })
    
}
