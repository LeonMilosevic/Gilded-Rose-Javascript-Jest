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
  });
});
