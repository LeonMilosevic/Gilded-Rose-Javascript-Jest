const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  describe("Standard item", function () {
    it("should decrease the sellIn value and quality of the standard item by -1 each day", function () {
      const gildedRose = new Shop([new Item("standard", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(9);
    });
    it("should decrease the quality by -2 as each day goes by and sellIn value is below 0", function () {
      const gildedRose = new Shop([new Item("standard", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(8);
    });
    it("should not have the quality below 0", function () {
      const gildedRose = new Shop([new Item("standard", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
  });

  describe("Aged Brie", function () {
    it("should increase the value by 1 as Aged Brie sellIn value go down && sellIn is not below 0", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 1, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(2);
      expect(items[0].sellIn).toEqual(0);
    });
    it("should increase the value by 2 if Aged Brie sellIn value is below 0", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(2);
      expect(items[0].sellIn).toEqual(-1);
    });
    it("quality should not be above 50", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });
    it("quality should not be above 50", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });
  });

  describe("Sulfuras", function () {
    it("Should never change quality or the sellIn value", function () {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 10, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(80);
      expect(items[0].sellIn).toEqual(10);
    });
  });

  describe("Backstage Passes", function () {
    it("Should increase quality by +1 when sellIn decreases, and sellIn is not bellow 11", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 20, 0),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(1);
      expect(items[0].sellIn).toEqual(19);
    });
    it("Should increase quality by +2 when sellIn decreases, and sellIn is between 6 and 11, 6 < backstage pass < 11", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(2);
      expect(items[0].sellIn).toEqual(9);
    });
    it("Should increase quality by +3 when sellIn decreases, and sellIn is less then 6 but bigger then 0, 0 < backstage pass < 6", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(8);
      expect(items[0].sellIn).toEqual(4);
    });
    it("Quality should be 0 when sellIn is 0", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
  });
});
