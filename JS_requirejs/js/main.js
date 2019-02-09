
require([
  'video',
  'cookie',
  'toggle',
  'tagmanager',
  'mailchimp',
  'search',
  'tableOfContents',
], function(
    video,
    cookie,
    toggle,
    tagmanager,
    mailchimp,
    search,
    tableOfContents,
){

  "use strict";

  /**
   * Cookie handler (based on cookie bar ID)
   */
  cookie.init('cookie-notification');

  /**
   * Send form submission data to mailchimp
   */
  // TODO: only load this init on contact/index and workshop/index
  mailchimp.init();

  /**
   * Play the video on the homepage
   */
  // TODO: limit the loading of video script to only the homepage
  video.play('js-video-homepage');

  /**
   * Search
   */
  search.init();

  /**
   * Make elements on the page collapse
   */
  toggle.init('data-toggle');

  /**
   * Initialize the tagmanager
   */
  tagmanager.init('GTM-K6DMN8N');

  /**
   * Initialize  the table of contents
   */
  tableOfContents.init('toc');
});
