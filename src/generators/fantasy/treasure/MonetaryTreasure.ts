import { DieType, IDice } from "@krisnorman/rpg-utils";
import { IFooModel } from "./FantasyTreasureGenerator.js";
import { ITableRow, MyTable } from "./MyTable.js";
import { IRowResult2 } from "../../../data/IRowResult2.js";

class Helpers {
  constructor(private readonly dice: IDice) { }

  getRandomRows(count: number = 1, table: MyTable<ITableRow>): ITableRow[] {
    const result: ITableRow[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(table.DieExpression);
      const row = table.find(roll.total);
      result.push(row.Row);
    }

    return result;
  }
}

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
    this.initGemsData();
    this.initJewelryData();
    //this.initMonetaryTreasureData();
  }

  private initMonetaryTreasureData(): void {
    const table = this.monetaryTreasureTable;
    const rows = table.Rows;

    // Set table name for each row
    rows.forEach((row) => (row.TableName = "monetarytreasuretable"));

    //You get (20,000+(1d4)(10,000)) copper pieces and (20,000+(1d4+1)(10,000) silver pieces!
    rows[0].Value =
      `You get ${this.getRoll("20000+1d4*10000").toLocaleString(
        "en-US"
      )} copper pieces and ` +
      `${this.getRoll("20000+{1d4+1}*10000").toLocaleString(
        "en-US"
      )} silver pieces!`;
    rows[0].Notes = "coins";

    // You get (5,0000+(5d6)(1,000) electrum pieces!
    rows[1].Value = `You get ${this.getRoll("50000+5d6*1000").toLocaleString(
      "en-US"
    )} electrum pieces!`;
    rows[1].Notes = "coins";

    // You get (3,000+(3d6)(1,000) gold pieces!
    rows[2].Value = `You get ${this.getRoll("3000+3d6*1000").toLocaleString(
      "en-US"
    )} gold pieces!`;
    rows[2].Notes = "coins";

    // You get (500+(5d4)(100) platinum pieces!
    rows[3].Value = `You get ${this.getRoll("500+5d4*100").toLocaleString(
      "en-US"
    )} platinum pieces!`;
    rows[3].Notes = "coins";

    // You get 10d10 gems!
    const gemCount = this.getRoll("10d10");
    rows[4].Value = `You get ${gemCount} gems!`;
    rows[4].Items = this.getRows(gemCount, this.gemsTable);
    rows[4].Notes = "gems";

    // You get 5d10 pieces of jewelry!
    const jewelryCount = this.getRoll("5d10");
    rows[5].Value = `You get ${jewelryCount} pices of jewlry!`;
    rows[5].Items = this.getRows(jewelryCount, this.jewelryTable);
    rows[5].Notes = "jewelry";

    // Roll twice, ignoring rolls above 17
    rows[6].Items = this.multiRoll(2, table, "1d17");
    rows[6].Notes = "twice";

    // Roll thrice, discounting rolls above 17
    rows[7].Items = this.multiRoll(3, table, "1d17");
    rows[7].Notes = "thrice";

    // Get one of each monetary treasure listed above
    rows[8].Items = [
      { Roll: 0, Value: rows[0].Value, Notes: "coins" },
      { Roll: 0, Value: rows[1].Value, Notes: "coins" },
      { Roll: 0, Value: rows[2].Value, Notes: "coins" },
      { Roll: 0, Value: rows[3].Value, Notes: "coins" },
      { Roll: 0, Value: rows[4].Value, Items: rows[4].Items, Notes: "gems" },
      { Roll: 0, Value: rows[5].Value, Items: rows[5].Items, Notes: "jewelry" },
    ];
    rows[8].Notes = "all";
  }

  private initGemsData(): void {
    const table = this.gemsTable;
    const rows = table.Rows;

    rows.forEach((row) => (row.TableName = "gemstable"));

    // // Ornamental Stone
    // rows[0].Value = `You found an ornamental stone worth 10 Gold.`;
    // rows[0].Items = this.getRows(1, this.ornamentalStonesTable);

    // // Semi-Precious Stone
    // rows[1].Value = `You found a semi-precious stone worth 50 Gold.`;
    // rows[1].Items = this.getRows(1, this.semiPreciousStonesTable);

    // // Fancy Stone
    // rows[2].Value = `You found a fancy stone worth 100 Gold.`;
    // rows[2].Items = this.getRows(1, this.fancyStonesTable);

    // // Precious Fancy Stone
    // rows[3].Value = `You found a precious fancy stone worth 500 Gold.`;
    // rows[3].Items = this.getRows(1, this.fancyStonesTable);

    // // Gem Stone
    // rows[4].Value = `You found a gem stone worth 1,000 Gold.`;
    // rows[4].Items = this.getRows(1, this.gemstonesTable);

    // // Jeweled Gem Stone
    // rows[5].Value = `You found a jeweled gem stone worth 5,000 Gold.`;
    // rows[5].Items = this.getRows(1, this.gemstonesTable);
  }

  private initJewelryData(): void {
    const table = this.jewelryTable;
    const rows = table.Rows;

    rows.forEach((row) => (row.TableName = "jewelrytable"));

    // // You found (ivory or wrought silver) jewelry! It is worth (d10*100) Gold!
    // rows[0].Value = `You found ${[
    //   "ivory",
    //   "wroght silver",
    // ].getRandom()} jewelry! It is worth ${this.getRoll(
    //   "1d10*100"
    // ).toLocaleString("en-US")} Gold!`;

    // // You found a piece of jewelry made with silver and gold! It is worth (2d6*100) Gold!
    // rows[1].Value = `You found a piece of jewelry made with silver and gold! It is worth ${this.getRoll(
    //   "2d6*100"
    // ).toLocaleString("en-US")} Gold!`;

    // // You found a piece of wrought gold jewelry! It is worth (3d6*100) Gold!
    // rows[2].Value = `You found a piece of wrought gold jewelry! It is worth ${this.getRoll(
    //   "3d6*100"
    // ).toLocaleString("en-US")} Gold!`;

    // // You found a piece of jewelry made with (jade, coral or wrought platinum)! It is worth (5d6*100) Gold!
    // rows[3].Value = `You found a piece of jewelry made with ${[
    //   "jade",
    //   "coral",
    //   "wrought platinum",
    // ].getRandom()}! It is worth ${this.getRoll("5d6*100").toLocaleString(
    //   "en-US"
    // )} Gold!`;

    // // You found a silver piece of jewelry made with faceted gems! It is worth (1d6*1,000) Gold!
    // rows[4].Value = `You found a silver piece of jewelry made with faceted gems! It is worth ${this.getRoll(
    //   "1d6*1000"
    // ).toLocaleString("en-US")} Gold!`;

    // // You found a gold piece of jewerly made with faceted gems! It is worth (2d4*1,000) Gold!
    // rows[5].Value = `You found a gold piece of jewerly made with faceted gems! It is worth ${this.getRoll(
    //   "2d4*1000"
    // ).toLocaleString("en-US")} Gold!`;

    // // You found a platinum piece of jewelry made with faceted gems! It is worth (2d6*1,000) Gold!
    // rows[6].Value = `You found a platinum piece of jewelry made with faceted gems! It is worth ${this.getRoll(
    //   "2d6*1000"
    // ).toLocaleString("en-US")} Gold!`;
  }

  private getRoll(expression: string): number {
    return this.dice.roll(expression).total;
  }

  private getRows(count: number = 1, table: MyTable<ITableRow>): ITableRow[] {
    const result: ITableRow[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(table.DieExpression);
      const row = table.find(roll.total);
      result.push(row.Row);
    }

    return result;
  }

  private multiRoll(
    count: number,
    table: MyTable<ITableRow>,
    expression: string
  ): ITableRow[] {
    if (count < 1) return [];
    const result: ITableRow[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(expression);
      const item = table.find(roll.total);
      result.push(item.Row);
    }

    return result;
  }

  getRandom(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    let model: IFooModel[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.monetaryTreasureTable.DieExpression);
      const row = this.monetaryTreasureTable.find(11);
      //const row = this.getMonetaryTreasureBase(1);
      
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

      // Gems, 13-15
      if (row.Index === 4) { 
        const gems = this.getGems();
        model.push(gems);
      }

      // You get 5d10 pieces of jewelry!, 16-17
      if (row.Index === 5) {
        const jewelry = this.getJewelry();
        model.push(jewelry);
      }

      let items = <ITableRow[]>row.Row.Items;

      // Roll twice, 18
      if (row.Index === 6) {
        this.processItems(items, model);
      }

      // Roll thrice, 19
      if (row.Index === 7) {
        this.processItems(items, model);
      }

      // One of each, 20
      if (row.Index === 8) {
        this.processItems(items, model);
      }
    }

    return model;
  }

  private cloneRow(row: IRowResult2<ITableRow>) {
    const clone: IRowResult2<ITableRow> = {
      ActualRoll: row.ActualRoll,
      Index: row.Index,
      Row: row.Row,
    };

    return clone;
  }

  private getCopperPieces(): IFooModel {
    const copperPieces = this.getRoll("20000+1d4*10000").toLocaleString("en-US");
    const silverPieces = this.getRoll("20000+{1d4+1}*10000").toLocaleString("en-US");

    const title =
      `You get ${copperPieces} copper pieces and ` +
      `${silverPieces} silver pieces!`;

    const result: IFooModel = {
      Title: title,
      Items: [],
      HasItems: false
    };

    return result;
  }

  private getElectrumPieces(): IFooModel {
    const electrumPieces = this.getRoll("50000+5d6*1000").toLocaleString("en-US");
    const title = `You get ${electrumPieces} electrum pieces!`;

    const result: IFooModel = {
      Title: title,
      Items: [],
      HasItems: false
    };

    return result;
  }
  
  private getGoldPieces(): IFooModel {
    const goldPieces = this.getRoll("3000+3d6*1000").toLocaleString("en-US");
    const title = `You get ${goldPieces} gold pieces!`;

    const result: IFooModel = {
      Title: title,
      Items: [],
      HasItems: false
    };

    return result;
  }

  private getPlatinumPieces(): IFooModel {
    const platinumPieces = this.getRoll("500+5d4*100").toLocaleString("en-US");
    const title = `You get ${platinumPieces} platinum pieces!`;

    const result: IFooModel = {
      Title: title,
      Items: [],
      HasItems: false
    };

    return result;
  }

  private getMonetaryTreasureBase(roll: number): IRowResult2<ITableRow> {
    let row = this.monetaryTreasureTable.find(roll);

    //You get (20,000+(1d4)(10,000)) copper pieces and (20,000+(1d4+1)(10,000) silver pieces!
    if (row.Index === 0) {
      row.Row.Value =
        `You get ${this.getRoll("20000+1d4*10000").toLocaleString(
          "en-US"
        )} copper pieces and ` +
        `${this.getRoll("20000+{1d4+1}*10000").toLocaleString(
          "en-US"
        )} silver pieces!`;
      row.Row.Notes = "coins";
      return this.cloneRow(row);
    }

    // You get (5,0000+(5d6)(1,000) electrum pieces!
    if (row.Index === 1) {
      row.Row.Value = `You get ${this.getRoll("50000+5d6*1000").toLocaleString(
        "en-US"
      )} electrum pieces!`;
      row.Row.Notes = "coins";
      return this.cloneRow(row);
    }

    // You get (3,000+(3d6)(1,000) gold pieces!
    if (row.Index === 2) {
      row.Row.Value = `You get ${this.getRoll("3000+3d6*1000").toLocaleString(
        "en-US"
      )} gold pieces!`;
      row.Row.Notes = "coins";
      return this.cloneRow(row);
    }

    // You get (500+(5d4)(100) platinum pieces!
    if (row.Index === 3) {
      row.Row.Value = `You get ${this.getRoll("500+5d4*100").toLocaleString(
        "en-US"
      )} platinum pieces!`;
      row.Row.Notes = "coins";
      return this.cloneRow(row);
    }

    // You get 10d10 gems!
    if (row.Index === 4) {
      const gemCount = this.getRoll("10d10");
      row.Row.Value = `You get ${gemCount} gems!`;
      row.Row.Items = this.getRows(gemCount, this.gemsTable);
      row.Row.Notes = "gems";
      return this.cloneRow(row);
    }

    // You get 5d10 pieces of jewelry!
    if (row.Index === 5) {
      // const jewelryCount = this.getRoll("5d10");
      // row.Row.Value = `You get ${jewelryCount} pices of jewlry!`;
      // row.Row.Items = this.getRows(jewelryCount, this.jewelryTable);
      // row.Row.Notes = "jewelry";
      // return this.cloneRow(row);
    }

    // Roll twice, ignoring rolls above 17
    if (row.Index === 6) {
      row.Row.Items = this.multiRoll(2, this.monetaryTreasureTable, "1d17");
      row.Row.Notes = "twice";
      return this.cloneRow(row);
    }

    // Roll thrice, discounting rolls above 17
    if (row.Index === 7) {
      row.Row.Items = this.multiRoll(3, this.monetaryTreasureTable, "1d17");
      row.Row.Notes = "thrice";
      return this.cloneRow(row);
    }

    // Get one of each monetary treasure listed above
    if (row.Index === 8) {
      // Coins, 1-2, 3-5, 6-10, 11-12
      const coins1 = this.getMonetaryTreasureBase(1);
      const coins2 = this.getMonetaryTreasureBase(3);
      const coins3 = this.getMonetaryTreasureBase(6);
      const coins4 = this.getMonetaryTreasureBase(11);
      // Gems, 13-15
      const gems = this.getMonetaryTreasureBase(13);
      // You get 5d10 pieces of jewelry!, 16-17
      const jewelry = this.getMonetaryTreasureBase(16);

      row.Row.Items = [
        { Roll: 0, Value: coins1.Row.Value, Notes: "coins" },
        { Roll: 0, Value: coins2.Row.Value, Notes: "coins" },
        { Roll: 0, Value: coins3.Row.Value, Notes: "coins" },
        { Roll: 0, Value: coins4.Row.Value, Notes: "coins" },
        {
          Roll: 0,
          Value: gems.Row.Value,
          Items: gems.Row.Items,
          Notes: "gems",
        },
        {
          Roll: 0,
          Value: jewelry.Row.Value,
          Items: jewelry.Row.Items,
          Notes: "jewelry",
        },
      ];
      row.Row.Notes = "all";
      return this.cloneRow(row);
    }

    return row;
  }

  //private getCoins(): IFooModel {}

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

  private processItems(items: ITableRow[], model: IFooModel[]): void {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (item.Notes === "coins") model.push(new CoinModel(item.Value));
      if (item.Notes === "gems") {
        const gems = this.getGems();
        model.push(gems);
      }
      if (item.Notes === "jewelry") {
        const jewelry = this.getJewelry();
        model.push(jewelry);
      }
    }
  }
}

class CoinModel implements IFooModel {
  constructor(private value: string) {
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

export const MonetaryTreasureTable = new MyTable(
  MonetaryTreasureData,
  "Monetary Treasure",
  DieType.d20
);

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
