import { ITableRow, MyTable } from './MyTable.js';
import { IFooModel } from './FantasyTreasureGenerator.js';
import { Scroll, ScrollsRepository } from './Scrolls.js';
import { Potion, PotionsRepository } from './Potions.js';
import { MagicItemsRepository } from './MagicItems.js';
import { Rod, RodsStavesWandsRepository } from './RodsStavesWands.js';
import { MagicRing, MagicRingsRepository } from './MagicRings.js';
import { MiscMagicRepository } from './MiscMagic.js';
import { DieType, IDice } from '@krisnorman/rpg-utils';

export class MagicTreasureRepository {
  private readonly magicTreasureTable = new MyTable(
    MagicTreasureData,
    'Magic Treasure',
    DieType.d20
  );

  constructor(
    private dice: IDice,
    private scrollsRepository: ScrollsRepository,
    private potionsRepository: PotionsRepository,
    private magicItemsRepository: MagicItemsRepository,
    private magicRingsRepository: MagicRingsRepository,
    private rodsStavesWandsRepository: RodsStavesWandsRepository,
    private miscMagicRepository: MiscMagicRepository
  ) {}

  getRandom(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    const roll = this.dice.roll(this.magicTreasureTable.DieExpression);
    const row = this.magicTreasureTable.find(roll.total);
    const model: IFooModel[] = [];

    // Any item rolled on Magic Item Table, plus 4 Potions, 1-5
    if (row.Index === 0) {
      model.push({
        Title: 'Any item rolled on Magic Item Table, plus 4 Potions',
        Items: [],
        HasItems: false,
      });
      model.push(...this.getMagicItems());
      model.push(...this.getPotions(4));
    }
    // Any 2 items rolled on Magic Item Table, 6-8
    if (row.Index === 1) {
      model.push({
        Title: 'Any 2 items rolled on Magic Item Table',
        Items: [],
        HasItems: false,
      });
      model.push(...this.getMagicItems(2));
    }
    // 1 sword, 1 Armor/Shield, 1 Misc. Weapon, 9-12
    if (row.Index === 2) {
      model.push({
        Title: '1 sword, 1 Armor/Shield, 1 Misc. Weapon',
        Items: [],
        HasItems: false,
      });
    }
    // Any 3 items, no swords or potions, 13-14
    if (row.Index === 3) {
      model.push({
        Title: 'Any 3 items, no swords or potions',
        Items: [],
        HasItems: false,
      });
    }
    // Any 6 potions and any 6 scrolls, 15-18
    if (row.Index === 4) {
      model.push({
        Title: 'Any 6 potions and any 6 scrolls',
        Items: [],
        HasItems: false,
      });
      model.push(...this.getScrolls(6));
      model.push(...this.getPotions(6));
    }
    // 1 ring, 1 rod, and any 2 other items, 19
    if (row.Index === 5) {
      model.push({
        Title: '1 ring, 1 rod, and any 2 other items',
        Items: [],
        HasItems: false,
      });
      model.push(...this.getRings());
      model.push(...this.getRods());
    }
    // 1 rod, 1 misc. magic item, and any 3 other items, 20
    if (row.Index === 6) {
      model.push({
        Title: '1 rod, 1 misc. magic item, and any 3 other items',
        Items: [],
        HasItems: false,
      });
      model.push(...this.getRods());
      model.push(...this.getMiscMagic());
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
    let rods = this.rodsStavesWandsRepository.getRod(count);
    return rods;
  }
}

export const MagicTreasureData: ITableRow[] = [
  {
    Roll: [1, 5],
    Value: 'Any item rolled on Magic Items Table, plus 4 potions',
  },
  { Roll: [6, 8], Value: 'Any 2 items rolled on Magic Item Table' },
  {
    Roll: [9, 12],
    Value: '1 Sword, 1 Armor or Shield, 1 Miscellaneous Weapon',
  },
  { Roll: [13, 14], Value: 'Any 3 items, no Sword or Potions' },
  { Roll: [15, 18], Value: 'Any 6 Potions and any 6 Scrolls' },
  { Roll: 19, Value: 'Any 4 items, 1 is a Ring, 1 is a Rod' },
  { Roll: 20, Value: 'Any 5 items, 1 is a Rod, 1 is Miscellaneous Magic' },
];

export const MagicTreasureTable = new MyTable(
  MagicTreasureData,
  'Magic Treasure',
  DieType.d20
);
