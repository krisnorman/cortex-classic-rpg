import { MonetaryTreasureRepository } from "./MonetaryTreasure.js";
import { ITableRow, MyTable } from "./MyTable.js";
import { MapsRepository } from "./Maps.js";
import { MagicTreasureRepository } from "./MagicTreasure.js";
import { SpellRepository } from "./Spells.js";
import { ScrollsRepository } from "./Scrolls.js";
import { PotionsRepository } from "./Potions.js";
import { CombinedHoardRepository } from "./CombinedHoard.js";
import { MagicItemsRepository } from "./MagicItems.js";
import { MagicRingsRepository } from "./MagicRings.js";
import { RodsStavesWandsRepository } from "./RodsStavesWands.js";
import { MiscMagicRepository } from "./MiscMagic.js";
import { RegularTreasureRepository } from "./RegularTreasure.js";
import { ArmorRepository } from "./Armor.js";
import { WeaponsRepository } from "./Weapons.js";
import { DieType, IDice } from "@krisnorman/rpg-utils";
import { MagicArmorRepository } from "./MagicArmor.js";
import { MagicSwordRepository } from "./MagicSwords.js";
import { MagicWeaponsRepository } from "./MagicWeapons.js";
import { IounStoneRepository } from "./IounStones.js";
import { InsturmentOfTheBardsRepository } from "./InsturmentOfTheBards.js";

export interface IFooModel {
  Title: string;
  Items: string[];
  HasItems: boolean;
}

export interface IFantasyTreasure {
  Monetary: IValueAndItems[];
}

export interface IValueAndItems {
  Value: string;
  Items: string[];
}

export interface IFantasyTreasureGenerator {
  generate(): IFantasyTreasure;
}

export class FantasyTreasureGenerator implements IFantasyTreasureGenerator {
  private readonly treasureTable = new MyTable(
    TreasureData,
    "Fantasy Treasure",
    DieType.percentile
  );

  private armorRepository: ArmorRepository;
  private weaponsRepository: WeaponsRepository;
  private regularTreasureRepository: RegularTreasureRepository;
  private spellsRepository: SpellRepository;
  private scrollsRepository: ScrollsRepository;
  private potionsRepository: PotionsRepository;
  private combinedHoardRepository: CombinedHoardRepository;
  private mapsRepository: MapsRepository;
  private monetaryTreasureRepository: MonetaryTreasureRepository;
  private magicTreasureRepository: MagicTreasureRepository;
  private magicItemsRepository: MagicItemsRepository;
  private magicRingsRepository: MagicRingsRepository;
  private rodsStavesWandsRepository: RodsStavesWandsRepository;
  private miscMagicRepository: MiscMagicRepository;
  private magicArmorRepository: MagicArmorRepository;
  private magicSwordRepository: MagicSwordRepository;
  private magicWeaponsRepository: MagicWeaponsRepository;
  private iounStoneRepository: IounStoneRepository;
  private insturmentOfTheBardsRepository: InsturmentOfTheBardsRepository;

  constructor(private readonly dice: IDice) {
    this.armorRepository = new ArmorRepository(dice);
    this.magicArmorRepository = new MagicArmorRepository(dice);
    this.magicSwordRepository = new MagicSwordRepository(dice);
    this.magicWeaponsRepository = new MagicWeaponsRepository(dice);
    this.iounStoneRepository = new IounStoneRepository(dice);
    this.insturmentOfTheBardsRepository = new InsturmentOfTheBardsRepository(
      dice
    );

    this.weaponsRepository = new WeaponsRepository(dice);
    this.regularTreasureRepository = new RegularTreasureRepository(
      dice,
      this.armorRepository,
      this.weaponsRepository
    );
    this.spellsRepository = new SpellRepository(dice);
    this.scrollsRepository = new ScrollsRepository(dice, this.spellsRepository);
    this.potionsRepository = new PotionsRepository(dice);
    this.magicRingsRepository = new MagicRingsRepository(dice);
    this.rodsStavesWandsRepository = new RodsStavesWandsRepository(dice);
    this.miscMagicRepository = new MiscMagicRepository(
      dice,
      this.spellsRepository,
      this.iounStoneRepository,
      this.insturmentOfTheBardsRepository
    );
    this.magicItemsRepository = new MagicItemsRepository(
      dice,
      this.potionsRepository,
      this.scrollsRepository,
      this.magicRingsRepository,
      this.rodsStavesWandsRepository,
      this.miscMagicRepository,
      this.magicArmorRepository,
      this.magicSwordRepository,
      this.magicWeaponsRepository
    );
    this.magicTreasureRepository = new MagicTreasureRepository(
      dice,
      this.scrollsRepository,
      this.potionsRepository,
      this.magicItemsRepository,
      this.magicRingsRepository,
      this.rodsStavesWandsRepository,
      this.miscMagicRepository,
      this.magicArmorRepository,
      this.magicSwordRepository,
      this.magicWeaponsRepository,
      this.iounStoneRepository
    );
    this.monetaryTreasureRepository = new MonetaryTreasureRepository(this.dice);
    this.combinedHoardRepository = new CombinedHoardRepository(
      dice,
      this.monetaryTreasureRepository,
      this.magicTreasureRepository
    );
    this.mapsRepository = new MapsRepository(this.dice);
  }

  generate(): IFantasyTreasure {
    const fantasyTreasure: IFantasyTreasure = { Monetary: [] };

    const roll = this.dice.roll(this.treasureTable.DieExpression);
    const row = this.treasureTable.find(roll.total);

    // Map, 1-10
    if (row.Index === 0) {
      this.getMap().forEach((item) =>
        fantasyTreasure.Monetary.push({ Value: item.Title, Items: item.Items })
      );
    }

    // Regular Treasure, 11-69
    if (row.Index === 1) {
      this.getRegularTreasure().forEach((item) =>
        fantasyTreasure.Monetary.push({ Value: item.Title, Items: item.Items })
      );
    }

    // Monetary Treasure, 70-79
    if (row.Index === 2) {
      this.getMonetaryTreasure().forEach((item) =>
        fantasyTreasure.Monetary.push({ Value: item.Title, Items: item.Items })
      );
    }

    // Magic Items, 80-89
    if (row.Index === 3) {
      this.getMagicTreasure().forEach((item) =>
        fantasyTreasure.Monetary.push({ Value: item.Title, Items: item.Items })
      );
    }

    // Combined Hoard, 90-99
    if (row.Index === 4) {
      this.getCombinedHoard().forEach((item) =>
        fantasyTreasure.Monetary.push({ Value: item.Title, Items: item.Items })
      );
    }

    // No Treasure Found, 100
    if (row.Index === 5) {
      fantasyTreasure.Monetary.push({ Value: "No Treasure Found", Items: [] });
    }

    return fantasyTreasure;
  }

  private getMagicTreasure(): IFooModel[] {
    let repo = new MagicTreasureRepository(
      this.dice,
      this.scrollsRepository,
      this.potionsRepository,
      this.magicItemsRepository,
      this.magicRingsRepository,
      this.rodsStavesWandsRepository,
      this.miscMagicRepository,
      this.magicArmorRepository,
      this.magicSwordRepository,
      this.magicWeaponsRepository,
      this.iounStoneRepository
    );
    let model = repo.getRandom();
    return model;
  }

  private getMap(): IFooModel[] {
    const map = this.mapsRepository.getRandom();
    return map;
  }

  private getRegularTreasure(): IFooModel[] {
    const item = this.regularTreasureRepository.getRandom();
    return item;
  }

  private getMonetaryTreasure(): IFooModel[] {
    const treasure = this.monetaryTreasureRepository.getRandom();
    return treasure;
  }

  private getCombinedHoard(): IFooModel[] {
    const result = this.combinedHoardRepository.getRandom();
    return result;
  }
}

export const TreasureData: ITableRow[] = [
  { Roll: [1, 10], Value: "Map" },
  { Roll: [11, 69], Value: "Regular Treasure" },
  {
    Roll: [70, 79],
    Value: "Monetary Treasure",
  },
  { Roll: [80, 89], Value: "Magic Items" },
  { Roll: [90, 99], Value: "Combined Hoard" },
  { Roll: 100, Value: "No Treasure Found" },
];

export const TreasureTable = new MyTable(
  TreasureData,
  "Treasure",
  DieType.percentile
);
