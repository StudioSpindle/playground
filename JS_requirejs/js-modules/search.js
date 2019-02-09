/**
 * Search
 * @module search
 */
define([], function() {

  const search = {};

  search.init = function() {

    if(queryString !== null && queryString !== ""){
      loadResults(queryString);
      // if there is a searchbox present, add the query to the searchbox
      const searchBox = document.getElementById('search-knowledgebase');
      if(searchBox.length !== -1){
        searchBox.value = decodeURIComponent((queryString+'').replace(/\+/g, '%20'))
      }
    }

  };

  /**
   * getParameterByName
   * @desc get the query param by name
   * @param name
   * @returns {*}
   */
  const getParameterByName = function(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(window.location.href);
    if (!results){
      return null;
    }
    if (!results[2]){
      return "";
    }
    return decodeURIComponent(results[2].replace("/\+/g", " "));
  };

  /**
   * queryString
   * @type {*}
   */
  const queryString = getParameterByName("search");

  /**
   * loadResults
   * @desc Load the results via Google API
   * @param i
   */
  const loadResults = function(i) {

    var searchBox                  = document.getElementsByClassName("searchBox")[0],
        articleSectionName         = "ol",
        noResultsElementClassName  = "jsNoSearchResults",
        GoogleApiKey               = "AIzaSyCV4SC6uTz7bzYu1TmM_3iq2smlvbJOVLg",
        GoogleSearchId             = "008702682383656025817:4lkjxykfngo";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      // if status = 4 or 200 exec.
      if (this.readyState === 4 && this.status === 200) {
        // declare newbox and the result
        var newBox;
        // load JSON
        var items = JSON.parse(this.responseText).items;
        var noResultsElement = document.getElementsByClassName(noResultsElementClassName)[0];
        var hasResults = typeof(items) !== "undefined";

        // when results are present
        if (hasResults) {
          // if the no results  element exists and if it has the display property set to '', hide it
          if (noResultsElement) {
            noResultsElement.style.display = 'none';
          }
          // loop over items
          items.forEach(function (element) {
            // clone the searchbox;
            newBox = searchBox.cloneNode(true);
            // remove display = none
            newBox.style.display = "block";
            // Set the title with URL
            newBox
                .getElementsByClassName("title")[0]
                .innerHTML = "<a href=\"" + element.link + "\" target=\"_self\">" + element.htmlTitle + "</a>";
            // set the inner HTML snippet
            newBox.getElementsByClassName("resultHTML")[0]
                .innerHTML = element.htmlSnippet;
            // append the box to the article
            document.getElementsByTagName(articleSectionName)[0].appendChild(newBox);
          });
          // when no results are present show the 'no results' div
        } else {
          // if element exists and if it has the display property set to none, show it
          if (noResultsElement && noResultsElement.style.display === 'none') {
            noResultsElement.style.display = 'block';
          }
        }
      }
    };
    // open the URL
    xhttp
        .open("GET", "https://www.googleapis.com/customsearch/v1?key=" + GoogleApiKey + "&cx= " + GoogleSearchId + "&q=" + i, true);
    // send the request
    xhttp
        .send();
  };

  return search;

});
