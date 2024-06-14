import { DieType, IDice } from "@krisnorman/rpg-utils";
import { IFooModel } from "./FantasyTreasureGenerator.js";
import { ITableRow, MyTable } from "./MyTable.js";
import { IRowResult2 } from "../../../data/IRowResult2.js";

export class Rod implements IFooModel {
  constructor(row: ITableRow) {
    this.Title = row.Value;
  }
  Title: string;
  Items: string[] = [];
  HasItems: boolean = false;
}

export class Staff implements IFooModel {
  constructor(row: ITableRow) {
    this.Title = row.Value;
  }
  Title: string;
  Items: string[] = [];
  HasItems: boolean = false;
}

export class Wand implements IFooModel {
  constructor(row: ITableRow) {
    this.Title = row.Value;
  }
  Title: string;
  Items: string[] = [];
  HasItems: boolean = false;
}

export class RodsStavesWandsRepository {
  private readonly rodsStavesWandsTable = new MyTable(
    RodsStavesWandsData,
    "Rods, Staves, & Wands",
    DieType.percentile
  );

  private readonly rods: ITableRow[];
  private readonly staves: ITableRow[];
  private readonly wands: ITableRow[];

  constructor(private dice: IDice) {
    this.rods = this.rodsStavesWandsTable.Rows.slice(0, 7);
    this.staves = this.rodsStavesWandsTable.Rows.slice(8, 7);
    this.wands = this.rodsStavesWandsTable.Rows.slice(14);
    this.rods.forEach((x) => (x.TableName = "rod"));
    this.staves.forEach((x) => (x.TableName = "staff"));
    this.wands.forEach((x) => (x.TableName = "wand"));
  }

  getRandom(count: number = 1): IFooModel[] {
    const items: IFooModel[] = [];
    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.rodsStavesWandsTable.DieExpression);
      const row = this.rodsStavesWandsTable.find(roll.total);
      this.processDiceRolls(row);

      if (row.Row.TableName === "rod") {
        items.push(new Rod(row.Row));
      }
      if (row.Row.TableName === "staff") {
        items.push(new Staff(row.Row));
      }
      if (row.Row.TableName === "wand") {
        items.push(new Wand(row.Row));
      }
    }
    return items;
  }

  getRod(count: number = 1): Rod[] {
    const rods: Rod[] = [];
    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll("1d19");
      const row = this.rodsStavesWandsTable.find(roll.total);
      this.processDiceRolls(row);
      const rod = new Rod(row.Row);
      rods.push(rod);
    }
    return rods;
  }

  getStaff(count: number = 1): Staff[] {
    const staves: Staff[] = [];
    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll("1d33r<20");
      const row = this.rodsStavesWandsTable.find(roll.total);
      this.processDiceRolls(row);
      const staff = new Staff(row.Row);
      staves.push(staff);
    }
    return staves;
  }

  getWand(count: number = 1): Wand[] {
    const wands: Wand[] = [];
    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll("(1d100)r<34");
      const row = this.rodsStavesWandsTable.find(roll.total);
      this.processDiceRolls(row);
      const wand = new Wand(row.Row);
      wands.push(wand);
    }
    return wands;
  }

  private processDiceRolls(row: IRowResult2<ITableRow>): void {
    row.Row.Value = row.Row.Value.replace(
      "(1d25)",
      this.dice.roll("1d25").total.toString()
    );

    row.Row.Value = row.Row.Value.replace(
      "(1d50)",
      this.dice.roll("1d50").total.toString()
    );

    row.Row.Value = row.Row.Value.replace(
      "(1d100)",
      this.dice.roll("1d100").total.toString()
    );
  }
}

export const RodsStavesWandsData: ITableRow[] = [
  {
    Roll: [1, 3],
    AltValue: "Rod of Absorption",
    Value: "You found a Rod of Absorption! It has (1d50) charges left in it.",
  },
  {
    Roll: 4,
    AltValue: "Rod of Beguiling",
    Value: "You found a Rod of Beguiling! It has (1d50) charges left in it.",
  },
  {
    Roll: [5, 14],
    AltValue: "Rod of Cancellation",
    Value: "You found a Rod of Cancellation! It has (1d50) charges left in it.",
  },
  {
    Roll: [15, 16],
    AltValue: "Rod of Lordly Might",
    Value: "You found a Rod of Lordly Might! It has (1d50) charges left in it.",
  },
  {
    Roll: 17,
    AltValue: "Rod of Ressurection",
    Value: "You found a Rod of Ressurection! It has (1d50) charges left in it.",
  },
  {
    Roll: 18,
    AltValue: "Rod of Rulership",
    Value: "You found a Rod of Rulership! It has (1d50) charges left in it.",
  },
  {
    Roll: 19,
    AltValue: "Rod of Smiting",
    Value: "You found a Rod of Smiting! It has (1d50) charges left in it.",
  },
  {
    Roll: 20,
    AltValue: "Staff of Command",
    Value: "You found a Staff of Command! It has (1d25) charges left in it.",
  },
  {
    Roll: [21, 22],
    AltValue: "Staff of Curing",
    Value: "You found a Staff of Curing! It has (1d25) charges left in it.",
  },
  {
    Roll: 23,
    AltValue: "Staff of the Magi",
    Value: "You found a Staff of the Magi! It has (1d25) charges left in it.",
  },
  {
    Roll: 24,
    AltValue: "Staff of Power",
    Value: "You found a Staff of Power! It has (1d25) charges left in it.",
  },
  {
    Roll: [25, 27],
    AltValue: "Staff of the Serpent",
    Value:
      "You found a Staff of the Serpent! It has (1d25) charges left in it.",
  },
  {
    Roll: [28, 30],
    AltValue: "Staff of Striking",
    Value: "You found a Staff of Striking! It has (1d25) charges left in it.",
  },
  {
    Roll: [32, 33],
    AltValue: "Staff of Withering",
    Value: "You found a Staff of Withering! It has (1d25) charges left in it.",
  },
  {
    Roll: 34,
    AltValue: "Wand of Conjuration",
    Value:
      "You found a Wand of Conjuration! It has (1d100) charges left in it.",
  },
  {
    Roll: [35, 38],
    AltValue: "Wand of Enemy Detection",
    Value:
      "You found a Wand of Enemy Detection! It has (1d100) charges left in it.",
  },
  {
    Roll: [39, 41],
    AltValue: "Wand of Fear",
    Value: "You found a Wand of Fear! It has (1d100) charges left in it.",
  },
  {
    Roll: [42, 44],
    AltValue: "Wand of Fire",
    Value: "You found a Wand of Fire! It has (1d100) charges left in it.",
  },
  {
    Roll: [45, 47],
    AltValue: "Wand of Frost",
    Value: "You found a Wand of Frost! It has (1d100) charges left in it.",
  },
  {
    Roll: [48, 52],
    AltValue: "Wand of Illumination",
    Value:
      "You found a Wand of Illumination! It has (1d100) charges left in it.",
  },
  {
    Roll: [53, 56],
    AltValue: "Wand of Illusion",
    Value: "You found a Wand of Illision! It has (1d100) charges left in it.",
  },
  {
    Roll: [57, 59],
    AltValue: "Wand of Lightning",
    Value: "You found a Wand of Lightning! It has (1d100) charges left in it.",
  },
  {
    Roll: [60, 68],
    AltValue: "Wand of Magic Detection",
    Value:
      "You found a Wand of Magic Detection! It has (1d100) charges left in it.",
  },
  {
    Roll: [69, 73],
    AltValue: "Wand of Metal & Mineral Direction",
    Value:
      "You found a Wand of Metal and Mineral Direction! It has (1d100) charges left in it.",
  },
  {
    Roll: [74, 78],
    AltValue: "Wand of Magic Missiles",
    Value:
      "You found a Wand of Magic Missiles! It has (1d100) charges left in it.",
  },
  {
    Roll: [79, 86],
    AltValue: "Wand of Negation",
    Value: "You found a Wand of Negation! It has (1d100) charges left in it.",
  },
  {
    Roll: [87, 89],
    AltValue: "Wand of Paralyzation",
    Value:
      "You found a Wand of Paralyzation! It has (1d100) charges left in it.",
  },
  {
    Roll: [90, 92],
    AltValue: "Wand of Polymorphing",
    Value:
      "You found a Wand of Polymorphing! It has (1d100) charges left in it.",
  },
  {
    Roll: [93, 94],
    AltValue: "Wand of Secret Door & Trap Location",
    Value:
      "You found a Wand of Secret Door & Trap Location! It has (1d100) charges left in it.",
  },
  {
    Roll: [95, 100],
    AltValue: "Wand of Wonder",
    Value: "You found a Wand of Wonder! It has (1d100) charges left in it.",
  },
];
