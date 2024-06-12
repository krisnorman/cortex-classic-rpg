import { ITableRow, MyTable } from './MyTable.js';
import { SpellRepository } from './Spells.js';
import { IFooModel } from './FantasyTreasureGenerator.js';
import { IRowResult2 } from '../../../data/index.js';
import { DieType, IDice } from '@krisnorman/rpg-utils';

export class Scroll implements IFooModel {
  constructor(
    private row: IRowResult2<ITableRow>,
    private spellsRepository: SpellRepository
  ) {    
    this.fillItems();
    this.Title = this.row.Row.CalculatedValue ?? this.row.Row.Value;
  }

  private fillItems() {
    // 1 spell
    if (this.row.Index === 0) {
      let spell = this.spellsRepository.getRandom(1);
      this.Items.push(spell[0].Title);
    }
    // 2 spell
    if (this.row.Index === 1) {
      let spells = this.spellsRepository.getRandom(2);
      spells.forEach((spell) => this.Items.push(spell.Title));
    }
    // 3 spell
    if (this.row.Index === 2) {
      let spells = this.spellsRepository.getRandom(3);
      spells.forEach((spell) => this.Items.push(spell.Title));
    }
    // 4 spell
    if (this.row.Index === 3) {
      let spells = this.spellsRepository.getRandom(4);
      spells.forEach((spell) => this.Items.push(spell.Title));
    }
    // 5 spell
    if (this.row.Index === 4) {
      let spells = this.spellsRepository.getRandom(5);
      spells.forEach((spell) => this.Items.push(spell.Title));
    }
    // 6 spell
    if (this.row.Index === 5) {
      let spells = this.spellsRepository.getRandom(6);
      spells.forEach((spell) => this.Items.push(spell.Title));
    }
    // 7 spell
    if (this.row.Index === 6) {
      let spells = this.spellsRepository.getRandom(7);
      spells.forEach((spell) => this.Items.push(spell.Title));
    }
    // protection from..
    if (this.row.Index >= 7 && this.row.Index <= 14) {
      this.Title = this.row.Row.CalculatedValue ?? this.row.Row.Value;
    }
    // Cursed
    if (this.row.Index === 15) {
      let spell = this.spellsRepository.getRandom(1);
      this.Items.push(`${spell[0].Title}**`);
    }
  }

  Title: string;
  readonly Items: string[] = [];
  readonly HasItems: boolean = true;
}

export class ScrollsRepository {
  private readonly scrollsTable = new MyTable(ScrollsData, "Scrolls", DieType.percentile);
  
  constructor(private dice: IDice, private spellsRepository: SpellRepository){}

  getRandom(count: number = 1): Scroll[] {
    if (count < 1) count = 1;    
    let scrolls: Scroll[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.scrollsTable.DieExpression);
      const row = this.scrollsTable.find(roll.total);
      const scroll = new Scroll(row, this.spellsRepository);
      scrolls.push(scroll);
    }

    return scrolls;
  }
}

export const ScrollsData: ITableRow[] = [
  {
    Roll: [1, 19],
    Value: '1 Spell',
    CalculatedValue: 'You found a scroll with 1 spell',
  },
  {
    Roll: [20, 27],
    Value: '2 spells',
    CalculatedValue:
      'You found a scroll with 2 spells',
  },
  {
    Roll: [28, 35],
    Value: '3 spells',
    CalculatedValue:
      'You found a scroll with 3 spells',
  },
  {
    Roll: [36, 42],
    Value: '4 spells',
    CalculatedValue:
      'You found a scroll with 4 spells',
  },
  {
    Roll: [43, 49],
    Value: '5 spells',
    CalculatedValue:
      'You found a scroll with 5 spells',
  },
  {
    Roll: [50, 54],
    Value: '6 spells',
    CalculatedValue:
      'You found a scroll with 6 spells',
  },
  {
    Roll: [55, 60],
    Value: '7 spells',
    CalculatedValue:
      'You found a scroll with 7 spells',
  },
  {
    Roll: [61, 62],
    Value: 'Protection from Demons',
    CalculatedValue: 'You found a scroll of Protection from Demons!',
  },
  {
    Roll: [63, 64],
    Value: 'Protection from Devils',
    CalculatedValue: 'You found a scroll of Protection from Devils!',
  },
  {
    Roll: [65, 70],
    Value: 'Protection from Elementals',
    CalculatedValue: 'You found a scroll of Protection from Elementals!',
  },
  {
    Roll: [71, 76],
    Value: 'Protection from Lycanthropes',
    CalculatedValue: 'You found a scroll of Protection from Lycanthropes!',
  },
  {
    Roll: [77, 82],
    Value: 'Protection from Magic',
    CalculatedValue: 'You found a scroll of Protection from Magic!',
  },
  {
    Roll: [83, 87],
    Value: 'Protection from Petrification',
    CalculatedValue: 'You found a scroll of Protection from Petrification!',
  },
  {
    Roll: [88, 92],
    Value: 'Protection from Possession',
    CalculatedValue: 'You found a scroll of Protection from Possession',
  },
  {
    Roll: [93, 97],
    Value: 'Protection from Undead',
    CalculatedValue: 'You found a scroll of Protection from Undead!',
  },
  {
    Roll: [98, 100],
    Value: 'Cursed',
    CalculatedValue: 'You found a scroll with 1 spell',
  },
];

// export const ScrollsTable = new MyTable(ScrollsData, "Scrolls", DieType.percentile);