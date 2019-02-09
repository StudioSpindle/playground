
requirejs.config({
  basePath: "/js",
  paths: {
    jquery: [
      'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min',
      '/js/lib/jquery/jquery.min'
    ],
    // make async:
    pingdom: [
      'https://rum-static.pingdom.net/pa-5b22f622a42dbb00070002a5',
      '/js/lib/pingdom/pa-5b22f622a42dbb00070002a5.js'
    ],
    video: '../js-modules/video',
    cookie: '../js-modules/cookie',
    toggle: '../js-modules/toggle',
    tagmanager: '../js-modules/tagmanager',
    mailchimp: '../js-modules/mailchimp',
    search: '../js-modules/search',
    tableOfContents: '../js-modules/tableOfContents'
  }
});
