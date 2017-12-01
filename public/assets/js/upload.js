!function(t){var r="1.5.3",n={};t.vmodel={},t.vmodel.api=new function(){this.obj_sort=function(r){var n=[],e=0;t.each(r,function(t,r){n[e++]=t}),n.sort();var o={};return t.each(n,function(t,n){o[n]=r[n]}),o},this.each_autoload=function(r,n){return r?(t.each(r,function(r,e){return"function"!=t.type(n[e])?(local.msg_error(e,"不存在。"),!1):void n[e]()}),!0):!1},this.is_trigger_autoload=function(r,n){try{if(!n)throw"須要指定方法名稱陣列";if("array"!=t.type(n))throw"is_trigger_autoload() 代入的方法名稱必須要是陣列";{t.vmodel.api.each_autoload(n,r)}return!0}catch(e){return console.log(e),!1}},this.get_autoload_funame=function(r){var n=[],e=t.type(r.autoload);try{if("array"==e)n=r.autoload;else{if("function"!=e)throw r.vname+" 的 autoload 須要是陣列或 function。";if(res=r.autoload(),"array"!=t.type(res))throw r.vname+" 的 get_autoload_funame() 最終需要得到的型態應該是陣列。";n=res}return n}catch(o){return console.log(o),!1}}},t.vmodel.version=function(){return r},t.vmodel.end=function(r,n){var e=this;this.param_match=function(r,n){var e=[];if("function"==t.type(r)){var o=t.vmodel.get();e=[o,r]}else{var a={};t.each(r,function(r,n){a[n]=t.vmodel.get(n)}),e=[a,n]}return e};var o=e.param_match(r,n),a=o[0],i=o[1];r=n=null;var l=setInterval(function(){var r=!0;t.each(a,function(n,e){var o=t.vmodel.history(e.vname);return 0==o?(r=!1,!0):void(r=!0)}),r&&(i(a),clearInterval(l))},0)},t.vmodel.history=function(r){var n=!1,e=t.vmodel.get(r),o=e.root.attr("data-vmodel-history");if(!o)return!1;var a=t.parseJSON(o);return t.each(a,function(t,e){return e.vname!=r?!0:(n=e,!1)}),n},t.vmodel.get=function(r,e,o){var a=this;this.chk_trigger_callback=function(r){var n=!0;return t.each(r.fun_struct,function(t,r){return 0==r?(n=!1,!1):void 0}),0==n?!1:!0},this.display_attr=function(r,n){var e=new Date,o=[{vname:r,status:!0,timestamp:Date.parse(e)+"."+e.getMilliseconds()}],a=n.root.attr("data-vmodel-history");if(a){var i=t.parseJSON(a);i.push(o[0]),o=i}var l=JSON.stringify(o);n.root.attr("data-vmodel-history",l)},this.param_match=function(r,n,e){var o=[],a=t.type(r);return r?"string"==a&&(o=[r,n,e]):o=[r,null,null],o};var i=a.param_match(r,e,o),r=i[0],l=i[1],u=i[2];if(i=e=o=null,!r)return t.vmodel.api.obj_sort(n);var c=n[r];if(!c)return console.log("呼叫的倉儲名稱 "+r+" 不存在。"),!1;if("boolean"==t.type(l)&&1==l){var s=t.vmodel.api.get_autoload_funame(c),f=(t.vmodel.api.is_trigger_autoload(c,s),t.type(u));if("function"==f||"boolean"==f&&1==u){"function"==f&&(c.vmodel_get_callback=function(){u(c)});var v=setInterval(function(){if(1==a.chk_trigger_callback(c)){if(clearInterval(v),a.display_attr(r,c),"boolean"==f)return!0;c.vmodel_get_callback()}},20);return!0}}return n[r]},t.vmodel["delete"]=function(t){return t||""==t?n[t]&&delete n[t]:n={},this},t.fn.vmodel=function(r,e,o){local=this;var a=local.selector;return this.remove_sign=function(t){return"--"==t.substring(0,2)?t.substring(2):t},this.msg_error=function(t,r){console.log("錯誤：『"+a+"』呼叫的 function 『"+t+"』："+r)},this.define_autoload_struct=function(r,n){t.each(n,function(t,n){r.fun_struct[n]=!1})},this.ext_expend=function(r,n){var e=null!=n?n:null;return t.extend(r,{vname:e,selector:a,root:t(local),fun_struct:{},struct:function(n,e){if("boolean"==t.type(e)||e||(e=!0),"string"==t.type(n)){if("boolean"!=t.type(r.fun_struct[n]))return console.log("找不到名稱為 "+n+"的建構狀態"),!1;r.fun_struct[n]=e}else{if("array"!=t.type(n))return console.log("建構名稱須要指定"),!1;t.each(n,function(t,n){r.fun_struct[n]=e})}return!0}}),r},this.param_match=function(r,n,e){var o=null,a=null,i=null;return"string"==t.type(r)?(o=local.remove_sign(r),"boolean"==t.type(n)?(a=n,i=new e):i=new n):i=new r,[o,a,i]},this.put_storage=function(t,r){if(null!=t){if(n[t])return console.log("倉儲名稱『"+t+"』重複。"),!1;n[t]=r}},this.main=function(r,n,e){var o=local.param_match(r,n,e),a=o[0],i=o[1],l=o[2];r=n=e=null;var l=local.ext_expend(l,a),u=t.vmodel.api.get_autoload_funame(l);if(local.define_autoload_struct(l,u),i===!0){var c=t.vmodel.api.is_trigger_autoload(l,u);c===!1&&local.msg_error("is_trigger_autoload","發生錯誤")}return local.put_storage(a,l),this},local.main(r,e,o)}}(jQuery);

//======

$(function (){
    // 建立一個模組叫做 preview，根節點為 .form1
    $(".photospreview").vmodel("--preview", true, function (){

        var vs = this;

        // 自動讀取的方法
        this.autoload = ['change_file'];

        // 連續的圖片編碼
        this.imgcode = '';

        // 選取發生改變
        this.change_file = function (){
            vs.root.on("change", ".upl", function (){
                local_show(this);
            });
        }

        // 批次圖片，先清空後再插入
        var local_show = function (input){
            if (input.files && input.files[0]) {
                local_clean();
                local_each_img(input.files);
            }
        }

        // 批次讀取，最後再一次寫入
        var local_each_img = function (files){

            $.each(files, function (index, file){
                var src = URL.createObjectURL(file);
                local_create_imgcode(index, src);
            });

            // 放置預覽元素後重設
            vs.root.find(".preview").html(vs.imgcode);
        }

        // 建立圖片
        var local_create_imgcode = function(key, src, callback){
            vs.imgcode += '<img class="img-responsive" src="' + src + '">';
            if (callback) callback();
        }

        // 清空預覽區域
        var local_clean = function (){
            vs.root.find(".preview").empty();
        }

        // 還原 input[type=file]
      

    });
})

// 獲取座標
// var x=document.getElementById("demo");
// function getLocation()
//   {
//   if (navigator.geolocation)
//     {
//     navigator.geolocation.watchPosition(showPosition);
//     }
//   else{x.innerHTML="Geolocation is not supported by this browser.";}
//   }
// function showPosition(position)
//   {
//   x.innerHTML="Latitude: " + position.coords.latitude + 
//   "<br />Longitude: " + position.coords.longitude;  
//   }
 //獲取座標結束
 
 //地圖
var x=document.getElementById("demo");
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }

function showPosition(position)
  {
  lat=position.coords.latitude;
  lon=position.coords.longitude;
  latlon=new google.maps.LatLng(lat, lon)
  mapholder=document.getElementById('mapholder')
  mapholder.style.height='250px';
  mapholder.style.width='500px';

  x.innerHTML="Latitude: " + position.coords.latitude + 
  "<br />Longitude: " + position.coords.longitude;  

  var myOptions={
  center:latlon,zoom:14,
  mapTypeId:google.maps.MapTypeId.ROADMAP,
  mapTypeControl:false,
  navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
  };
  var map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
  var marker=new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
  }

function showError(error)
  {
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="An unknown error occurred."
      break;
    }
  }

// $(document).ready(function() {
//     FB.api('/me',{fields: 'id'}, function(response) {
//     var facebookid = response;
//     console.log(response);
//     document.getElementById("userid").innerHTML = "<input type='hidden' class='form-control' name='user' value='" + facebookid + "'>"  
//     });
// });