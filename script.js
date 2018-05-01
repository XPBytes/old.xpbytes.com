(function() {
  'use strict';

  var onloadSetSrc = function( elem ) {
    var _elem = elem;
    return new function() {
      _elem.src = _elem.dataset.src;
    }
  }

  var startLoad = function( downloadingImage, image ) {
    return new function() {
      downloadingImage.src = image.dataset.src;
    }
  }

  var images = document.getElementsByTagName('img');
  for(var i = 0; i < images.length; i++) {
    var image = images[i];
    if (image.dataset.src)
    {
      var downloadingImage = new Image();
      downloadingImage.onload = onloadSetSrc( image );
      setTimeout( 1, startLoad( downloadingImage, image ) );
    }
  }

})();
