import { IDice } from "@krisnorman/rpg-utils";
import { IFooModel } from "./FantasyTreasureGenerator.js";
import { ITableRow, MyTable } from "./MyTable.js";

export class Armor implements IFooModel {
  constructor(row: ITableRow) {
    this.Title = row.Value;
    this.Items = [];
    this.HasItems = false;
  }
  Title: string;
  Items: string[];
  HasItems: boolean;
}

export class ArmorRepository {
  private readonly armorTable = new MyTable(ArmorData, "Armor", "1d13");

  constructor(private dice: IDice) {}

  getRandom(count: number = 1): Armor[] {
    if (count < 1) count = 1;

    const armor: Armor[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.armorTable.DieExpression);
      const row = this.armorTable.find(roll.total);
      const item = new Armor(row.Row);
      armor.push(item);
    }

    return armor;
  }
}

// export class ArmorHelper {
//   constructor(private table: MyTable<ITableRow>, private dice: DiceWrapper) {}

//   generate(): IFooModel[] {
//     const roll = this.dice.roll(this.table.DieExpression);
//     const row = this.table.find(roll.total);
//     const model: IFooModel = {
//       Title: row.Row.Value,
//       Items: [],
//       HasItems: false,
//     };
//     return [model];
//   }
// }

export const ArmorData: ITableRow[] = [
  { Roll: 1, Value: "Banded Armor, 2W, Torso, Arms, Legs" },
  { Roll: 2, Value: "Chain Mail Armor, 4W, Torso, Arms" },
  { Roll: 3, Value: "Elven Chain Mail Armor, 5W, Torso, Arms" },
  { Roll: 4, Value: "Leather Armor, 2W, Torso, Arms, Legs" },
  { Roll: 5, Value: "Padded Armor, 1W, Torso, Arms" },
  { Roll: 6, Value: "Plate Mail Armor, 6W, Torso, Arms, Legs" },
  { Roll: 7, Value: "Ring Mail Armor, 4W, Torso, Arms, Legs" },
  { Roll: 8, Value: "Scale Male Armor, 4W, Torso, Arms, Legs" },
  { Roll: 9, Value: "Large Shield, +4 to Get out of Harm's Way" },
  { Roll: 10, Value: "Small Shield, +2 to Get out of Harm's Way" },
  { Roll: 11, Value: "Small Wooden Shield, +2 to Get out of Harm's Way" },
  { Roll: 12, Value: "Splint Mail, 2W, Torso, Arms" },
  { Roll: 13, Value: "Studded Leather Armor, 3W, Torso" },
];
// export const ArmorTable = new MyTable(ArmorData, "Armor", "d13");
