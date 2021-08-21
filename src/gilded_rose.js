class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    let updatedItems = this.items.map(item => item.updateItemByEOD());
    return updatedItems;
  }
}

module.exports = {
  Item,
  Shop
};
