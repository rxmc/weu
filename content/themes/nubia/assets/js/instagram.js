$(document).ready(function() {

  'use strict';

  // ==============================================================================================
  // Instagram Feed
  // Get your userId and accessToken from the following URLs, then replace the new values with the
  // the current ones.
  // userId: https://smashballoon.com/instagram-feed/find-instagram-user-id/
  // accessToken: http://instagram.pixelunion.net/
  // ==============================================================================================

  var instagramFeed = new Instafeed({
    get: 'user',
    limit: 6,
    resolution: 'thumbnail',
    userId: '8095597687',
    accessToken: '8095597687.1677ed0.bffe813a59294021a18966cce14f77d9',
    template:
      '<div class="c-widget-instagram__item"><a href="{{link}}" title="{{caption}}" aria-label="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}"></a></div>'
  });

  if ($('#instafeed').length) {
    instagramFeed.run();
  }
});
