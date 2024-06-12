import { ITableRow, MyTable } from './MyTable.js';
import { IFooModel } from './FantasyTreasureGenerator.js';
import { PotionsRepository } from './Potions.js';
import { ScrollsRepository } from './Scrolls.js';
import { MagicRingsRepository } from './MagicRings.js';
import { RodsStavesWandsRepository } from './RodsStavesWands.js';
import { MiscMagicRepository } from './MiscMagic.js';
import { DieType, IDice } from '@krisnorman/rpg-utils';

export class MagicItemsRepository {
  private readonly magicItemsTable = new MyTable(
    MagicItemsData,
    'Magic Items',
    DieType.percentile
  );
  constructor(
    private dice: IDice,
    private potionsRepository: PotionsRepository,
    private scrollsRepository: ScrollsRepository,
    private magicRingsRepository: MagicRingsRepository,
    private rodsStavesWandsRepository: RodsStavesWandsRepository,
    private miscMagicRepository: MiscMagicRepository
  ) {}

  getRandom(count: number = 1): IFooModel[] {
    const magicItems: IFooModel[] = [];
    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.magicItemsTable.DieExpression);
      const row = this.magicItemsTable.find(roll.total);

      // Potions Table, 1-20
      if (row.Index === 0) {
        const potions = this.potionsRepository.getRandom();
        magicItems.push(...potions);
      }
      // Scrolls Table, 21-35
      if (row.Index === 1) {
        const scrolls = this.scrollsRepository.getRandom();
        magicItems.push(...scrolls);
      }
      // Magic Rings Table, 36-40
      if (row.Index === 2) {
        const rings = this.magicRingsRepository.getRandom();
        magicItems.push(...rings);
      }
      // Rods Table, 41-45
      if (row.Index === 3) {        
        const item = this.rodsStavesWandsRepository.getRandom();
        magicItems.push(...item);
      }
      // Misc. Magic Table 1, 46-48
      if (row.Index === 4) {        
        const miscMagic = this.miscMagicRepository.getMisc1();
        magicItems.push(...miscMagic);
      }
      // Misc. Magic Table 2, 49-51
      if (row.Index === 5) {        
        const miscMagic2 = this.miscMagicRepository.getMisc2();
        magicItems.push(...miscMagic2);
      }
      // Misc. Magic Table 3, 52-54
      if (row.Index === 6) {        
        const miscMagic3 = this.miscMagicRepository.getMisc3();
        magicItems.push(...miscMagic3);
      }
      // Misc. Magic Table 4, 55-57
      if (row.Index === 7) {        
        const miscMagic4 = this.miscMagicRepository.getMisc4();
        magicItems.push(...miscMagic4);
      }
      // Misc. Magic Table 5, 58-60
      if (row.Index === 8) {
        magicItems.push({Title: "Misc. Magic Table 5", Items: [], HasItems: false});
        const miscMagic5 = this.miscMagicRepository.getMisc5();
        magicItems.push(...miscMagic5);
      }
      // Magic Armor Table, 61-75
      if (row.Index === 9) {
        magicItems.push({Title: "Magic Armor", Items: [], HasItems: false});
      }
      // Magic Swords Table, 76-86
      if (row.Index === 10) {
        magicItems.push({Title: "Magic Sword", Items: [], HasItems: false});
      }
      // Misc. Weapons Table, 87-100
      if (row.Index === 11) {
        magicItems.push({Title: "Misc. Weapons Table", Items: [], HasItems: false});
      }
    }

    return magicItems;
  }
}

export const MagicItemsData: ITableRow[] = [
  { Roll: [1, 20], Value: 'Potions Table' },
  { Roll: [21, 35], Value: 'Scrolls Table' },
  { Roll: [36, 40], Value: 'Magic Rings Table' },
  { Roll: [41, 45], Value: 'Rods Table' },
  { Roll: [46, 48], Value: 'Misc. Magic Table 1' },
  { Roll: [49, 51], Value: 'Misc. Magic Table 2' },
  { Roll: [52, 54], Value: 'Misc. Magic Table 3' },
  { Roll: [55, 57], Value: 'Misc. Magic Table 4' },
  { Roll: [58, 60], Value: 'Misc. Magic Table 5' },
  { Roll: [61, 75], Value: 'Magic Armor Table' },
  { Roll: [76, 86], Value: 'Magic Swords Table' },
  { Roll: [87, 100], Value: 'Misc. Weapons Table' },
];
