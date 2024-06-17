import { DieType, IDice, } from "@krisnorman/rpg-utils";
import { IFooModel } from "./FantasyTreasureGenerator.js";
import { ITableRow, MyTable } from "./MyTable.js";
import '../../../extensions/Extensions.js';
 
export class MonetaryTreasureRepository {
  private readonly monetaryTreasureTable = new MyTable(
    MonetaryTreasureData,
    "Monetary Treasure",
    DieType.d20
  );

  private readonly gemsTable = new MyTable(
    GemsData,
    "Gems",
    DieType.percentile
  );

  private readonly jewelryTable = new MyTable(
    JewelryData,
    "Jewelry",
    DieType.percentile
  );

  private readonly ornamentalStonesTable = new MyTable(
    OrnamentalStonesData,
    "Ornamental Stones",
    DieType.d12
  );
  private readonly semiPreciousStonesTable = new MyTable(
    SemiPreciousStonesData,
    "Semi-Precious Stones",
    DieType.d12
  );
  private readonly fancyStonesTable = new MyTable(
    FancyStonesData,
    "Fancy Stones",
    "d14"
  );
  private readonly gemstonesTable = new MyTable(
    GemStonesData,
    "Gem Stones",
    "d14"
  );

  constructor(private readonly dice: IDice) {
    this.gemsTable.Rows.forEach((row) => (row.TableName = "gemstable"));
    this.jewelryTable.Rows.forEach((row) => (row.TableName = "jewelrytable"));
    this.monetaryTreasureTable.Rows.forEach(
      (row) => (row.TableName = "monetarytreasuretable")
    );
  }

  getRandom(count: number = 1, preRoll?: number): IFooModel[] {
    if (count < 1) count = 1;
    let model: IFooModel[] = [];

    for (let index = 0; index < count; index++) {
      const roll =
        preRoll != undefined
          ? preRoll
          : this.dice.roll(this.monetaryTreasureTable.DieExpression).total;

      const row = this.monetaryTreasureTable.find(roll);

      // You get (20,000+(1d4)(10,000)) copper pieces and (20,000+(1d4+1)(10,000) silver pieces!
      // Roll: 1-2
      if (row.Index === 0) {
        const coppers = this.getCopperPieces();
        model.push(new CoinModel(coppers.Title));
      }

      // You get (5,0000+(5d6)(1,000) electrum pieces!
      // Roll: 3-5
      if (row.Index === 1) {
        const electrums = this.getElectrumPieces();
        model.push(new CoinModel(electrums.Title));
      }

      // You get (3,000+(3d6)(1,000) gold pieces!
      // Roll: 6-10
      if (row.Index === 2) {
        const golds = this.getGoldPieces();
        model.push(new CoinModel(golds.Title));
      }

      // You get (500+(5d4)(100) platinum pieces!
      // Roll: 11-12
      if (row.Index === 3) {
        const platinums = this.getPlatinumPieces();
        model.push(new CoinModel(platinums.Title));
      }

      // Gems, Roll: 13-15
      if (row.Index === 4) {
        const gems = this.getGems();
        model.push(gems);
      }

      // You get 5d10 pieces of jewelry!, Roll: 16-17
      if (row.Index === 5) {
        const jewelry = this.getJewelry();
        model.push(jewelry);
      }

      // Roll twice, Roll: 18
      if (row.Index === 6) {
        model.push(...this.getTwice());
      }

      // Roll thrice, Roll: 19
      if (row.Index === 7) {
        model.push(...this.getThrice());
      }

      // One of each, Roll: 20
      if (row.Index === 8) {
        model.push(this.getCopperPieces());
        model.push(this.getElectrumPieces());
        model.push(this.getGoldPieces());
        model.push(this.getPlatinumPieces());
        model.push(this.getGems());
        model.push(this.getJewelry());
      }
    }

    return model;
  }

  private getRoll(expression: string): number {
    return this.dice.roll(expression).total;
  }

  private getCopperPieces(): IFooModel {
    const copperPieces =
      this.getRoll("20000+1d4*10000").toLocaleString("en-US");
    const silverPieces = this.getRoll("20000+{1d4+1}*10000").toLocaleString(
      "en-US"
    );

    const title =
      `You get ${copperPieces} copper pieces and ` +
      `${silverPieces} silver pieces!`;

    const result: IFooModel = {
      Title: title,
      Items: [],
      HasItems: false,
    };

    return result;
  }

  private getElectrumPieces(): IFooModel {
    const electrumPieces =
      this.getRoll("50000+5d6*1000").toLocaleString("en-US");
    const title = `You get ${electrumPieces} electrum pieces!`;

    const result: IFooModel = {
      Title: title,
      Items: [],
      HasItems: false,
    };

    return result;
  }

  private getGoldPieces(): IFooModel {
    const goldPieces = this.getRoll("3000+3d6*1000").toLocaleString("en-US");
    const title = `You get ${goldPieces} gold pieces!`;

    const result: IFooModel = {
      Title: title,
      Items: [],
      HasItems: false,
    };

    return result;
  }

  private getPlatinumPieces(): IFooModel {
    const platinumPieces = this.getRoll("500+5d4*100").toLocaleString("en-US");
    const title = `You get ${platinumPieces} platinum pieces!`;

    const result: IFooModel = {
      Title: title,
      Items: [],
      HasItems: false,
    };

    return result;
  }

  private getGems(): IFooModel {
    // You get 10d10 gems!
    const quantity = this.dice.roll("10d10").total;
    const model: IFooModel = {
      Title: `You get ${quantity} gems!`,
      Items: [],
      HasItems: true,
    };
    const gems: string[] = [];

    for (let index = 0; index < quantity; index++) {
      const roll = this.dice.roll(this.gemsTable.DieExpression);
      const row = this.gemsTable.find(roll.total);
      const gem = new GemModel(row.Index, this.dice);
      gems.push(gem.Title);
    }

    model.Items.push(...gems);
    return model;
  }

  private getJewelry(): IFooModel {
    const jewelryQuantity = this.dice.roll("5d10").total;
    const jewelryModel: IFooModel = <IFooModel>{
      Title: `You get ${jewelryQuantity} pieces of jewelry!`,
      Items: [],
      HasItems: true,
    };
    const jewelry: string[] = [];

    for (let index = 0; index < jewelryQuantity; index++) {
      const jewelRoll = this.dice.roll(this.jewelryTable.DieExpression);
      const row = this.jewelryTable.find(jewelRoll.total);
      const model = new JewelryModel(row.Index, this.dice);
      jewelry.push(model.Title);
    }

    jewelryModel.Items.push(...jewelry);

    return jewelryModel;
  }

  private getTwice(): IFooModel[] {
    const result: IFooModel[] = [];
    const roll1 = this.dice.roll("1d17");
    result.push(...this.getRandom(1, roll1.total));
    const roll2 = this.dice.roll("1d17");
    result.push(...this.getRandom(1, roll1.total));
    return result;
  }

  private getThrice(): IFooModel[] {
    const result: IFooModel[] = [];
    const roll1 = this.dice.roll("1d17");
    result.push(...this.getRandom(1, roll1.total));
    const roll2 = this.dice.roll("1d17");
    result.push(...this.getRandom(1, roll2.total));
    const roll3 = this.dice.roll("1d17");
    result.push(...this.getRandom(1, roll3.total));
    return result;
  }
}

class CoinModel implements IFooModel {
  constructor(value: string) {
    this.Title = value;
    this.Items = [];
    this.HasItems = false;
  }

  readonly Title: string;
  readonly Items: string[];
  readonly HasItems: boolean;
}

class GemModel implements IFooModel {
  constructor(index: number, private readonly dice: IDice) {
    this.Title = this.process(index);
    this.Items = [];
    this.HasItems = false;
  }

  private readonly ornamentalStonesTable = new MyTable(
    OrnamentalStonesData,
    "Ornamental Stones",
    DieType.d12
  );
  private readonly semiPreciousStonesTable = new MyTable(
    SemiPreciousStonesData,
    "Semi-Precious Stones",
    DieType.d12
  );
  private readonly fancyStonesTable = new MyTable(
    FancyStonesData,
    "Fancy Stones",
    "d14"
  );
  private readonly gemstonesTable = new MyTable(
    GemStonesData,
    "Gem Stones",
    "d14"
  );

  private process(index: number): string {
    let result: string = "";

    // You found an ornamental stone worth 10 Gold.
    if (index === 0) {
      const ornamentalStone = this.getRow(this.ornamentalStonesTable);
      result = `${ornamentalStone.Value} It is worth 10 Gold!`;
    }

    // You found a semi-precious stone worth 50 Gold.
    if (index === 1) {
      const semiPrciousStone = this.getRow(this.semiPreciousStonesTable);
      result = `${semiPrciousStone.Value} It is worth 50 Gold!`;
    }

    // You found a fancy stone worth 100 Gold.
    if (index === 2) {
      const fancyStone = this.getRow(this.fancyStonesTable);
      result = `${fancyStone.Value} It is worth 100 Gold!`;
    }

    // You found a precious fancy stone worth 500 Gold.
    if (index === 3) {
      const preciousFancyStone = this.getRow(this.fancyStonesTable);
      result = `${preciousFancyStone.Value} It is worth 500 Gold!`;
    }

    // You found a gem stone worth 1,000 Gold.
    if (index === 4) {
      const gemStone = this.getRow(this.gemstonesTable);
      result = `${gemStone.Value} It is worth 1,000 Gold!`;
    }

    // You found a jeweled gem stone worth 5,000 Gold.
    if (index === 5) {
      const jeweledGem = this.getRow(this.gemstonesTable);
      result = `${jeweledGem.Value} It is worth 5,000 Gold!`;
    }

    return result;
  }

  private getRow(table: MyTable<ITableRow>): ITableRow {
    const roll = this.dice.roll(table.DieExpression);
    const row = table.find(roll.total);
    return row.Row;
  }

  Title: string;
  Items: string[];
  HasItems: boolean;
}

class JewelryModel implements IFooModel {
  constructor(index: number, private readonly dice: IDice) {
    this.Title = this.process(index);
    this.Items = [];
    this.HasItems = false;
  }

  private process(index: number): string {
    let result: string = "";
    // You found (ivory or wrought silver) jewelry! It is worth (d10*100) Gold!
    if (index == 0) {
      result = `You found ${[
        "ivory",
        "wroght silver",
      ].getRandom()} jewelry! It is worth ${this.dice
        .roll("1d10*100")
        .total.toLocaleString("en-US")} Gold!`;
    }

    // You found a piece of jewelry made with silver and gold! It is worth (2d6*100) Gold!
    if (index === 1) {
      result = `You found a piece of jewelry made with silver and gold! It is worth ${this.dice
        .roll("2d6*100")
        .total.toLocaleString("en-US")} Gold!`;
    }

    // You found a piece of wrought gold jewelry! It is worth (3d6*100) Gold!
    if (index === 2) {
      result = `You found a piece of wrought gold jewelry! It is worth ${this.dice
        .roll("3d6*100")
        .total.toLocaleString("en-US")} Gold!`;
    }
 
    // You found a piece of jewelry made with (jade, coral or wrought platinum)! It is worth (5d6*100) Gold!
    if (index === 3) {
      result = `You found a piece of jewelry made with ${[
        "jade",
        "coral",
        "wrought platinum",
      ].getRandom()}! It is worth ${this.dice
        .roll("5d6*100")
        .total.toLocaleString("en-US")} Gold!`;
    }

    // You found a silver piece of jewelry made with faceted gems! It is worth (1d6*1,000) Gold!
    if (index === 4) {
      result = `You found a silver piece of jewelry made with faceted gems! It is worth ${this.dice
        .roll("1d6*1000")
        .total.toLocaleString("en-US")} Gold!`;
    }

    // You found a gold piece of jewerly made with faceted gems! It is worth (2d4*1,000) Gold!
    if (index === 5) {
      result = `You found a gold piece of jewerly made with faceted gems! It is worth ${this.dice
        .roll("2d4*1000")
        .total.toLocaleString("en-US")} Gold!`;
    }

    // You found a platinum piece of jewelry made with faceted gems! It is worth (2d6*1,000) Gold!
    if (index === 6) {
      result = `You found a platinum piece of jewelry made with faceted gems! It is worth ${this.dice
        .roll("2d6*1000")
        .total.toLocaleString("en-US")} Gold!`;
    }

    return result;
  }

  Title: string;
  Items: string[];
  HasItems: boolean;
}

export const MonetaryTreasureData: ITableRow[] = [
  {
    Roll: [1, 2],
    Value:
      "You get (20,000+(1d4)(10,000)) copper pieces and (20,000+(1d4+1)(10,000) silver pieces!",
  },
  { Roll: [3, 5], Value: "You get (5,0000+(5d6)(1,000) electrum pieces!" },
  { Roll: [6, 10], Value: "You get (3,000+(3d6)(1,000) gold pieces!" },
  { Roll: [11, 12], Value: "You get (500+(5d4)(100) platinum pieces!" },
  { Roll: [13, 15], Value: "You get 10d10 gems!" },
  {
    Roll: [16, 17],
    Value: "You get 5d10 pieces of jewelry!",
  },
  { Roll: 18, Value: "Roll twice, ignoring rolls above 17" },
  { Roll: 19, Value: "Roll thrice, discounting rolls above 17" },
  { Roll: 20, Value: "Get one of each monetary treasure  listed above" },
];

export const GemsData: ITableRow[] = [
  {
    Roll: [1, 25],
    Value: "You found an ornamental stone worth 10 Gold.",
    AltValue: "10 Gold",
    Notes: "Ornamental Stone",
  },
  {
    Roll: [26, 50],
    Value: "You found a semi-precious stone worth 50 Gold.",
    AltValue: "50 Gold",
    Notes: "Semi-Precious Stone",
  },
  {
    Roll: [51, 70],
    Value: "You found a fancy stone worth 100 Gold.",
    AltValue: "100 Gold",
    Notes: "Fancy Stone",
  },
  {
    Roll: [71, 90],
    Value: "You found a precious fancy stone worth 500 Gold.",
    AltValue: "500 Gold",
    Notes: "Precious Fancy Stone",
  },
  {
    Roll: [91, 99],
    Value: "You found a gem stone worth 1,000 Gold.",
    AltValue: "1,000 Gold",
    Notes: "Gem Stone",
  },
  {
    Roll: 100,
    Value: "You found a jeweled gem stone worth 5,000 Gold.",
    AltValue: "5,000 Gold",
    Notes: "Jeweled Gem Stone",
  },
];

export const GemsTable = new MyTable(GemsData, "Gems", DieType.percentile);

export const OrnamentalStonesData: ITableRow[] = [
  {
    Roll: 1,
    Value: "You found a mottled deep blue azurite!",
    AltValue: "Azurite",
  },
  {
    Roll: 2,
    Value: `You found a striped ${[
      "brown",
      "blue",
      "white",
      "red",
    ].getRandom()} agate!`,
    AltValue: "Banded Agate",
  },
  {
    Roll: 3,
    Value: "You found a pale blue quartz!",
    AltValue: "Blue Quartz",
  },
  {
    Roll: 4,
    Value: `You found a ${[
      "grey",
      "white",
      "brown",
      "blue",
      "green",
    ].getRandom()} eye agate!`,
    AltValue: "Eye Agate",
  },
  {
    Roll: 5,
    Value: "You found a grey-black hematite!",
    AltValue: "Hematite",
  },
  {
    Roll: 6,
    Value: `You found a ${[
      "dark",
      "light blue",
    ].getRandom()} piece of lapis lazuli!`,
    AltValue: "Lapis Lazuli",
  },
  {
    Roll: 7,
    Value: "You find a striated light and dark green malachite!",
    AltValue: "Malachite",
  },
  {
    Roll: 8,
    Value: `You find a ${[
      "pink",
      "yellow",
    ].getRandom()}-white moss agate with ${[
      "grey",
      "green",
    ].getRandom()} marking!`,
    AltValue: "Moss Agate",
  },
  {
    Roll: 9,
    Value: "You find a piece of black obsidian!",
    AltValue: "Obsidian",
  },
  {
    Roll: 10,
    Value: "You find a piece of light pink rhodochrosite!",
    AltValue: "Rhodochrosite",
  },
  {
    Roll: 11,
    Value: "You find a piece of tiger's eye!",
    AltValue: "Tiger Eye",
  },
  {
    Roll: 12,
    Value: "You find a piece of turquoise!",
    AltValue: "Turquoise",
  },
];

export const OrnamentalStonesTable = new MyTable(
  OrnamentalStonesData,
  "Ornamental Stones",
  DieType.d12
);

export const SemiPreciousStonesData: ITableRow[] = [
  { Roll: 1, Value: "You find a piece of bloodstone!", AltValue: "Bloodstone" },
  { Roll: 2, Value: "You find a piece of carnelian!", AltValue: "Carnelian" },
  { Roll: 3, Value: "You find a piece of chalcedony!", AltValue: "Chalcedony" },
  {
    Roll: 4,
    Value: "You find a piece of chrysoprase!",
    AltValue: "Chrysoprase",
  },
  {
    Roll: 5,
    Value: `You find a piece of ${[
      "blue",
      "black",
      "brown",
    ].getRandom()} jasper!`,
    AltValue: "Jasper",
  },
  { Roll: 6, Value: "You find a piece of moonstone!", AltValue: "Moonstone" },
  { Roll: 7, Value: "You find a piece of onyx!", AltValue: "Onyx" },
  {
    Roll: 8,
    Value: "You find a clear piece of rock crystal!",
    AltValue: "Rock Crystal",
  },
  {
    Roll: 9,
    Value: `You find ${["red", "white"].getRandom()} sardonyx!`,
    AltValue: "Sardonyx",
  },
  {
    Roll: 10,
    Value: `You found a ${[
      "grey",
      "yellow",
      "blue",
    ].getRandom()} smoky quartz!`,
    AltValue: "Smoky Quartz",
  },
  {
    Roll: 11,
    Value: "You found a star rose quartz!",
    AltValue: "Star Rose Quartz",
  },
  { Roll: 12, Value: "You found a piece of zircon!", AltValue: "Zircon" },
];

export const SemiPreciousStonesTable = new MyTable(
  SemiPreciousStonesData,
  "Semi-Precious Stones",
  DieType.d12
);

export const FancyStonesData: ITableRow[] = [
  {
    Roll: 1,
    Value: "You found a piece of amber (please do not use to make dinosuars)!",
    AltValue: "Amber",
  },
  {
    Roll: 2,
    Value: "You found a piece of alexandrite!",
    AltValue: "Alexandrite",
  },
  { Roll: 3, Value: "You found a piece of amethyst!", AltValue: "Amethyst" },
  {
    Roll: 4,
    Value: "You found a piece of Aquamarine!",
    AltValue: "Aquamarine",
  },
  {
    Roll: 5,
    Value: "You found a piece of chrysoberyl",
    AltValue: "Chrysoberyl",
  },
  { Roll: 6, Value: "You found a piece of coral!", AltValue: "Coral" },
  { Roll: 7, Value: "You found a piece of garnet!", AltValue: "Garnet" },
  { Roll: 8, Value: "You found a piece of jade!", AltValue: "Jade" },
  { Roll: 9, Value: "You found a piece of jet!", AltValue: "Jet" },
  { Roll: 10, Value: "You found a pearl!", AltValue: "Pearl" },
  { Roll: 11, Value: "You found a peice of peridot!", AltValue: "Peridot" },
  {
    Roll: 12,
    Value: `You found a piece of ${[
      "red",
      "red-brown",
      "deep green",
      "very deep blue",
    ].getRandom()} spinel!`,
    AltValue: "Spinel",
  },
  { Roll: 13, Value: "You found a piece of topaz!", AltValue: "Topaz" },
  {
    Roll: 14,
    Value: `You found a piece of ${[
      "pale green",
      "pale blue",
      "pale brown",
      "pale reddish",
    ].getRandom()} tourmaline!`,
    AltValue: "Tourmaline",
  },
];

export const FancyStonesTable = new MyTable(
  FancyStonesData,
  "Fancy Stones",
  "d14"
);

export const GemStonesData: ITableRow[] = [
  { Roll: 1, Value: "You found a black opal!", AltValue: "Black Opal" },
  { Roll: 2, Value: "You found a black sapphire!", AltValue: "Black Sapphire" },
  { Roll: 3, Value: "You found a diamond!", AltValue: "Diamond" },
  { Roll: 4, Value: "You found an emerald!", AltValue: "Emerald" },
  { Roll: 5, Value: "You found a fire opal!", AltValue: "Fire Opal" },
  { Roll: 6, Value: "You found a piece of jacinth!", AltValue: "Jacinth" },
  { Roll: 7, Value: "You found an opal!", AltValue: "Opal" },
  {
    Roll: 8,
    Value: "You found a rich purple oriental amethyst!",
    AltValue: "Oriental Amethyst",
  },
  {
    Roll: 9,
    Value: "You found a clear bright green oriental emerald!",
    AltValue: "Oriental Emerald",
  },
  {
    Roll: 10,
    Value: "You found a fiery yellow oriental topaz!",
    AltValue: "Oriental Topaz",
  },
  { Roll: 11, Value: "You found a ruby!", AltValue: "Ruby" },
  { Roll: 12, Value: "You found a sapphire!", AltValue: "Sapphire" },
  { Roll: 13, Value: "You found a star ruby!", AltValue: "Star Ruby" },
  { Roll: 14, Value: "You found a star sapphire!", AltValue: "Star Sapphire" },
];
export const GemStonesTable = new MyTable(GemStonesData, "Gem Stones", "d14");

export const JewelryData: ITableRow[] = [
  {
    Roll: [1, 10],
    Value:
      "You found (ivory or wrought silver) jewelry! It is worth (d10*100) Gold!",
    AltValue: "Ivory or Wrought Silver",
  },
  {
    Roll: [11, 20],
    Value:
      "You found a piece of jewelry made with silver and gold! It is worth (2d6*100) Gold!",
    AltValue: "Wrought Silver and Gold",
  },
  {
    Roll: [21, 40],
    Value:
      "You found a piece of wrought gold jewelry! It is worth (3d6*100) Gold!",
    AltValue: "Wrought Gold",
  },
  {
    Roll: [41, 50],
    Value:
      "You found a piece of jewelry made with (jade, coral or wrought platinum)! It is worth (5d6*100) Gold!",
    AltValue: "Jade, Coral or Wrought Platinum",
  },
  {
    Roll: [51, 70],
    Value:
      "You found a silver piece of jewelry made with faceted gems! It is worth (1d6*1,000) Gold!",
    AltValue: "Silver With Gems",
  },
  {
    Roll: [71, 90],
    Value:
      "You found a gold piece of jewerly made with faceted gems! It is worth (2d4*1,000) Gold!",
    AltValue: "Gold With Gems",
  },
  {
    Roll: [91, 100],
    Value:
      "You found a platinum piece of jewelry made with faceted gems! It is worth (2d6*1,000) Gold!",
    AltValue: "Platinum With Gems",
  },
];

export const JewelryTable = new MyTable(
  JewelryData,
  "Jewelry",
  DieType.percentile
);
