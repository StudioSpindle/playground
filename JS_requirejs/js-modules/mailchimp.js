/**
 * Mailchimp
 * @module mailchimp
 * @description sends form information to mailchimp
 */
define(['jquery'], function($) {

  const mailchimp = {};

  mailchimp.init = function() {

    const form = document.getElementById('js-mailchimp');
    if (typeof(form) !== 'undefined' && form !== null) {

      const formTitle = form.dataset.title,
            formElements = form.elements;

      form.addEventListener("submit", function(e) {
        handleForm(e, formElements, formTitle);
      }, false);

    }
  };

  const handleForm = function(e, formElements, formTitle) {

    e.preventDefault();
    hideButton(formElements);

    const formFields = {
      "EMAIL"     : getVal("EMAIL"),
      "NAME"      : getVal("NAME"),
      "PRODUCT"   : getVal("PRODUCT"),
      "MESSAGE"   : getVal("MESSAGE"),
      "TYPE"      : formTitle,
      "RETURN"    : returnTo
    };

    sendData(formFields, function(){
      // sad but true, timeout to guarantee a success
      setTimeout(function(){
        window.location.href = "/thank-you/?response-type=" + t + "&product=" + getVal("PRODUCT");
      }, 1250);
    })
  };

  /**
   * hide the button based on form elements (Nodelist)
   * @param formElements
   */
  const hideButton = function(formElements) {
    for (var i = 0; i < formElements.length; i++) {
      if(formElements[i].getAttribute("type")=== "submit"){
        formElements[i].style.display = "none";
      }
    }
  };

  /**
   * Send the data
   * @param postData
   * @param callback
   */
  const sendData = function(postData, callback) {
    $.ajax({
      type:       "POST",
      url:        "https://us-central1-semi-186012.cloudfunctions.net/mailchimp",
      data:       postData,
      dataType:   "json",
      cache:      false,
      success:    function(response) {
        console.log(response)
      }
    })
    .done(function(){
      callback();
    })
  };

  /**
   * Get the value based on name
   * @param name
   * @returns {*}
   */
  const getVal = function(name){
    var elVal = document.getElementsByName(name);
    if(elVal.length === 0){
      return null
    } else {
      return elVal[0].value
    }
  };

  /**
   *
   * @returns {string}
   */
  const returnTo = function(){
    const protocol = location.protocol,
          slashes = protocol.concat("//");
    return slashes.concat(window.location.hostname + ":" + window.location.port);
  };

  return mailchimp;
});
