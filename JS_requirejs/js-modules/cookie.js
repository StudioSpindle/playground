
/**
 * Cookie Handling
 * @module cookie
 */
define([], function() {

  /**
   * setCookie
   * @param cname
   * @param cvalue
   * @param exdays
   * @private
   */
  const setCookie = function(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  /**
   * getCookie
   * @param cname
   * @returns {*}
   * @private
   */
  const getCookie = function(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return false;
  };

  /**
   * set object for methods
   * @type {{}}
   */
  const cookies = {};

  /**
   * Starts the cookie process
   * @param id {string} | element id of the cookie bar
   */
  cookies.init = function(id) {
    const cookieBar = document.getElementById(id);
    const cookieCloseButton = cookieBar.querySelector('#js-cookie-button');

    /** show cookie notification if no consent has been given */
    if(getCookie("cookieConsent") === false) {
      cookieBar.style.display = 'flex';
    }

    /**
     * Set cookies and close bar by clicking 'accept & close'
     * @type {HTMLElement}
     */
    cookieCloseButton.addEventListener("click", function() {
      cookieBar.style.display = 'none';
      setCookie("cookieConsent", true, 100);
    }, false);
  };

  return cookies;
});
