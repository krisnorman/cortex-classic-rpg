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

      const monetaryCount = this.dice.roll("1d2").total;
      const monetaryTreasure =
        this.monetaryTreasureRepository.getRandom(monetaryCount);
      hoard.push(...monetaryTreasure);

      const magicCount = this.dice.roll("1d5").total;
      const magicTreasure = this.magicTreasureRepository.getRandom(magicCount);
      hoard.push(...magicTreasure);
    }
    // 6-10 Monetary Treasure and 1-5 Magic Treasure
    if (row.Index === 1) {
      hoard.push({
        Title: "Combined Hoard 6-10 Monetary Treasure and 1-5 Magic Treasure",
        Items: [],
        HasItems: false,
      });
      const monetaryCount = this.dice.roll("1d10r<6").total;
      const monetaryTreasure =
        this.monetaryTreasureRepository.getRandom(monetaryCount);
      hoard.push(...monetaryTreasure);

      const magicCount = this.dice.roll("1d5").total;
      const magicTreasure = this.magicTreasureRepository.getRandom(magicCount);
      hoard.push(...magicTreasure);
    }
    // 3-5 AND 6-10 Monetary Treasure and 1-5 AND 15-18 Magic Treasure
    if (row.Index === 2) {
      hoard.push({
        Title:
          "Combined Hoard 3-5 AND 6-10 Monetary Treasure and 1-5 AND 15-18 Magic Treasure",
        Items: [],
        HasItems: false,
      });

      // 3-5
      const monetaryCount1 = this.dice.roll("1d5r<3").total;
      const monetaryTreasure1 =
        this.monetaryTreasureRepository.getRandom(monetaryCount1);
      hoard.push(...monetaryTreasure1);

      // 6-10
      const monetaryCount2 = this.dice.roll("1d10r<6").total;
      const monetaryTreasure2 =
        this.monetaryTreasureRepository.getRandom(monetaryCount2);
      hoard.push(...monetaryTreasure2);

      // 1-5
      const magicCount1 = this.dice.roll("1d5").total;
      const magicTreasure1 =
        this.magicTreasureRepository.getRandom(magicCount1);
      hoard.push(...magicTreasure1);

      // 15-18
      const magicCount2 = this.dice.roll("1d18r<15").total;
      const magicTreasure2 =
        this.magicTreasureRepository.getRandom(magicCount2);
      hoard.push(...magicTreasure2);
    }
    // 1-2 AND 3-5 AND 6-10 Monetary Treasure and 9-12 AND 13-14 Magic Treasure
    if (row.Index === 3) {
      hoard.push({
        Title:
          "Combined Hoard 1-2 AND 3-5 AND 6-10 Monetary Treasure and 9-12 AND 13-14 Magic Treasure",
        Items: [],
        HasItems: false,
      });

      // Monetary 1-2
      const monetaryCount1 = this.dice.roll("1d2").total;
      const monetaryTreasure1 =
        this.monetaryTreasureRepository.getRandom(monetaryCount1);
      hoard.push(...monetaryTreasure1);

      // Monetary 3-5
      const monetaryCount2 = this.dice.roll("1d5r<3").total;
      const monetaryTreasure2 =
        this.monetaryTreasureRepository.getRandom(monetaryCount2);
      hoard.push(...monetaryTreasure2);

      // Monetary 6-10
      const monetaryCount3 = this.dice.roll("1d10r<6").total;
      const monetaryTreasure3 =
        this.monetaryTreasureRepository.getRandom(monetaryCount3);
      hoard.push(...monetaryTreasure3);

      // Magic 9-12
      const magicCount1 = this.dice.roll("1d12r<9").total;
      const magicTreasure1 =
        this.magicTreasureRepository.getRandom(magicCount1);
      hoard.push(...magicTreasure1);

      // Magic 13-14
      const magicCount2 = this.dice.roll("1d14r<13").total;
      const magicTreasure2 =
        this.magicTreasureRepository.getRandom(magicCount2);
      hoard.push(...magicTreasure2);
    }
    // 6-10 AND 11-12 Monetary Treasure and 6-8 AND 15-18 Magic Treasure
    if (row.Index === 4) {
      hoard.push({
        Title:
          "Combined Hoard 6-10 AND 11-12 Monetary Treasure and 6-8 AND 15-18 Magic Treasure",
        Items: [],
        HasItems: false,
      });
    }
    // 3-5 AND 6-10 AND 11-12 AND 16-17 Monetary Treasure and 1-5 AND 9-12 Magic Treasure
    if (row.Index === 5) {
      hoard.push({
        Title:
          "Combined Hoard 3-5 AND 6-10 AND 11-12 AND 16-17 Monetary Treasure and 1-5 AND 9-12 Magic Treasure",
        Items: [],
        HasItems: false,
      });
    }
    // 20 Monetary Treasure and a map to 1-5 Magic Treasure
    if (row.Index === 6) {
      hoard.push({
        Title:
          "Combined Hoard 20 Monetary Treasure and a map to 1-5 Magic Treasure",
        Items: [],
        HasItems: false,
      });
    }
    // 20 Monetary Treasure and a map tp 19 Magic Treasure
    if (row.Index === 7) {
      hoard.push({
        Title:
          "Combined Hoard 20 Monetary Treasure and a map tp 19 Magic Treasure",
        Items: [],
        HasItems: false,
      });
    }
    // Map to 1-2 AND 3-5 Monetary Treasure, 20 Magic Treasures on hand
    if (row.Index === 8) {
      hoard.push({
        Title:
          "Combined Hoard Map to 1-2 AND 3-5 Monetary Treasure, 20 Magic Treasures on hand",
        Items: [],
        HasItems: false,
      });
    }
    // Map to 11-12 AND 13-15 Monetary Treasure PLUS 15-18 Magic Treasure and 20 Magic Treasure on hand
    if (row.Index === 9) {
      hoard.push({
        Title:
          "Combined Hoard Map to 11-12 AND 13-15 Monetary Treasure PLUS 15-18 Magic Treasure and 20 Magic Treasure on hand",
        Items: [],
        HasItems: false,
      });
    }

    return hoard;
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
