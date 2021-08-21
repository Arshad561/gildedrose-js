const NormalItem = require('../Items/NormalItem.js');

class ConjuredItem extends NormalItem {
  // this is private method, dont try to access this method outside of the class
  _reduceOrIncreaseQuality(qualityNum) {
    // Conjured items degrade in Quality twice as fast as normal items
    return this.quality - 2 * qualityNum;
  }
}

module.exports = ConjuredItem;
