const NormalItem = require('../Items/NormalItem.js');
const { QUALITY_CHANGE_RATE : qualityNum } = require('../config/quality-degrade-config.js');

class BackstagePass extends NormalItem {
  // this is private method, dont try to access this method outside of the class
  _reduceOrIncreaseQuality() {
    let quality;
    // Backstage Passes actually increases in Quality the older it gets
    if (this.sellIn <= 0) {
      // quality drops to 0 after the concert
      quality = 0;
    } else if (this.sellIn <= 5) {
      // quality increases by 3 when there are 5 days or less
      quality = this.quality + 3;
    } else if (this.sellIn <= 10) {
      // quality increases by 2 when there are 10 days or less
      quality = this.quality + 2;
    } else {
      quality = this.quality + qualityNum;
    }
    return quality;
  }
}

module.exports = BackstagePass;
