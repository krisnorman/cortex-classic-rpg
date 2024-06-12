import { ITableRow, MyTable } from './MyTable.js';
import { IFooModel } from './FantasyTreasureGenerator.js';
import { DieType, IDice } from '@krisnorman/rpg-utils';

export class Map implements IFooModel {
  constructor(value: string) {
    if (value === undefined || value === '')
      throw new Error('Argument null error. Value cannot be null or empty.');
    this.Title = value;
  }
  readonly Title: string;
  readonly Items: string[] = [];
  readonly HasItems: boolean = false;
}

export class MapsRepository {
  private readonly mapsTable = new MyTable(
    MapsData,
    'Maps',
    DieType.percentile
  );
  constructor(private dice: IDice) {}

  getRandom(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    const maps: IFooModel[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.mapsTable.DieExpression);
      const row = this.mapsTable.find(roll.total);
      maps.push(new Map(row.Row.Value));
    }

    return maps;
  }
}

const MapsData: ITableRow[] = [
  { Roll: [1, 5], Value: 'Found map (F)', AltValue: 'False Map' },
  {
    Roll: [6, 70],
    Value: 'Found Map to Monetary Treasure!',
    AltValue: 'Monetary Treasure',
  },
  {
    Roll: [71, 90],

    Value: 'Found Map to Magic Treasure!',
    AltValue: 'Magic Treasure',
  },
  {
    Roll: [91, 100],

    Value: 'Found Map to a Combined Hoard!',
    AltValue: 'Combined Hoard',
  },
];