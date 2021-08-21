const { Shop, Item } = require("../src/gilded_rose");
const NormalItem = require('../src/Items/NormalItem.js');
const AgedBrie = require('../src/Items/AgedBrie.js');
const Sulfuras = require('../src/Items/Sulfuras.js');
const BackstagePass = require('../src/Items/BackstagePass.js');
const ConjuredItem = require('../src/Items/ConjuredItem.js');

const items = [
  new NormalItem("+5 Dexterity Vest", 10, 20),
  new AgedBrie("Aged Brie", 2, 0),
  new NormalItem("Elixir of the Mongoose", 5, 7),
  new Sulfuras("Sulfuras, Hand of Ragnaros", 0, 80),
  new Sulfuras("Sulfuras, Hand of Ragnaros", -1, 80),
  new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  new ConjuredItem("Conjured Mana Cake", 3, 6),
  new ConjuredItem("Conjured Mana Cake", 0, 6)
];

const days = Number(process.argv[2]) || 1;
const gildedRose = new Shop(items);

for (let day = 0; day < days; day++) {
  console.log(`\n-------- day ${day} --------`);
  console.log("name, sellIn, quality");
  items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
  const updatedItems = gildedRose.updateQuality();
  updatedItems.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
}
