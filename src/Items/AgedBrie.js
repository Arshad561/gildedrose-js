const NormalItem = require('./NormalItem.js');

class AgedBrie extends NormalItem {
  // this is private method, dont try to access this method outside of the class
  _reduceOrIncreaseQuality(qualityNum) {
    // Aged Brie actually increases in Quality the older it gets
    return this.quality + qualityNum;
  }
}

module.exports = AgedBrie;