import { DieType, IDice } from "@krisnorman/rpg-utils";
import { IFooModel } from "./FantasyTreasureGenerator.js";
import { ITableRow, MyTable } from "./MyTable.js";

export class Rod implements IFooModel {
  constructor(private row: ITableRow) {
    this.Title = row.Value;
  }
  Title: string;
  Items: string[] = [];
  HasItems: boolean = false;
}

export class Staff implements IFooModel {
  constructor(private row: ITableRow) {
    this.Title = row.Value;
  }
  Title: string;
  Items: string[] = [];
  HasItems: boolean = false;
}

export class Wand implements IFooModel {
  constructor(private row: ITableRow) {
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

  private readonly rods: ITableRow[] = this.rodsStavesWandsTable.Rows.slice(
    0,
    7
  );
  private readonly staves: ITableRow[] = this.rodsStavesWandsTable.Rows.slice(
    8,
    7
  );
  private readonly wands: ITableRow[] =
    this.rodsStavesWandsTable.Rows.slice(14);

  constructor(private dice: IDice) {
    this.rods.forEach((x) => (x.TableName = "rod"));
    this.staves.forEach((x) => (x.TableName = "staff"));
    this.wands.forEach((x) => (x.TableName = "wand"));
  }

  getRandom(count: number = 1): IFooModel[] {
    const items: IFooModel[] = [];
    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.rodsStavesWandsTable.DieExpression);
      const row = this.rodsStavesWandsTable.find(roll.total);
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
      const wand = new Wand(row.Row);
      wands.push(wand);
    }
    return wands;
  }
}

export const RodsStavesWandsData: ITableRow[] = [
  {
    Roll: [1, 3],
    Value: "Rod of Absorption",
    Notes: "You found a Rod of Absorption! It has (1d50) charges left in it.",
  },
  {
    Roll: 4,
    Value: "Rod of Beguiling",
    Notes: "You found a Rod of Beguiling! It has (1d50) charges left in it.",
  },
  {
    Roll: [5, 14],
    Value: "Rod of Cancellation",
    Notes: "You found a Rod of Cancellation! It has (1d50) charges left in it.",
  },
  {
    Roll: [15, 16],
    Value: "Rod of Lordly Might",
    Notes: "You found a Rod of Lordly Might! It has (1d50) charges left in it.",
  },
  {
    Roll: 17,
    Value: "Rod of Ressurection",
    Notes: "You found a Rod of Ressurection! It has (1d50) charges left in it.",
  },
  {
    Roll: 18,
    Value: "Rod of Rulership",
    Notes: "You found a Rod of Rulership! It has (1d50) charges left in it.",
  },
  {
    Roll: 19,
    Value: "Rod of Smiting",
    Notes: "You found a Rod of Smiting! It has (1d50) charges left in it.",
  },
  {
    Roll: 20,
    Value: "Staff of Command",
    Notes: "You found a Staff of Command! It has (1d25) charges left in it.",
  },
  {
    Roll: [21, 22],
    Value: "Staff of Curing",
    Notes: "You found a Staff of Curing! It has (1d25) charges left in it.",
  },
  {
    Roll: 23,
    Value: "Staff of the Magi",
    Notes: "You found a Staff of the Magi! It has (1d25) charges left in it.",
  },
  {
    Roll: 24,
    Value: "Staff of Power",
    Notes: "You found a Staff of Power! It has (1d25) charges left in it.",
  },
  {
    Roll: [25, 27],
    Value: "Staff of the Serpent",
    Notes: "You found a Staff of the Serpent! It has (1d25) charges left in it.",
  },
  {
    Roll: [28, 30],
    Value: "Staff of Striking",
    Notes: "You found a Staff of Striking! It has (1d25) charges left in it.",
  },
  {
    Roll: [32, 33],
    Value: "Staff of Withering",
    Notes: "You found a Staff of Withering! It has (1d25) charges left in it.",
  },
  {
    Roll: 34,
    Value: "Wand of Conjuration",
    Notes: "You found a Wand of Conjuration! It has (1d100) charges left in it.",
  },
  {
    Roll: [35, 38],
    Value: "Wand of Enemy Detection",
    Notes:
      "You found a Wand of Enemy Detection! It has (1d100) charges left in it.",
  },
  {
    Roll: [39, 41],
    Value: "Wand of Fear",
    Notes: "You found a Wand of Fear! It has (1d100) charges left in it.",
  },
  {
    Roll: [42, 44],
    Value: "Wand of Fire",
    Notes: "You found a Wand of Fire! It has (1d100) charges left in it.",
  },
  {
    Roll: [45, 47],
    Value: "Wand of Frost",
    Notes: "You found a Wand of Frost! It has (1d100) charges left in it.",
  },
  {
    Roll: [48, 52],
    Value: "Wand of Illumination",
    Notes: "You found a Wand of Illumination! It has (1d100) charges left in it.",
  },
  {
    Roll: [53, 56],
    Value: "Wand of Illusion",
    Notes: "You found a Wand of Illision! It has (1d100) charges left in it.",
  },
  {
    Roll: [57, 59],
    Value: "Wand of Lightning",
    Notes: "You found a Wand of Lightning! It has (1d100) charges left in it.",
  },
  {
    Roll: [60, 68],
    Value: "Wand of Magic Detection",
    Notes:
      "You found a Wand of Magic Detection! It has (1d100) charges left in it.",
  },
  {
    Roll: [69, 73],
    Value: "Wand of Metal & Mineral Direction",
    Notes:
      "You found a Wand of Metal and Mineral Direction! It has (1d100) charges left in it.",
  },
  {
    Roll: [74, 78],
    Value: "Wand of Magic Missiles",
    Notes:
      "You found a Wand of Magic Missiles! It has (1d100) charges left in it.",
  },
  {
    Roll: [79, 86],
    Value: "Wand of Negation",
    Notes: "You found a Wand of Negation! It has (1d100) charges left in it.",
  },
  {
    Roll: [87, 89],
    Value: "Wand of Paralyzation",
    Notes: "You found a Wand of Paralyzation! It has (1d100) charges left in it.",
  },
  {
    Roll: [90, 92],
    Value: "Wand of Polymorphing",
    Notes: "You found a Wand of Polymorphing! It has (1d100) charges left in it.",
  },
  {
    Roll: [93, 94],
    Value: "Wand of Secret Door & Trap Location",
    Notes:
      "You found a Wand of Secret Door & Trap Location! It has (1d100) charges left in it.",
  },
  {
    Roll: [95, 100],
    Value: "Wand of Wonder",
    Notes: "You found a Wand of Wonder! It has (1d100) charges left in it.",
  },
];
