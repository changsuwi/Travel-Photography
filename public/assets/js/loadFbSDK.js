// loads the Facebook javascript SDK
window.fbAsyncInit = function() {
  window.FB.init({
    appId:            '138219450232304',
    autoLogAppEvents: true,
    xfbml:            true, // if there exist fb plugin in the page, then change to true
    version:          'v2.11'
  });
  $(document).trigger('fbload');
};
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/zh_TW/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

