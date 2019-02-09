
/**
 * A module representing the toggler
 * @module toggle
 */
define([], function() {

  const toggle = {};

  /**
   * toggle the visibility and aria-expanded attribute
   * @param el
   */
  const toggle_visibility = function(el) {
    if (el.style.display === 'block') {
      el.style.display = 'none';
      el.setAttribute("aria-expanded", "false");
    } else {
      el.style.display = 'block';
      el.setAttribute("aria-expanded", "true");
    }
  };

  /**
   * toggle element
   * @description Toggles an element. At the moment only one element is supported, using an id stated in the
   *              [data-toggle] attribute field
   * @param attribute {string} should contain the ID of the element to toggle
   */
  toggle.init = function(attribute) {
    const trigger = document.querySelectorAll(`[${attribute}]`);
    if (typeof(trigger) != 'undefined' && trigger.length !== 0) {

      // only supports one trigger element at the moment
      if (trigger.length > 1) {
        console.log('Can only contain one trigger and target element on the page.');
        return;
      }

      const targetName = trigger[0].dataset.toggle;
      const collapsableElement = document.getElementById(targetName);

      trigger[0].addEventListener("click", function() {
        toggle_visibility(collapsableElement);
      });
    }
  };

  return toggle;
});
