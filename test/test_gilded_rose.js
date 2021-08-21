const { expect } = require('chai');
const { Shop, Item } = require('../src/gilded_rose.js');
const NormalItem = require('../src/Items/NormalItem.js');
const AgedBrie = require('../src/Items/AgedBrie.js');
const Sulfuras = require('../src/Items/Sulfuras.js');
const BackstagePass = require('../src/Items/BackstagePass.js');
const ConjuredItem = require('../src/Items/ConjuredItem.js');

describe('Gilded Rose Tests', () => {

  // Test cases for Existing features
  describe('Normal Items Tests', () => {

    it('Should create item', () => {
      const item = new NormalItem('milk', 5, 10);
      expect(item.name).to.exist.and.that.equal('milk');
      expect(item.sellIn).to.exist.and.that.equal(5);
      expect(item.quality).to.exist.and.that.equal(10);
    });

    it('Item sellIn and quality value decreases by 1 at the end of each day', () => {
      const item = new NormalItem('butter', 2, 4);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(1);
      expect(updatedItem.quality).to.equal(3);
    });

    it('item quality never be negative', () => {
      const item = new NormalItem('egg', 1, 0);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(0);
      expect(updatedItem.quality).to.not.lessThan(0);
      expect(updatedItem.quality).to.equal(0);
    });

    it('item quality never be negative even if the sellin day is negative', () => {
      const item = new NormalItem('egg', 0, 0);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(-1);
      expect(updatedItem.quality).to.not.lessThan(0);
      expect(updatedItem.quality).to.equal(0);
    });

    it('Once the item sellIn date has passed, quality degrades twice as fast', () => {
      const item = new NormalItem('kova', 0, 4);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(-1);
      expect(updatedItem.quality).to.equal(2);
    });


    it('Once the item sellIn date has passed, quality degrades twice as fast but it is never negative', () => {
      const item = new NormalItem('cheese', 0, 1);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(-1);
      expect(updatedItem.quality).to.not.lessThan(0);
      expect(updatedItem.quality).to.equal(0);
    });

  });

  describe('Aged Brie Tests', () => {

    it('Aged Brie actually increases in quality the older it gets', () => {
      const item = new AgedBrie('Aged Brie', 2, 0);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(1);
      expect(updatedItem.quality).to.equal(1);
    });

    it('The Quality of Aged Brie is never more than 50', () => {
      const item = new AgedBrie('Aged Brie', 1, 50);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(0);
      expect(updatedItem.quality).to.equal(50);
    });

    it('Once the Aged Brie sellIn date has passed, quality increases twice as fast', () => {
      const item = new AgedBrie('Aged Brie', 0, 3);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(-1);
      expect(updatedItem.quality).to.equal(5);
    });

    it('Once the Aged Brie sellIn date has passed, quality increases twice as fast but is never more than 50', () => {
      const item = new AgedBrie('Aged Brie', -1, 49);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(-2);
      expect(updatedItem.quality).to.equal(50);
    });

  });

  describe('Sulfuras Tests', () => {

    it('Sulfuras sellIn and quality never has to be alters', () => {
      const item = new Sulfuras('Sulfuras, Hand of Ragnaros', 2, 4);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(2);
      expect(updatedItem.quality).to.equal(4);
    });

    it('Sulfuras quality can be more than 50', () => {
      const item = new Sulfuras('Sulfuras, Hand of Ragnaros', 0, 80);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(0);
      expect(updatedItem.quality).to.equal(80);
    });

    it('Sulfuras sellIn never alters even if the sellIn is negative', () => {
      const item = new Sulfuras('Sulfuras, Hand of Ragnaros', -1, 5);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(-1);
      expect(updatedItem.quality).to.equal(5);
    });

  });

  describe('Backstage Passes Tests', () => {

    it('Backstage passes increases in quality as its SellIn value approaches', () => {
      const item = new BackstagePass('Backstage passes to a TAFKAL80ETC concert', 11, 15);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(10);
      expect(updatedItem.quality).to.equal(16);
    });

    it('Backstage passes quality increases by 2 when there are 10 days', () => {
      const item = new BackstagePass('Backstage passes to a TAFKAL80ETC concert', 10, 9);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem).to.exist;
      expect(updatedItem.sellIn).to.equal(9);
      expect(updatedItem.quality).to.equal(11);
    });

    it('Backstage passes quality increases by 2 when there are 10 days or less', () => {
      const item = new BackstagePass('Backstage passes to a TAFKAL80ETC concert', 9, 8);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(8);
      expect(updatedItem.quality).to.equal(10);
    });

    it('Backstage passes quality increases by 3 when there are 5 days', () => {
      const item = new BackstagePass('Backstage passes to a TAFKAL80ETC concert', 5, 7);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(4);
      expect(updatedItem.quality).to.equal(10);
    });

    it('Backstage passes quality increases by 3 when there are 5 days or less', () => {
      const item = new BackstagePass('Backstage passes to a TAFKAL80ETC concert', 4, 7);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(3);
      expect(updatedItem.quality).to.equal(10);
    });

    it('Backstage passes quality nevers increases more than 50', () => {
      const item = new BackstagePass('Backstage passes to a TAFKAL80ETC concert', 3, 48);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(2);
      expect(updatedItem.quality).to.equal(50);
    });
  
    it('Backstage passes quality drops to 0 after the concert', () => {
      const item = new BackstagePass('Backstage passes to a TAFKAL80ETC concert', 0, 7);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(-1);
      expect(updatedItem.quality).to.equal(0);
    });

    it('Backstage passes quality drops to 0 after the concert even if the sellIn is negative', () => {
      const item = new BackstagePass('Backstage passes to a TAFKAL80ETC concert', -2, 7);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(-3);
      expect(updatedItem.quality).to.equal(0);
    });

  });

  // Test cases for new features
  describe('Conjured Items Tests', () => {

    it('Conjured items degrade in Quality twice as fast as normal items', () => {
      const item = new ConjuredItem('Conjured Mana Cake', 2, 3);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(1);
      expect(updatedItem.quality).to.equal(1);
    });

    it('if conjured item sellIn date has passed, quality degrades twice as fast as normal items', () => {
      const item = new ConjuredItem('Conjured Mana Cake', 0, 8);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(-1);
      expect(updatedItem.quality).to.equal(4);
    });

    it('Conjured item quality never be negative', () => {
      const item = new ConjuredItem('Conjured Mana Cake', -1, 3);
      const gildedRose = new Shop([item]);
      const [updatedItem] = gildedRose.updateQuality();
      expect(updatedItem.sellIn).to.equal(-2);
      expect(updatedItem.quality).to.equal(0);
    });

  });

});