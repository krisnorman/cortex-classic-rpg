import { DieType, IDice } from '@krisnorman/rpg-utils';
import { IFooModel } from './FantasyTreasureGenerator.js';
import { ITableRow, MyTable } from './MyTable.js';

export class MonetaryTreasureRepository {
  private readonly monetaryTreasureTable = new MyTable(
    MonetaryTreasureData,
    'Monetary Treasure',
    DieType.d20
  );

  private readonly gemsTable = new MyTable(
    GemsData,
    'Gems',
    DieType.percentile
  );

  private readonly jewelryTable = new MyTable(
    JewelryData,
    'Jewelry',
    DieType.percentile
  );

  private readonly ornamentalStonesTable = new MyTable(
    OrnamentalStonesData,
    'Ornamental Stones',
    DieType.d12
  );
  private readonly semiPreciousStonesTable = new MyTable(
    SemiPreciousStonesData,
    'Semi-Precious Stones',
    DieType.d12
  );
  private readonly fancyStonesTable = new MyTable(
    FancyStonesData,
    'Fancy Stones',
    'd14'
  );
  private readonly gemstonesTable = new MyTable(
    GemStonesData,
    'Gem Stones',
    'd14'
  );

  constructor(private dice: IDice) {
    this.initGemsData();
    this.initJewelryData();
    this.initMonetaryTreasureData();
  }

  private initMonetaryTreasureData(): void {
    const table = this.monetaryTreasureTable;
    const rows = table.Rows;

    // Set table name for each row
    rows.forEach((row) => (row.TableName = 'monetarytreasuretable'));

    //You get (20,000+(1d4)(10,000)) copper pieces and (20,000+(1d4+1)(10,000) silver pieces!
    rows[0].Value =
      `You get ${this.getRoll('20000+1d4*10000')} copper pieces and ` +
      `${this.getRoll('20000+{1d4+1}*10000')} silver pieces!`;
    rows[0].Notes = 'coins';

    // You get (5,0000+(5d6)(1,000) electrum pieces!
    rows[1].Value = `You get ${this.getRoll(
      '50000+5d6*1000'
    )} electrum pieces!`;
    rows[1].Notes = 'coins';

    // You get (3,000+(3d6)(1,000) gold pieces!
    rows[2].Value = `You get ${this.getRoll('3000+3d6*1000')} gold pieces!`;
    rows[2].Notes = 'coins';

    // You get (500+(5d4)(100) platinum pieces!
    rows[3].Value = `You get ${this.getRoll('500+5d4*100')} platinum pieces!`;
    rows[3].Notes = 'coins';

    // You get 10d10 gems!
    const gemCount = this.getRoll('10d10');
    rows[4].Value = `You get ${gemCount} gems!`;
    rows[4].Items = this.getRows(gemCount, this.gemsTable);
    rows[4].Notes = 'gems';

    // You get 5d10 pieces of jewelry!
    const jewelryCount = this.getRoll('5d10');
    rows[5].Value = `You get ${jewelryCount} pices of jewlry!`;
    rows[5].Items = this.getRows(jewelryCount, this.jewelryTable);
    rows[5].Notes = 'jewelry';

    // Roll twice, ignoring rolls above 17
    rows[6].Items = this.multiRoll(2, table, '1d17');
    rows[6].Notes = 'twice';

    // Roll thrice, discounting rolls above 17
    rows[7].Items = this.multiRoll(3, table, '1d17');
    rows[7].Notes = 'thrice';

    // Get one of each monetary treasure listed above
    rows[8].Items = [
      { Roll: 0, Value: rows[0].Value, Notes: 'coins' },
      { Roll: 0, Value: rows[1].Value, Notes: 'coins' },
      { Roll: 0, Value: rows[2].Value, Notes: 'coins' },
      { Roll: 0, Value: rows[3].Value, Notes: 'coins' },
      { Roll: 0, Value: rows[4].Value, Items: rows[4].Items, Notes: 'gems' },
      { Roll: 0, Value: rows[5].Value, Items: rows[5].Items, Notes: 'jewelry' },
    ];
    rows[8].Notes = 'all';
  }

  private initGemsData(): void {
    const table = this.gemsTable;
    const rows = table.Rows;

    rows.forEach((row) => (row.TableName = 'gemstable'));

    // Ornamental Stone
    rows[0].Value = `You found an ornamental stone worth 10 Gold.`;
    rows[0].Items = this.getRows(1, this.ornamentalStonesTable);

    // Semi-Precious Stone
    rows[1].Value = `You found a semi-precious stone worth 50 Gold.`;
    rows[1].Items = this.getRows(1, this.semiPreciousStonesTable);

    // Fancy Stone
    rows[2].Value = `You found a fancy stone worth 100 Gold.`;
    rows[2].Items = this.getRows(1, this.fancyStonesTable);

    // Precious Fancy Stone
    rows[3].Value = `You found a precious fancy stone worth 500 Gold.`;
    rows[3].Items = this.getRows(1, this.fancyStonesTable);

    // Gem Stone
    rows[4].Value = `You found a gem stone worth 1,000 Gold.`;
    rows[4].Items = this.getRows(1, this.gemstonesTable);

    // Jeweled Gem Stone
    rows[5].Value = `You found a jeweled gem stone worth 5,000 Gold.`;
    rows[5].Items = this.getRows(1, this.gemstonesTable);
  }

  private initJewelryData(): void {
    const table = this.jewelryTable;
    const rows = table.Rows;

    rows.forEach((row) => (row.TableName = 'jewelrytable'));

    // You found (ivory or wrought silver) jewelry! It is worth (d10*100) Gold!
    rows[0].Value = `You found (ivory or wrought silver) jewelry! It is worth ${this.getRoll(
      '1d10*100'
    )} Gold!`;

    // You found a piece of jewelry made with silver and gold! It is worth (2d6*100) Gold!
    rows[1].Value = `You found a piece of jewelry made with silver and gold! It is worth ${this.getRoll(
      '2d6*100'
    )} Gold!`;

    // You found a piece of wrought gold jewelry! It is worth (3d6*100) Gold!
    rows[2].Value = `You found a piece of wrought gold jewelry! It is worth ${this.getRoll(
      '3d6*100'
    )} Gold!`;

    // You found a piece of jewelry made with (jade, coral or wrought platinum)! It is worth (5d6*100) Gold!
    rows[3].Value = `You found a piece of jewelry made with (jade, coral or wrought platinum)! It is worth ${this.getRoll(
      '5d6*100'
    )} Gold!`;

    // You found a silver piece of jewelry made with faceted gems! It is worth (1d6*1,000) Gold!
    rows[4].Value = `You found a silver piece of jewelry made with faceted gems! It is worth ${this.getRoll(
      '1d6*1000'
    )} Gold!`;

    // You found a gold piece of jewerly made with faceted gems! It is worth (2d4*1,000) Gold!
    rows[5].Value = `You found a gold piece of jewerly made with faceted gems! It is worth ${this.getRoll(
      '2d4*1000'
    )} Gold!`;

    // You found a platinum piece of jewelry made with faceted gems! It is worth (2d6*1,000) Gold!
    rows[6].Value = `You found a platinum piece of jewelry made with faceted gems! It is worth ${this.getRoll(
      '2d6*1000'
    )} Gold!`;
  }

  private getRoll(expression: string): number {
    return this.dice.roll(expression).total;
  }

  private getRows(count: number = 1, table: MyTable<ITableRow>): ITableRow[] {
    const result: ITableRow[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(table.DieExpression);
      const row = table.find(roll.total);
      result.push(row.Row);
    }

    return result;
  }

  private multiRoll(
    count: number,
    table: MyTable<ITableRow>,
    expression: string
  ): ITableRow[] {
    if (count < 1) return [];
    const result: ITableRow[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(expression);
      const item = table.find(roll.total);
      result.push(item.Row);
    }

    return result;
  }

  getRandom(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    let model: IFooModel[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.monetaryTreasureTable.DieExpression);
      const row = this.monetaryTreasureTable.find(roll.total);
      // Coins
      if (row.Index < 4) model.push(new CoinModel(row.Row.Value));
      // Gems
      if (row.Index === 4) model.push(new GemModel(row.Row));
      // Jewelry
      if (row.Index === 5) model.push(new JewelryModel(row.Row));

      let items = <ITableRow[]>row.Row.Items;

      // Roll twice
      if (row.Index === 6) {
        this.processItems(items, model);
      }

      // Roll thrice
      if (row.Index === 7) {
        this.processItems(items, model);
      }

      // One of each
      if (row.Index === 8) {
        this.processItems(items, model);
      }
    }

    return model;
  }

  private processItems(items: ITableRow[], model: IFooModel[]): void {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (item.Notes === 'coins') model.push(new CoinModel(item.Value));
      if (item.Notes === 'gems') model.push(new GemModel(item));
      if (item.Notes === 'jewelry') model.push(new JewelryModel(item));
    }
  }
}

class CoinModel implements IFooModel {
  constructor(private value: string) {
    this.Title = value;
  }

  readonly Title: string = '';
  readonly Items: string[] = [];
  readonly HasItems: boolean = false;
}

class GemModel implements IFooModel {
  constructor(private row: ITableRow) {
    if (row.Items === undefined) throw new Error('Gems must have items.');
    this.Title = this.getTitle();
    this.Items = this.getItems();
  }

  readonly Title: string;
  readonly Items: string[] = [];
  readonly HasItems: boolean = true;

  private getTitle(): string {
    let count: number = this.row.Items?.length ?? 0;
    return `You get ${count} gems!`;
  }

  private getItems(): string[] {
    let result: string[] = [];

    this.row.Items?.forEach((item) => {
      const subItem: ITableRow[] = <ITableRow[]>item.Items;
      const text = `${item.Value}, ${subItem[0].Value}`;
      result.push(text);
    });

    return result;
  }
}

class JewelryModel implements IFooModel {
  constructor(private row: ITableRow) {
    if (row.Items === undefined) throw new Error('Jewelry must have items.');

    this.Title = this.getTitle();
    this.Items = this.getItems();
  }

  readonly Title: string;
  readonly Items: string[] = [];
  readonly HasItems: boolean = true;

  private getTitle(): string {
    let count: number = this.row.Items?.length ?? 0;
    return `You get ${count} pieces of jewelry!`;
  }

  private getItems(): string[] {
    let result: string[] = [];

    this.row.Items?.forEach((item) => {
      result.push(item.Value);
    });

    return result;
  }
}

export const MonetaryTreasureData: ITableRow[] = [
  {
    Roll: [1, 2],
    Value:
      'You get (20,000+(1d4)(10,000)) copper pieces and (20,000+(1d4+1)(10,000) silver pieces!',
  },
  { Roll: [3, 5], Value: 'You get (5,0000+(5d6)(1,000) electrum pieces!' },
  { Roll: [6, 10], Value: 'You get (3,000+(3d6)(1,000) gold pieces!' },
  { Roll: [11, 12], Value: 'You get (500+(5d4)(100) platinum pieces!' },
  { Roll: [13, 15], Value: 'You get 10d10 gems!' },
  {
    Roll: [16, 17],
    Value: 'You get 5d10 pieces of jewelry!',
  },
  { Roll: 18, Value: 'Roll twice, ignoring rolls above 17' },
  { Roll: 19, Value: 'Roll thrice, discounting rolls above 17' },
  { Roll: 20, Value: 'Get one of each monetary treasure  listed above' },
];

export const MonetaryTreasureTable = new MyTable(
  MonetaryTreasureData,
  'Monetary Treasure',
  DieType.d20
);

export const GemsData: ITableRow[] = [
  {
    Roll: [1, 25],
    Value: 'You found an ornamental stone worth 10 Gold.',
    AltValue: 'Ornamental Stone',
  },
  {
    Roll: [26, 50],
    Value: 'You found a semi-precious stone worth 50 Gold.',
    AltValue: 'Semi-Precious Stone',
  },
  {
    Roll: [51, 70],
    Value: 'You found a fancy stone worth 100 Gold.',
    AltValue: 'Fancy Stone',
  },
  {
    Roll: [71, 90],
    Value: 'You found a precious fancy stone worth 500 Gold.',
    AltValue: 'Precious Fancy Stone',
  },
  {
    Roll: [91, 99],
    Value: 'You found a gem stone worth 1,000 Gold.',
    AltValue: 'Gem Stone',
  },
  {
    Roll: 100,
    Value: 'You found a jeweled gem stone worth 5,000 Gold.',
    AltValue: 'Jeweled Gem Stone',
  },
];

export const GemsTable = new MyTable(GemsData, 'Gems', DieType.percentile);

export const OrnamentalStonesData: ITableRow[] = [
  { Roll: 1, Value: 'Azurite. You found a mottled deep blue azurite!' },
  {
    Roll: 2,
    Value:
      'Banded Agate. You found a striped (brown, blue, white, or red) agate!',
  },
  { Roll: 3, Value: 'Blue Quartz. You found a pale blue quartz!' },
  {
    Roll: 4,
    Value:
      'Eye Agate. You found a (grey, white, brown, blue, or green) eye agate!',
  },
  { Roll: 5, Value: 'Hematite. You found a grey-black hematite!' },
  {
    Roll: 6,
    Value:
      'Lapis Lazuli. You found a (dark or light blue) piece of lapis lazuli!',
  },
  {
    Roll: 7,
    Value: 'Malachite. You find a striated light and dark green malachite!',
  },
  {
    Roll: 8,
    Value:
      'Moss Agate. You find a (pink/yellow-white with grey/green moss marking) agate!',
  },
  { Roll: 9, Value: 'Obsidian. You find a piece of black obsidian!' },
  {
    Roll: 10,
    Value: 'Rhodochrosite. You find a piece of light pink rhodochrosite!',
  },
  { Roll: 11, Value: "Tiger Eye. You find a piece of tiger's eye!" },
  { Roll: 12, Value: 'Turquoise. You find a piece of turquoise!' },
];

export const OrnamentalStonesTable = new MyTable(
  OrnamentalStonesData,
  'Ornamental Stones',
  DieType.d12
);

export const SemiPreciousStonesData: ITableRow[] = [
  { Roll: 1, Value: 'Bloodstone. You find a piece of bloodstone!' },
  { Roll: 2, Value: 'Carnelian. You find a piece of carnelian!' },
  { Roll: 3, Value: 'Chalcedony. You find a piece of chalcedony!' },
  { Roll: 4, Value: 'Chrysoprase. You find a piece of chrysoprase!' },
  {
    Roll: 5,
    Value: 'Jasper. You find a piece of (blue, black, or brown) jasper!',
  },
  { Roll: 6, Value: 'Moonstone. You find a piece of moonstone!' },
  { Roll: 7, Value: 'Onyx. You find a piece of onyx!' },
  { Roll: 8, Value: 'Rock Crystal. You find a clear piece of rock crystal!' },
  { Roll: 9, Value: 'Sardonyx. You find (red or white) sardonyx!' },
  {
    Roll: 10,
    Value: '	Smoky Quartz. You found a (grey, yellow, or blue) smoky quartz!',
  },
  { Roll: 11, Value: '	Star Rose Quartz. You found a star rose quartz!' },
  { Roll: 12, Value: '	Zircon. You found a piece of zircon!' },
];

export const SemiPreciousStonesTable = new MyTable(
  SemiPreciousStonesData,
  'Semi-Precious Stones',
  DieType.d12
);

export const FancyStonesData: ITableRow[] = [
  {
    Roll: 1,
    Value:
      'Amber. You found a piece of amber (please do not use to make dinosuars)!',
  },
  { Roll: 2, Value: 'Alexandrite. You found a piece of alexandrite!' },
  { Roll: 3, Value: 'Amethyst. You found a piece of amethyst!' },
  { Roll: 4, Value: 'Aquamarine. You found a piece of Aquamarine!' },
  { Roll: 5, Value: 'Chrysoberyl. You found a piece of chrysoberyl' },
  { Roll: 6, Value: 'Coral. You found a piece of coral!' },
  { Roll: 7, Value: 'Garnet. You found a piece of garnet!' },
  { Roll: 8, Value: 'Jade. You found a piece of jade!' },
  { Roll: 9, Value: 'Jet. You found a piece of jet!' },
  { Roll: 10, Value: 'Pearl. You found a pearl!' },
  { Roll: 11, Value: 'Peridot. You found a peice of peridot!' },
  {
    Roll: 12,
    Value:
      'Spinel. You found a piece of (red, red-brown, deep green, or very deep blue) spinel!',
  },
  { Roll: 13, Value: 'Topaz. You found a piece of topaz!' },
  {
    Roll: 14,
    Value:
      'Tourmaline. You found a piece of (pale green, pale blue, pale brown, or pale reddish) tourmaline!',
  },
];

export const FancyStonesTable = new MyTable(
  FancyStonesData,
  'Fancy Stones',
  'd14'
);

export const GemStonesData: ITableRow[] = [
  { Roll: 1, Value: 'You found a black opal!', AltValue: 'Black Opal' },
  { Roll: 2, Value: 'You found a black sapphire!', AltValue: 'Black Sapphire' },
  { Roll: 3, Value: 'You found a diamond!', AltValue: 'Diamond' },
  { Roll: 4, Value: 'You found an emerald!', AltValue: 'Emerald' },
  { Roll: 5, Value: 'You found a fire opal!', AltValue: 'Fire Opal' },
  { Roll: 6, Value: 'You found a piece of jacinth!', AltValue: 'Jacinth' },
  { Roll: 7, Value: 'You found an opal!', AltValue: 'Opal' },
  {
    Roll: 8,
    Value: 'You found a rich purple oriental amethyst!',
    AltValue: 'Oriental Amethyst',
  },
  {
    Roll: 9,
    Value: 'You found a clear bright green oriental emerald!',
    AltValue: 'Oriental Emerald',
  },
  {
    Roll: 10,
    Value: 'You found a fiery yellow oriental topaz!',
    AltValue: 'Oriental Topaz',
  },
  { Roll: 11, Value: 'You found a ruby!', AltValue: 'Ruby' },
  { Roll: 12, Value: 'You found a sapphire!', AltValue: 'Sapphire' },
  { Roll: 13, Value: 'You found a star ruby!', AltValue: 'Star Ruby' },
  { Roll: 14, Value: 'You found a star sapphire!', AltValue: 'Star Sapphire' },
];
export const GemStonesTable = new MyTable(GemStonesData, 'Gem Stones', 'd14');

export const JewelryData: ITableRow[] = [
  {
    Roll: [1, 10],
    Value:
      'You found (ivory or wrought silver) jewelry! It is worth (d10*100) Gold!',
    AltValue: 'Ivory or Wrought Silver',
  },
  {
    Roll: [11, 20],
    Value:
      'You found a piece of jewelry made with silver and gold! It is worth (2d6*100) Gold!',
    AltValue: 'Wrought Silver and Gold',
  },
  {
    Roll: [21, 40],
    Value:
      'You found a piece of wrought gold jewelry! It is worth (3d6*100) Gold!',
    AltValue: 'Wrought Gold',
  },
  {
    Roll: [41, 50],
    Value:
      'You found a piece of jewelry made with (jade, coral or wrought platinum)! It is worth (5d6*100) Gold!',
    AltValue: 'Jade, Coral or Wrought Platinum',
  },
  {
    Roll: [51, 70],
    Value:
      'You found a silver piece of jewelry made with faceted gems! It is worth (1d6*1,000) Gold!',
    AltValue: 'Silver With Gems',
  },
  {
    Roll: [71, 90],
    Value:
      'You found a gold piece of jewerly made with faceted gems! It is worth (2d4*1,000) Gold!',
    AltValue: 'Gold With Gems',
  },
  {
    Roll: [91, 100],
    Value:
      'You found a platinum piece of jewelry made with faceted gems! It is worth (2d6*1,000) Gold!',
    AltValue: 'Platinum With Gems',
  },
];

export const JewelryTable = new MyTable(
  JewelryData,
  'Jewelry',
  DieType.percentile
);
