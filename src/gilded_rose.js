class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  /**
   * Specifics:
   *  Quality - except for Sulfuras, item.quality is max 50, lowest 0.
   *  Sellin - except for Sulfuras it decreases by -1 every day.
   *  Sulfuras - Legendery weapon, quality is always 80
   *
   * Description of the functionality:
   *  Aged Brie = AB, Backstage Passes = BP
   *  If the item is not AB or BP or Sulfuras, the quality decreases by 1 each day. If the item has 0 sellIn left, the quality goes down by -2.
   *  if the item is BP and sellIn is > 10, we increase the quality +1, if sellIn < 10, we increase +2, if sellIn < 5, we increase + 3, if sellIn === 0, quality = 0.
   *  If the item is AB the quality each day is +1. max 50.
   *
   */

  updateQuality() {
    // starting a loop to update quality of an item
    for (let i = 0; i < this.items.length; i++) {
      // check if the item is not Aged Brie (AB) and Backstage Passess(BP)
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        // if the item is not AB and BP then we check if the quality of an item is above 0
        if (this.items[i].quality > 0) {
          // if the quality of an item is above 0 and if the item name is not Sulfuras
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            // then we decrease the quality of the item by -1.
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      }
      // now we know the item is AB and BP
      else {
        // if the quality of aged brie and backstage passes is below 50, that means AB and BP cannnot be more than 49
        if (this.items[i].quality < 50) {
          // we update the quality by +1
          this.items[i].quality = this.items[i].quality + 1;
          // after the quality update, we check if the name is BP
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            // it is, and here we check if there is less then 11 days left for the concert
            if (this.items[i].sellIn < 11) {
              // there is less then 11 days left until the concert, and we check again if the quality is under 50, max 49
              if (this.items[i].quality < 50) {
                // the quality is under 50, so we update +1, in total we updated +2 for BP.
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            // if there is 6 days left before the concert
            if (this.items[i].sellIn < 6) {
              // if the BP quality is less then 50, we check again
              if (this.items[i].quality < 50) {
                // we increase the quality +1, total +3? not sure
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      // we check if the item is not Sulfuras,
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        // item is not sulfuras so we decreas the days left
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      // if the days left of the item is less than 0,
      if (this.items[i].sellIn < 0) {
        // if the item name is not Aged Brie or
        if (this.items[i].name != "Aged Brie") {
          // if item name is not Backstage Passes
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            // here we know its not AB OR BP, and we check if quality is bigger then 0
            if (this.items[i].quality > 0) {
              // and the name of the item is not Sulfuras,
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                // if the days are less then 0 we decreas the quality of items that are not AB or BP or Sulfuras by -1. now -2.
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            // so the name is BP, and if the sellIn days reach to < 0, we decreas the whole quality, it becomes 0.
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          // so the name is AB, and if the quality is less then 50,
          if (this.items[i].quality < 50) {
            // we updated the quality of AB +1, total +2? not sure
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
