import { ITableRow, MyTable } from "./MyTable.js";
import { IFooModel } from "./FantasyTreasureGenerator.js";
import { MonetaryTreasureRepository } from "./MonetaryTreasure.js";
import { MagicTreasureRepository } from "./MagicTreasure.js";
import { DieType, IDice } from "@krisnorman/rpg-utils";

export class CombinedHoardRepository {
  private readonly combinedHoardTable = new MyTable(
    CombinedHoardData,
    "Combined Hoard",
    DieType.percentile
  );

  constructor(
    private dice: IDice,
    private monetaryTreasureRepository: MonetaryTreasureRepository,
    private magicTreasureRepository: MagicTreasureRepository
  ) {}

  getRandom(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    const hoard: IFooModel[] = [];

    const roll = this.dice.roll(this.combinedHoardTable.DieExpression);
    const row = this.combinedHoardTable.find(roll.total);

    // 1-2 Monterary Treasure and 1-5 Magic Treasure
    if (row.Index === 0) {
      hoard.push({
        Title: "Combined Hoard 1-2 Monterary Treasure and 1-5 Magic Treasure",
        Items: [],
        HasItems: false,
      });

      hoard.push(...this.getMonetaryTreasures(["1d2"]));
      hoard.push(...this.getMagicTreasures(["1d5"]));
    }

    // 6-10 Monetary Treasure and 1-5 Magic Treasure
    if (row.Index === 1) {
      hoard.push({
        Title: "Combined Hoard 6-10 Monetary Treasure and 1-5 Magic Treasure",
        Items: [],
        HasItems: false,
      });
      hoard.push(...this.getMonetaryTreasures(["1d10r<6"]));
      hoard.push(...this.getMagicTreasures(["1d5"]));
    }

    // 3-5 AND 6-10 Monetary Treasure and 1-5 AND 15-18 Magic Treasure
    if (row.Index === 2) {
      hoard.push({
        Title:
          "Combined Hoard 3-5 AND 6-10 Monetary Treasure and 1-5 AND 15-18 Magic Treasure",
        Items: [],
        HasItems: false,
      });
      hoard.push(...this.getMonetaryTreasures(["1d5r<3", "1d10r<6"]));
      hoard.push(...this.getMagicTreasures(["1d5", "1d18r<15"]));
    }

    // 1-2 AND 3-5 AND 6-10 Monetary Treasure and 9-12 AND 13-14 Magic Treasure
    if (row.Index === 3) {
      hoard.push({
        Title:
          "Combined Hoard 1-2 AND 3-5 AND 6-10 Monetary Treasure and 9-12 AND 13-14 Magic Treasure",
        Items: [],
        HasItems: false,
      });
      hoard.push(...this.getMonetaryTreasures(["1d2", "1d5r<3", "1d10r<6"]));
      hoard.push(...this.getMagicTreasures(["1d12r<9", "1d14r<13"]));
    }

    // 6-10 AND 11-12 Monetary Treasure and 6-8 AND 15-18 Magic Treasure
    if (row.Index === 4) {
      hoard.push({
        Title:
          "Combined Hoard 6-10 AND 11-12 Monetary Treasure and 6-8 AND 15-18 Magic Treasure",
        Items: [],
        HasItems: false,
      });
      hoard.push(...this.getMonetaryTreasures(["1d10r<6", "1d12r<11"]));
      hoard.push(...this.getMagicTreasures(["1d8r<6", "1d18r<15"]));
    }

    // 3-5 AND 6-10 AND 11-12 AND 16-17 Monetary Treasure and 1-5 AND 9-12 Magic Treasure
    if (row.Index === 5) {
      hoard.push({
        Title:
          "Combined Hoard 3-5 AND 6-10 AND 11-12 AND 16-17 Monetary Treasure and 1-5 AND 9-12 Magic Treasure",
        Items: [],
        HasItems: false,
      });
      hoard.push(
        ...this.getMonetaryTreasures(["1d5r<3", "1d10r<6", "1d17r<16"])
      );
      hoard.push(...this.getMagicTreasures(["1d5", "1d12r<9"]));
    }

    // 20 Monetary Treasure and a map to 1-5 Magic Treasure
    if (row.Index === 6) {
      hoard.push({
        Title:
          "Combined Hoard 20 Monetary Treasure and a map to 1-5 Magic Treasure",
        Items: [],
        HasItems: false,
      });

      hoard.push(...this.getMonetaryTreasures(["20"]));
      hoard.push({ Title: "Map treasure:", Items: [], HasItems: false });
      hoard.push(...this.getMagicTreasures(["1d5"]));
    }

    // 20 Monetary Treasure and a map tp 19 Magic Treasure
    if (row.Index === 7) {
      hoard.push({
        Title:
          "Combined Hoard 20 Monetary Treasure and a map to 19 Magic Treasure",
        Items: [],
        HasItems: false,
      });

      hoard.push(...this.getMonetaryTreasures(["20"]));
      hoard.push({ Title: "Map treasure:", Items: [], HasItems: false });
      hoard.push(...this.getMagicTreasures(["19"]));
    }

    // Map to 1-2 AND 3-5 Monetary Treasure, 20 Magic Treasures on hand
    if (row.Index === 8) {
      hoard.push({
        Title:
          "Combined Hoard Map to 1-2 AND 3-5 Monetary Treasure, 20 Magic Treasures on hand",
        Items: [],
        HasItems: false,
      });

      hoard.push({
        Title: "Map to Monetary Treasure:",
        HasItems: true,
        Items: [],
      });
      hoard.push(...this.getMonetaryTreasures(["1d2", "1d5r<3"]));
      hoard.push({
        Title: "Magic Treasure on hand:",
        Items: [],
        HasItems: false,
      });
      hoard.push(...this.getMagicTreasures(["20"]));
    }

    // Map to 11-12 AND 13-15 Monetary Treasure PLUS 15-18 Magic Treasure and 20 Magic Treasure on hand
    if (row.Index === 9) {
      hoard.push({
        Title:
          "Combined Hoard Map to 11-12 AND 13-15 Monetary Treasure PLUS 15-18 Magic Treasure and 20 Magic Treasure on hand",
        Items: [],
        HasItems: false,
      });

      hoard.push({
        Title: "Map to Monetary Treasure:",
        HasItems: true,
        Items: [],
      });
      hoard.push(...this.getMonetaryTreasures(["1d12r<11", "1d15r<13"]));
      hoard.push({
        Title: "Magic Treasure on hand:",
        Items: [],
        HasItems: false,
      });
      hoard.push(...this.getMagicTreasures(["1d18r<15", "20"]));
    }

    return hoard;
  }

  private getMonetaryTreasures(rolls: string[]): IFooModel[] {
    const result: IFooModel[] = [];

    for (let index = 0; index < rolls.length; index++) {
      const count = this.dice.roll(rolls[index]).total;
      const treasure = this.monetaryTreasureRepository.getRandom(count);
      result.push(...treasure);
    }

    return result;
  }

  private getMagicTreasures(rolls: string[]): IFooModel[] {
    const result: IFooModel[] = [];

    for (let index = 0; index < rolls.length; index++) {
      const count = this.dice.roll(rolls[index]).total;
      const treasure = this.magicTreasureRepository.getRandom(count);
      result.push(...treasure);
    }

    return result;
  }
}

export const CombinedHoardData: ITableRow[] = [
  {
    Roll: [1, 20],
    Value: "1-2 Monterary Treasure and 1-5 Magic Treasure",
  },
  { Roll: [21, 40], Value: "6-10 Monetary Treasure and 1-5 Magic Treasure" },
  {
    Roll: [41, 55],
    Value: "3-5 AND 6-10 Monetary Treasure and 1-5 AND 15-18 Magic Treasure",
  },
  {
    Roll: [56, 65],
    Value:
      "1-2 AND 3-5 AND 6-10 Monetary Treasure and 9-12 AND 13-14 Magic Treasure",
  },
  {
    Roll: [66, 75],
    Value: "6-10 AND 11-12 Monetary Treasure and 6-8 AND 15-18 Magic Treasure",
  },
  {
    Roll: [76, 80],
    Value:
      "3-5 AND 6-10 AND 11-12 AND 16-17 Monetary Treasure and 1-5 AND 9-12 Magic Treasure",
  },
  {
    Roll: [81, 85],
    Value: "20 Monetary Treasure and a map to 1-5 Magic Treasure",
  },
  {
    Roll: [86, 90],
    Value: "20 Monetary Treasure and a map tp 19 Magic Treasure",
  },
  {
    Roll: [91, 96],
    Value: "Map to 1-2 AND 3-5 Monetary Treasure, 20 Magic Treasures on hand",
  },
  {
    Roll: [97, 100],
    Value:
      "Map to 11-12 AND 13-15 Monetary Treasure PLUS 15-18 Magic Treasure and 20 Magic Treasure on hand",
  },
];
