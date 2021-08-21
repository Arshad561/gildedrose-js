const { Item } = require('../gilded_rose.js');

class Sulfuras extends Item {
  updateItemByEOD() {
    // Sulfuras, being a legendary item, never has to be sold or decreases in Quality
    // i.e never alter its sellIn and quality
    return this;
  }
}

module.exports = Sulfuras;