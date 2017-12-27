/**
 * @fileOverview 实例化Scroller所需传递的类结构
 * @constructor
 */

function Provider() {}

Provider.prototype = {
  /**
   * Fetch more items from the data source. This should try to fetch at least
   * count items but may fetch more as desired. Subsequent calls to fetch should
   * fetch items following the last successful fetch.
   * @param {number} count The minimum number of items to fetch for display.
   * @param {function(Array<Object>)} callback
   *     with an array of items.
   */
  fetch: function(count, callback) {},

  /**
   * Create a tombstone element. All tombstone elements should be identical
   * @return {Element} A tombstone element to be displayed when item data is not
   *     yet available for the scrolled position.
   */
  createTombstone: function() {},

  /**
   * Render an item, re-using the provided item div if passed in.
   * @param {Object} item The item description from the array returned by fetch.
   * @param {?Element} div If provided, this is a previously displayed
   *     element which should be recycled for the new item to display.
   * @return {Element} The constructed element to be displayed in the scroller.
   */
  render: function(item, div) {},
};

export default Provider;