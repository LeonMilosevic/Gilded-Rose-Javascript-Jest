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

  // this method will take the current item, and it will add the appropriate number of quality
  incrementQualityByNumber(quality, number) {
    // update quality that is less then 50
    if (quality < 50) {
      return quality + number;
    }
  }
  // this method will take the current item, and decrement the appropriate number of quality
  decrementQualityByNumber(quality, number) {
    // if the number goes bellow 0, we just return 0
    return Math.max(0, quality - number);
  }
  // this method will decrement sellIn value by 1
  decrementSellInValue(sellIn) {
    return sellIn - 1;
  }

  /**
   * Methods for each item
   */

  // Backstage passes
  // will receive an item parameter
  backstagePassesMethod(item) {
    // we decrement the sellin value by assigning the return value of decrementSellInValue method
    item.sellIn = this.decrementSellInValue(item.sellIn);
    // we enter the switch statement and perform updates based on sellIn
    // note: if the sellIn is 0, we assign 0 quality.
    //       if the sellin is less than 6 we increment the quality by 3
    //       if the sellin is less than 11 we increment the quality by 2
    //       if the sellin is higher than 11 we increment the quality by 1
    switch (true) {
      case item.sellIn < 0:
        item.quality = 0;
        break;
      case item.sellIn < 6:
        item.quality = this.incrementQualityByNumber(item.quality, 3);
        break;
      case item.sellIn < 11:
        item.quality = this.incrementQualityByNumber(item.quality, 2);
        break;
      default:
        item.quality = this.incrementQualityByNumber(item.quality, 1);
        break;
    }
  }

  // Aged Brie
  // will receive item parameter
  agedBrieMethod(item) {
    // we decrement the sellin value by assigning the return value of decrementSellInValue method
    item.sellIn = this.decrementSellInValue(item.sellIn);
    // we enter the switch statement and perform updates based on sellIn
    // note: if the sellin is less than 0 we increase the quality by 2, max 50
    //       if the sellin is above 0 we increase the quality by 1
    switch (true) {
      case item.sellIn < 0:
        item.quality = this.incrementQualityByNumber(item.quality, 2);
        break;
      default:
        item.quality = this.incrementQualityByNumber(item.quality, 1);
        break;
    }
  }

  // Sulfuras, Legendary items
  // will recieve item parameter
  sulfurasMethod(item) {
    // note: we assign static values to legendary items since all legendary items have 80 quality and cannot expire
    item.quality = 80;
    item.sellIn = 0;
    return item;
  }
  // standard items
  // will recieve item parameter
  standardItemsMethod(item) {
    // we decrement the sellin value by assigning the return value of decrementSellInValue method
    item.sellIn = this.decrementSellInValue(item.sellIn);
    // note: if the sellin is less than 0 we decrease the quality by 2
    //       if the sellin is above 0 we decrease the quality by 1
    switch (true) {
      case item.sellIn < 0:
        item.quality = this.decrementQualityByNumber(item.quality, 2);
        break;
      default:
        item.quality = this.decrementQualityByNumber(item.quality, 1);
        break;
    }
  }
  conjuredItemsMethod(item) {
    // we decrement the sellin value by assigning the return value of decrementSellInValue method
    item.sellIn = this.decrementSellInValue(item.sellIn);
    // note: if the sellin is less than 0 we decrease the quality by 2
    //       if the sellin is above 0 we decrease the quality by 1
    switch (true) {
      case item.sellIn < 0:
        item.quality = this.decrementQualityByNumber(item.quality, 4);
        break;
      default:
        item.quality = this.decrementQualityByNumber(item.quality, 2);
        break;
    }
  }
  // we pass in the item.name to the switch statement and perform the checks, and we call the methods based on checks
  updatedQuality() {
    this.items.forEach((item) => {
      switch (item.name) {
        case "Backstage passes to a TAFKAL80ETC concert":
          this.backstagePassesMethod(item);
          break;
        case "Aged Brie":
          this.agedBrieMethod(item);
          break;
        case "Sulfuras, Hand of Ragnaros":
          this.sulfurasMethod(item);
          break;
        case "Conjured":
          console.log(item.name.startsWith("Conjured"));
          this.conjuredItemsMethod(item);
          break;
        default:
          this.standardItemsMethod(item);
          break;
      }
    });
    return this.items;
  }

  /* legacy code */
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

  // updateQuality() {
  //   // starting a loop to update quality of an item
  //   for (let i = 0; i < this.items.length; i++) {
  //     // check if the item is not Aged Brie (AB) and Backstage Passess(BP)
  //     if (
  //       this.items[i].name != "Aged Brie" &&
  //       this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
  //     ) {
  //       // if the item is not AB and BP then we check if the quality of an item is above 0
  //       if (this.items[i].quality > 0) {
  //         // if the quality of an item is above 0 and if the item name is not Sulfuras
  //         if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
  //           // then we decrease the quality of the item by -1.
  //           this.items[i].quality = this.items[i].quality - 1;
  //         }
  //       }
  //     }
  //     // now we know the item is AB and BP
  //     else {
  //       // if the quality of aged brie and backstage passes is below 50, that means AB and BP cannnot be more than 49
  //       if (this.items[i].quality < 50) {
  //         // we update the quality of AB and BP by +1
  //         this.items[i].quality = this.items[i].quality + 1;
  //         // after the quality update, we check if the name is BP
  //         if (
  //           this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
  //         ) {
  //           // it is, and here we check if there is less then 11 days left for the concert
  //           if (this.items[i].sellIn < 11) {
  //             // there is less then 11 days left until the concert, and we check again if the quality is under 50, max 49
  //             if (this.items[i].quality < 50) {
  //               // the quality is under 50, so we update +1, in total we updated +2 for BP.
  //               this.items[i].quality = this.items[i].quality + 1;
  //             }
  //           }
  //           // if there is 6 days left before the concert
  //           if (this.items[i].sellIn < 6) {
  //             // if the BP quality is less then 50, we check again
  //             if (this.items[i].quality < 50) {
  //               // we increase the quality +1, total +3? not sure
  //               this.items[i].quality = this.items[i].quality + 1;
  //             }
  //           }
  //         }
  //       }
  //     }
  //     // we check if the item is not Sulfuras,
  //     if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
  //       // item is not sulfuras so we decreas the days left
  //       this.items[i].sellIn = this.items[i].sellIn - 1;
  //     }
  //     // if the days left of the item is less than 0,
  //     if (this.items[i].sellIn < 0) {
  //       // if the item name is not Aged Brie or
  //       if (this.items[i].name != "Aged Brie") {
  //         // if item name is not Backstage Passes
  //         if (
  //           this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
  //         ) {
  //           // here we know its not AB OR BP, and we check if quality is bigger then 0
  //           if (this.items[i].quality > 0) {
  //             // and the name of the item is not Sulfuras,
  //             if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
  //               // if the days are less then 0 we decreas the quality of items that are not AB or BP or Sulfuras by -1. now -2.
  //               this.items[i].quality = this.items[i].quality - 1;
  //             }
  //           }
  //         } else {
  //           // so the name is BP, and if the sellIn days reach to < 0, we decreas the whole quality, it becomes 0.
  //           this.items[i].quality =
  //             this.items[i].quality - this.items[i].quality;
  //         }
  //       } else {
  //         // so the name is AB, and if the quality is less then 50,
  //         if (this.items[i].quality < 50) {
  //           // we updated the quality of AB +1, total +2? not sure / UPDATE: if the date is below 0, value goes +2 for AB
  //           this.items[i].quality = this.items[i].quality + 1;
  //         }
  //       }
  //     }
  //   }

  //   return this.items;
  // }
}

module.exports = {
  Item,
  Shop,
};
