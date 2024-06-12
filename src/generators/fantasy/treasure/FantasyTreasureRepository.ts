import { TreasureTable } from './FantasyTreasureGenerator.js';
import { ITableRow, MyTable } from './MyTable.js';
import {
  MonetaryTreasureTable,
  GemsTable,
  JewelryTable,
  GemsData,
  OrnamentalStonesTable,
  SemiPreciousStonesTable,
  FancyStonesTable,
  GemStonesTable,
  JewelryData,
} from './MonetaryTreasure.js';
// import { RegularTreasureTable } from './RegularTreasure.js';
// import { ArmorTable } from './Armor.js';
// import { WeaponsTable } from './Weapons.js';
import { MagicTreasureTable } from './MagicTreasure.js';
import { PotionsTable } from './Potions.js';
import { IDice } from '@krisnorman/rpg-utils';
// import { SpellsTable } from './Spells.js';
// import { ScrollsTable } from './Scrolls.js';

export class FantasyTreasureRepository {
  private readonly treasureTable: MyTable<ITableRow>;
  private readonly monetaryTreasureTable: MyTable<ITableRow>;
  private readonly gemsTable: MyTable<ITableRow>;
  private readonly jewelryTable: MyTable<ITableRow>;
  private readonly ornamentalStonesTable: MyTable<ITableRow>;
  private readonly semiPreciousStonesTable: MyTable<ITableRow>;
  private readonly fancyStonesTable: MyTable<ITableRow>;
  private readonly gemstonesTable: MyTable<ITableRow>;  
  private readonly regularTreasureTable: MyTable<ITableRow>;
  private readonly armorTable: MyTable<ITableRow>;
  private readonly weaponsTable: MyTable<ITableRow>;
  private readonly magicTreasureTable: MyTable<ITableRow>;
  private readonly potionsTable: MyTable<ITableRow>;
  private readonly spellsTable: MyTable<ITableRow>;
  private readonly scrollsTable: MyTable<ITableRow>;

  constructor(private dice: IDice) {
    this.treasureTable = this.getTableByName('treasuretable');
    this.monetaryTreasureTable = this.getTableByName('monetarytreasuretable');
    this.gemsTable = this.getTableByName('gemstable');
    this.jewelryTable = this.getTableByName('jewelrytable');
    this.ornamentalStonesTable = this.getTableByName('ornamentalstonestable');
    this.semiPreciousStonesTable = this.getTableByName(
      'semipreciousstonestable'
    );
    this.fancyStonesTable = this.getTableByName('fancystonestable');
    this.gemstonesTable = this.getTableByName('gemstonestable');
    this.regularTreasureTable = this.getTableByName('regulartreasuretable');
    this.armorTable = this.getTableByName('armortable');
    this.weaponsTable = this.getTableByName('weaponstable');
    this.magicTreasureTable = this.getTableByName('magictreasuretable');
    this.potionsTable = this.getTableByName('potionstable');
    this.spellsTable = this.getTableByName('spellstable');
    this.scrollsTable = this.getTableByName('scrollstable');

    this.initSpellsData();
    this.initPotionsData();
    this.initMagicTreasureData();
    this.initRegularTreasureData();
    this.initJewelryData();
    this.initGemsData();
    this.initMonetaryTreasureData();
    this.initTreasureData();
  }

  private initTreasureData(): void {
    const table = this.treasureTable;
    const rows = table.Rows;
    rows.forEach((row) => (row.TableName = 'treasuretable'));

    // Monetary Treasure
    rows[2].Value = `${this.getValue(this.monetaryTreasureTable)}`;
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

  private initRegularTreasureData(): void {
    const table = this.getTableByName('regulartreasuretable');
    const rows = table.Rows;
    rows.forEach((row) => (row.TableName = 'regulartreasuretable'));

    // Armor
    rows[0].Value = this.getValue(this.armorTable);
    // Weapons
    rows[1].Value = this.getValue(this.weaponsTable);
  }

  private initMagicTreasureData(): void {
    const table = this.getTableByName('magictreasuretable');
    const rows = table.Rows;
    rows.forEach((row) => (row.TableName = 'magictreasuretable'));

    // Any item rolled on Magic Item Table, plus 4 Potions
    // Any 2 items rolled on Magic Item Table
    // 1 sword, 1 Armor/Shield, 1 Misc. Weapon
    // Any 3 items, no swords or potions
    // Any 6 potions and any 6 scrolls
    // 1 ring, 1 rod, and any 2 other items
    // 1 rod, 1 misc. magic item, and any 3 other items
  }

  private initPotionsData(): void {
    const table = this.getTableByName('potionstable');
    const rows = table.Rows;
    rows.forEach((row) => (row.TableName = 'potionstable'));
  }

  private initSpellsData(): void {
    const table = this.getTableByName('spellstable');
    const rows = table.Rows;
    rows.forEach((row) => (row.TableName = 'spellstable'));
  }

  private initScrollsData(): void {
    const table = this.getTableByName('scrollstable');
    const rows = table.Rows;
    rows.forEach((row) => (row.TableName = 'scrollstable'));
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

  getTableByName(name: string): MyTable<ITableRow> {
    if (name === undefined || name === '')
      throw new Error('Name cannot be null or empty.');

    switch (name.toLowerCase()) {
      case 'treasuretable':
        return TreasureTable;
      case 'monetarytreasuretable':
        return MonetaryTreasureTable;
      case 'gemstable':
        return GemsTable;
      case 'ornamentalstonestable':
        return OrnamentalStonesTable;
      case 'semipreciousstonestable':
        return SemiPreciousStonesTable;
      case 'fancystonestable':
        return FancyStonesTable;
      case 'gemstonestable':
        return GemStonesTable;
      case 'jewelrytable':
        return JewelryTable;      
      // case 'regulartreasuretable':
      //   return RegularTreasureTable;
      // case 'armortable':
      //   return ArmorTable;
      // case 'weaponstable':
      //   return WeaponsTable;
      case 'magictreasuretable':
        return MagicTreasureTable;
      case 'potionstable':
        return PotionsTable;
      // case 'spellstable':
      //   return SpellsTable;
      // case 'scrollstable':
      //   return ScrollsTable;
      default:
        throw new Error(`Table '${name}' not found.`);
    }
  }

  private getRoll(expression: string): number {
    return this.dice.roll(expression).total;
  }

  private getValue(table: MyTable<ITableRow>): string {
    const roll = this.getRoll(table.DieExpression);
    const result = table.find(roll);
    return result.Row.Value;
  }
}
