
$(document).ready(function () {
        // Menu.
    var $menu = $('#menu');
    var $body = $('body');

    $menu.wrapInner('<div class="inner"></div>');

    $menu._locked = false;

    $menu._lock = function() {

        if ($menu._locked)
            return false;

        $menu._locked = true;

        window.setTimeout(function() {
            $menu._locked = false;
        }, 350);

        return true;

    };

    $menu._show = function() {

        if ($menu._lock())
            $body.addClass('is-menu-visible');

    };

    $menu._hide = function() {

        if ($menu._lock())
            $body.removeClass('is-menu-visible');

    };

    $menu._toggle = function() {

        if ($menu._lock())
            $body.toggleClass('is-menu-visible');

    };

    $menu
        .appendTo($body)
        .on('click', function(event) {
            event.stopPropagation();
        })
        .on('click', 'a', function(event) {

            var href = $(this).attr('href');

            event.preventDefault();
            event.stopPropagation();

            // Hide.
                $menu._hide();

            // Redirect.
                if (href == '#menu')
                    return;

                window.setTimeout(function() {
                    window.location.href = href;
                }, 350);

        })
        .append('<a class="close" href="#menu">Close</a>');

    $body
        .on('click', 'a[href="#menu"]', function(event) {

            event.stopPropagation();
            event.preventDefault();

            // Toggle.
                $menu._toggle();

        })
        .on('click', function(event) {

            // Hide.
                $menu._hide();

        })
        .on('keydown', function(event) {

            // Hide on escape.
                if (event.keyCode == 27)
                    $menu._hide();

        });

//----- Testimonial Start ------

    $("#testimonial").owlCarousel({
        items: 1,
        loop:true,
        autoplay: true,
        navText: ["<i class='fa fa-angle-right'></i>","<i class='fa fa-angle-left'></i>"],
        center: true,
        margin: 0,
        nav: true,
        dots: false,
        autoHeight: true
    });

//----- Header Slide Start ------

    $("#header_slide").owlCarousel({
        items: 1,
        loop:true,
        autoplay: true
    });

});

//----- Popup Start ------

$('.inline-popup').magnificPopup({
  type:'inline',
  midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  gallery:{
  enabled:true
  }
});

$("#show").click(function(){
        $("#dc").show();
    });
/*$('.grid').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: 200
});
*/

//照片元素
$(window).load(function(){
var $this=$('.img-responsive').exifLoad(function(){
var make=$this.exif("Make");
var model=$this.exif("Model");
var t=$this.exif("ExposureTime");
var f=$this.exif("FNumber");
var length=$this.exif("FocalLength");
var iso=$this.exif("ISOSpeedRatings");
var ev=$this.exif("ExposureBias");
var soft=$this.exif("Software");
var date=$this.exif("DateTime");
var dpi=$this.exif("XResolution");
var sa=$this.exif("Saturation");
var sha=$this.exif("Sharpness");
var wb=$this.exif("WhiteBalance");

if(t<1){
t="1/"+Math.round(1/t);
}else{
t=t+"秒";
}
var evnum = new Number(ev);
ev=evnum.toFixed(1);

var showExit= "相機："+make+" "+"型號："+model+"<br>"+
　"快門："+t+" ("+$this.exif("ExposureTime")+"sec)"+"光圈：F"+f+"<br>"+
　"ISO："+iso+" "+"焦段："+length+"mm<br>"+
  "飽和度："+sa+" "+ "日期："+date;

$(".exif-data").html(showExit.replace(new RegExp(String.fromCharCode(0), "g"), ''));
// alert("完整Exif資料：\r\n \r\n"+$this.exifPretty());
});
});