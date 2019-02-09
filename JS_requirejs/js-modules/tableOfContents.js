/**
 * Table of contents
 * @module tableOfContents
 */
define([], function() {

  const tableOfContents = {};

  /**
   * tableOfContents
   * @param id {string} | Id for the table of contents
   */
  tableOfContents.init = function(id) {
    loopThroughLinks(document.getElementById(id), setLinkCursive);
    loopThroughLinks(document.getElementById(id), setNewTabs);
  };

  /**
   * loopThroughLinks
   * @param list
   * @param callback
   */
  const loopThroughLinks = function(list, callback) {
    if(list != null) {
      const listItems = list.getElementsByTagName("a");
      for (var i = 0; i < listItems.length; i++) {
        callback(listItems[i]);
      }
    }
  };

  /**
   * setLinkCursive
   * @desc sets the link in cursive if it's the current page
   * @param item
   */
  const setLinkCursive = function(item) {
    const currentPageUrl = window.location.origin + window.location.pathname; // removes '#' and query parameters
      if (item.href === currentPageUrl) {
        item.classList.add("current");
      }
  };

  /**
   * setNewTabs
   * @desc sets target '_blank' if link is on same domain
   * @param item
   */
  const setNewTabs = function(item) {
      if (item.hostname !== window.location.hostname) {
        item.target = "_blank";
      }
  };

  return tableOfContents;

});
