import { ITableRow, MyTable } from "./MyTable.js";
import { IFooModel } from "./FantasyTreasureGenerator.js";
import { Scroll, ScrollsRepository } from "./Scrolls.js";
import { Potion, PotionsRepository } from "./Potions.js";
import { MagicItemsRepository } from "./MagicItems.js";
import { Rod, RodsStavesWandsRepository } from "./RodsStavesWands.js";
import { MagicRing, MagicRingsRepository } from "./MagicRings.js";
import { MiscMagicRepository } from "./MiscMagic.js";
import { DieType, IDice } from "@krisnorman/rpg-utils";
import { MagicArmor, MagicArmorRepository } from "./MagicArmor.js";
import { MagicSword, MagicSwordRepository } from "./MagicSwords.js";
import { MagicWeapon, MagicWeaponsRepository } from "./MagicWeapons.js";
import { IounStoneRepository } from "./IounStones.js";

export class MagicTreasureRepository {
  private readonly magicTreasureTable = new MyTable(
    MagicTreasureData,
    "Magic Treasure",
    DieType.d20
  );

  constructor(
    private dice: IDice,
    private scrollsRepository: ScrollsRepository,
    private potionsRepository: PotionsRepository,
    private magicItemsRepository: MagicItemsRepository,
    private magicRingsRepository: MagicRingsRepository,
    private rodsStavesWandsRepository: RodsStavesWandsRepository,
    private miscMagicRepository: MiscMagicRepository,
    private magicArmorRepository: MagicArmorRepository,
    private magicSwordRepository: MagicSwordRepository,
    private magicWeaponsRepository: MagicWeaponsRepository,
    private iounStoneRepository: IounStoneRepository
  ) {}

  getRandom(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    const model: IFooModel[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.magicTreasureTable.DieExpression);
      const row = this.magicTreasureTable.find(roll.total);

      // Any item rolled on Magic Item Table, plus 4 Potions, 1-5
      if (row.Index === 0) {
        model.push({
          Title: "Any item rolled on Magic Item Table, plus 4 Potions",
          Items: [],
          HasItems: false,
        });
        model.push(...this.getMagicItems());
        model.push(...this.getPotions(4));
      }

      // Any 2 items rolled on Magic Item Table, 6-8
      if (row.Index === 1) {
        model.push({
          Title: "Any 2 items rolled on Magic Item Table",
          Items: [],
          HasItems: false,
        });
        model.push(...this.getMagicItems(2));
      }

      // 1 sword, 1 Armor/Shield, 1 Misc. Weapon, 9-12
      if (row.Index === 2) {
        model.push({
          Title: "1 sword, 1 Armor/Shield, 1 Misc. Weapon",
          Items: [],
          HasItems: false,
        });

        model.push(...this.getMagicSword());
        model.push(...this.getMagicArmor());
        model.push(...this.getMagicWeapon());
      }

      // Any 3 items, no swords or potions, 13-14
      if (row.Index === 3) {
        model.push({
          Title: "Any 3 items, no swords or potions",
          Items: [],
          HasItems: false,
        });

        const otherItems = [
          () => this.getMagicArmor(),
          () => this.getMagicItems(),
          //() => this.getMagicSword(),
          //() => this.getPotions(),
          () => this.getMiscMagic(),
          () => this.getScrolls(),
          () => this.getMagicWeapon(),
          () => this.getIounStone(),
        ];
        const otherItem1 = otherItems.getRandom();
        const otherItem2 = otherItems.getRandom();
        const otherItem3 = otherItems.getRandom();

        model.push(...otherItem1());
        model.push(...otherItem2());
        model.push(...otherItem3());
      }

      // Any 6 potions and any 6 scrolls, 15-18
      if (row.Index === 4) {
        model.push({
          Title: "Any 6 potions and any 6 scrolls",
          Items: [],
          HasItems: false,
        });

        model.push(...this.getScrolls(6));
        model.push(...this.getPotions(6));
      }

      // 1 ring, 1 rod, and any 2 other items, 19
      if (row.Index === 5) {
        model.push({
          Title: "1 ring, 1 rod, and any 2 other items",
          Items: [],
          HasItems: false,
        });

        model.push(...this.getRings());
        model.push(...this.getRods());
        const otherItems = [
          () => this.getMagicArmor(),
          () => this.getMagicItems(),
          () => this.getMagicSword(),
          () => this.getPotions(),
          () => this.getMiscMagic(),
          () => this.getScrolls(),
          () => this.getMagicWeapon(),
          () => this.getIounStone(),
        ];
        const otherItem1 = otherItems.getRandom();
        const otherItem2 = otherItems.getRandom();

        model.push(...otherItem1());
        model.push(...otherItem2());
      }

      // 1 rod, 1 misc. magic item, and any 3 other items, 20
      if (row.Index === 6) {
        model.push({
          Title: "1 rod, 1 misc. magic item, and any 3 other items",
          Items: [],
          HasItems: false,
        });

        model.push(...this.getRods());
        model.push(...this.getMiscMagic());
        const otherItems = [
          () => this.getMagicArmor(),
          () => this.getMagicItems(),
          () => this.getMagicSword(),
          () => this.getPotions(),
          () => this.getRings(),
          () => this.getScrolls(),
          () => this.getMagicWeapon(),
          () => this.getIounStone(),
        ];
        const otherItem1 = otherItems.getRandom();
        const otherItem2 = otherItems.getRandom();
        const otherItem3 = otherItems.getRandom();

        model.push(...otherItem1());
        model.push(...otherItem2());
        model.push(...otherItem3());
      }
    }

    return model;
  }

  private getPotions(count: number = 1): Potion[] {
    if (count < 1) count = 1;
    let potions = this.potionsRepository.getRandom(count);
    return potions;
  }

  private getScrolls(count: number = 1): Scroll[] {
    if (count < 1) count = 1;
    let scrolls = this.scrollsRepository.getRandom(count);
    return scrolls;
  }

  private getMagicItems(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    let magicItems = this.magicItemsRepository.getRandom(count);
    return magicItems;
  }

  private getMiscMagic(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    const miscMagic = this.miscMagicRepository.getRandom(count);
    return miscMagic;
  }

  private getRings(count: number = 1): MagicRing[] {
    if (count < 1) count = 1;
    let rings = this.magicRingsRepository.getRandom(count);
    return rings;
  }

  private getRods(count: number = 1): Rod[] {
    if (count < 1) count = 1;
    const rods = this.rodsStavesWandsRepository.getRod(count);
    return rods;
  }

  private getMagicArmor(count: number = 1): MagicArmor[] {
    if (count < 1) count = 1;
    const magicArmor = this.magicArmorRepository.getRandom(count);
    return magicArmor;
  }

  private getMagicSword(count: number = 1): MagicSword[] {
    if (count < 1) count = 1;
    const magicSword = this.magicSwordRepository.getRandom(count);
    return magicSword;
  }

  private getMagicWeapon(count: number = 1): MagicWeapon[] {
    if (count < 1) count = 1;
    const magicWeapon = this.magicWeaponsRepository.getRandom(count);
    return magicWeapon;
  }

  private getIounStone(count: number = 1): MagicSword[] {
    if (count < 1) count = 1;
    const iounStone = this.iounStoneRepository.getRandom(count);
    return iounStone;
  }
}

export const MagicTreasureData: ITableRow[] = [
  {
    Roll: [1, 5],
    Value: "Any item rolled on Magic Items Table, plus 4 potions",
  },
  { Roll: [6, 8], Value: "Any 2 items rolled on Magic Item Table" },
  {
    Roll: [9, 12],
    Value: "1 Sword, 1 Armor or Shield, 1 Miscellaneous Weapon",
  },
  { Roll: [13, 14], Value: "Any 3 items, no Sword or Potions" },
  { Roll: [15, 18], Value: "Any 6 Potions and any 6 Scrolls" },
  { Roll: 19, Value: "Any 4 items, 1 is a Ring, 1 is a Rod" },
  { Roll: 20, Value: "Any 5 items, 1 is a Rod, 1 is Miscellaneous Magic" },
];

export const MagicTreasureTable = new MyTable(
  MagicTreasureData,
  "Magic Treasure",
  DieType.d20
);
