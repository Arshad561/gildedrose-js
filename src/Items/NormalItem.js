const { Item } = require('../gilded_rose.js');
const { QUALITY_CHANGE_RATE } = require('../config/quality-degrade-config.js');

class NormalItem extends Item {
  updateItemByEOD() {
    // At the end of each day system lowers or increase quality by qualityDegNum or 2 * qualityDegNum 
    // depending upon the item type and sellIn date has passed or not
    this.quality = this._calcualteQuality();
    // At the end of each day system lowers sellIn by 1
    this.sellIn -= 1;
    return this;
  }

  // this is private method, dont try to access this method outside of the class
  _calcualteQuality() {
    let qualityNum = QUALITY_CHANGE_RATE;
    // Once the sell by date has passed, Quality degrades or increases twice as fast
    if (this.sellIn <= 0) {
      qualityNum = 2 * qualityNum;
    }
    let quality = this._reduceOrIncreaseQuality(qualityNum);
    // quality never be negative, if it is negative set quality as 0
    // quality never be more than 50, if it is more than 50 set quality as 50
    if (quality < 0) {
      quality = 0
    } else if (quality > 50) {
      quality = 50;
    }
    return quality;
  }

  // this is private method, dont try to access this method outside of the class
  _reduceOrIncreaseQuality(qualityNum) {
    // for normal item quality has to be reduced at the EOD
    return this.quality - qualityNum;
  }
}

module.exports = NormalItem;
