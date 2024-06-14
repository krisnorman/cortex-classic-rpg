import { DieType, IDice } from "@krisnorman/rpg-utils";
import { ArmorRepository } from "./Armor.js";
import { IFooModel } from "./FantasyTreasureGenerator.js";
import { ITableRow, MyTable } from "./MyTable.js";
import { WeaponsRepository } from "./Weapons.js";

export class RegularTreasureRepository {
  private readonly regularTreasureTable = new MyTable(
    RegularTreasureData,
    "Regular Treasure",
    DieType.percentile
  );

  constructor(
    private dice: IDice,
    private armorRepository: ArmorRepository,
    private weaponsRepository: WeaponsRepository
  ) {}

  getRandom(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    const items: IFooModel[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.regularTreasureTable.DieExpression);
      const row = this.regularTreasureTable.find(roll.total);
      if (row.Row.Value === "Armor") {
        const armor = this.armorRepository.getRandom();
        items.push(...armor);
      }
      if (row.Row.Value === "Weapons") {
        const weapons = this.weaponsRepository.getRandom();
        items.push(...weapons);
      }
    }

    return items;
  }
}

export const RegularTreasureData: ITableRow[] = [
  { Roll: [1, 50], Value: "Armor" },
  { Roll: [51, 100], Value: "Weapons" },
];
