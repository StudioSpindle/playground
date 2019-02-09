/**
 * A module representing video methods
 * @module video
 */
define([], function() {
  const video = {};

  /**
   * start playing the selected <video> element
   * @param videoElementId {string} | the id of the <video> element
   */
  video.play = function(videoElementId) {
    const el = document.getElementById(videoElementId);
    if (typeof(el) != 'undefined' && el != null) {
      el.play();
    }
  };

  return video;
});
