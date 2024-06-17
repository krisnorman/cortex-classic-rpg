import { ITableRow, MyTable } from "./MyTable.js";
import { IFooModel } from "./FantasyTreasureGenerator.js";
import { SpellRepository } from "./Spells.js";
import { DieType, IDice, IGenericRowResult } from "@krisnorman/rpg-utils";
import { IounStoneRepository } from "./IounStones.js";
import { InsturmentOfTheBardsRepository } from "./InsturmentOfTheBards.js";
import "../../../extensions/Extensions.js";

export class MiscMagicRepository {
  private readonly miscMagic1Table = new MyTable(
    MiscMagic1Data,
    "Misc. Magic Table 1",
    DieType.percentile
  );
  private readonly miscMagic2Table = new MyTable(
    MiscMagic2Data,
    "Misc. Magic Table 2",
    DieType.percentile
  );
  private readonly miscMagic3Table = new MyTable(
    MiscMagic3Data,
    "Misc. Magic Table 3",
    DieType.percentile
  );
  private readonly miscMagic4Table = new MyTable(
    MiscMagic4Data,
    "Misc. Magic Table 4",
    DieType.percentile
  );
  private readonly miscMagic5Table = new MyTable(
    MiscMagic5Data,
    "Misc. Magic Table 5",
    DieType.percentile
  );
  private readonly miscMagicSpecialTable = new MyTable(
    MiscMagicSpecialData,
    "Misc. Magic Special Table",
    DieType.percentile
  );

  constructor(
    private readonly dice: IDice, 
    private readonly spellsRepository: SpellRepository,
    private readonly iounStoneRepository: IounStoneRepository,
    private readonly insturmentOfTheBardsRepository: InsturmentOfTheBardsRepository
  ) {}

  getRandom(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;

    const items: IFooModel[] = [];

    const getMiscFn = [
      () => this.getMisc1(),
      () => this.getMisc2(),
      () => this.getMisc3(),
      () => this.getMisc4(),
      () => this.getMisc5(),
    ];

    for (let index = 0; index < count; index++) {
      const item = getMiscFn.getRandom();
      items.push(...item());
    }

    return items;
  }

  getMisc1(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    const processor = new MiscMagic1Processor(
      this.dice,
      this.miscMagic1Table,
      this.miscMagicSpecialTable,
      this.spellsRepository
    );
    const items: IFooModel[] = processor.getMiscMagic(count);
    return items;
  }

  getMisc2(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    const processor = new MiscMagic2Processor(this.dice, this.miscMagic2Table);
    const items: IFooModel[] = processor.getMiscMagic(count);
    return items;
  }

  getMisc3(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    const processor = new MiscMagic3Processor(
      this.dice, 
      this.miscMagic3Table, 
      this.iounStoneRepository,
    this.insturmentOfTheBardsRepository);
    const items: IFooModel[] = processor.getMiscMagic(count);
    return items;
  }

  getMisc4(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    const processor = new MiscMagic4Processor(this.dice, this.miscMagic4Table);
    const items: IFooModel[] = processor.getMiscMagic(count);
    return items;
  }

  getMisc5(count: number = 1): IFooModel[] {
    if (count < 1) count = 1;
    const processor = new MiscMagic5Processor(this.dice, this.miscMagic5Table);
    const items: IFooModel[] = processor.getMiscMagic(count);
    return items;
  }
}

class MiscMagic1Processor {
  constructor(
    private dice: IDice,
    private misc1table: MyTable<ITableRow>,
    private miscSpecialtable: MyTable<ITableRow>,
    private spellsRepository: SpellRepository
  ) {}

  getMiscMagic(count: number): IFooModel[] {
    if (count < 1) count = 1;

    const items: IFooModel[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.misc1table.DieExpression);
      const row = this.misc1table.find(roll.total);
      const obj = this.getProcessed(row);
      items.push(...obj);
    }

    return items;
  }

  private getProcessed(row: IGenericRowResult<ITableRow>): IFooModel[] {
    let results: IFooModel[] = [];

    switch (true) {
      // Artifact or Relic*, 7
      // GOTO Misc. Magic Special Table, roll once, PRINT result
      case row.Index === 7:
        results.push(this.getArtifact());
        break;
      // Beaker of Plentiful Potions, 30-31
      case row.Index === 13:
        const potionCount = this.dice.roll("1d4+1").total;
        const potionDoses = this.dice.roll("1d4+1").total;
        const potionsTitle =
          `You find a Beaker of Plentiful Potions! It can create ${potionCount} random potions; ` +
          `each potion holds ${potionDoses} doses.`;
        results.push({ Title: potionsTitle, Items: [], HasItems: false });
        break;
      // Book of Infinite Spells, 16
      case row.Index === 16:
        results.push(...this.getSpells(row));
        break;
      // Bag of Beans, 18-20
      case row.Index === 17:
        const beanCount = this.dice.roll("3d4").total;
        const title = row.Row.Value.replace("3d4", beanCount.toString());
        results.push({ Title: title, Items: [], HasItems: false });
        break;
      // Boots of Dancing, 36
      // Reroll 37-55, print result, and add ** to the description
      case row.Index === 18:
        results.push(...this.getBootsOfDancing("1d55r<37"));
        break;
      default:
        results.push({ Title: row.Row.Value, Items: [], HasItems: false });
    }

    return results;
  }

  private getArtifact(): IFooModel {
    let roll = this.dice.roll(this.miscSpecialtable.DieExpression);
    let row = this.miscSpecialtable.find(roll.total);
    let result: IFooModel = {
      Title: row.Row.Value,
      Items: [],
      HasItems: false,
    };
    return result;
  }

  private getSpells(row: IGenericRowResult<ITableRow>): IFooModel[] {
    const spellCount = this.dice.roll("1d7+22").total;
    const title = row.Row.Value.replace("22+1d7", spellCount.toString());
    const result: IFooModel[] = [{ Title: title, Items: [], HasItems: false }];
    const spells = this.spellsRepository.getRandom(spellCount);
    result.push(...spells);
    return result;
  }

  private getBootsOfDancing(dieExpression: string): IFooModel[] {
    const roll = this.dice.roll(dieExpression);
    const row = this.misc1table.find(roll.total);
    let result: IFooModel = {
      Title: row.Row.Value,
      Items: [],
      HasItems: false,
    };
    return [result];
  }
}

class MiscMagic2Processor {
  constructor(private dice: IDice, private misc2table: MyTable<ITableRow>) {}

  getMiscMagic(count: number = 1, preRoll?: number): IFooModel[] {
    if (count < 1) count = 1;
    const items: IFooModel[] = [];

    for (let index = 0; index < count; index++) {
      const roll =
        preRoll === undefined
          ? this.dice.roll(this.misc2table.DieExpression).total
          : preRoll;
      const row = this.misc2table.find(roll);

      switch (true) {
        case row.Index === 4:
          const title = row.Row.Value.replace(
            "1d10",
            this.dice.roll("1d10").total.toString()
          );
          items.push({ Title: title, Items: [], HasItems: false });
          break;
        case row.Index === 9:
          items.push({
            Title: this.getCloakOfPoisonousness(),
            Items: [],
            HasItems: false,
          });

          break;
        // You find a Cube of Force! It has 1d36 charges left.
        case row.Index === 13:
          items.push({
            Title: row.Row.Value.replace(
              "1d36",
              this.dice.roll("1d36").total.toString()
            ),
            Items: [],
            HasItems: false,
          });
          break;
        // You find a Cubic Gate! It has 1d3 charges left in it.
        case row.Index === 15:
          items.push({
            Title: row.Row.Value.replace(
              "1d3",
              this.dice.roll("1d3").total.toString()
            ),
            Items: [],
            HasItems: false,
          });
          break;
        // You find a small pouch with Dust of Appearance inside! It has 1d100 uses left.
        case row.Index === 21:
          items.push({
            Title: row.Row.Value.replace(
              "1d100",
              this.dice.roll("1d100").total.toString()
            ),
            Items: [],
            HasItems: false,
          });
          break;
        // You find a small pouch with Dust of Disappearance inside! It has 1d10 uses left.
        case row.Index === 22:
          items.push({
            Title: row.Row.Value.replace(
              "1d10",
              this.dice.roll("1d10").total.toString()
            ),
            Items: [],
            HasItems: false,
          });
          break;
        //You find Eyes of Charming! They have 1d3 charges left.
        case row.Index === 26:
          items.push({
            Title: row.Row.Value.replace(
              "1d3",
              this.dice.roll("1d3").total.toString()
            ),
            Items: [],
            HasItems: false,
          });
          break;
        default:
          items.push({ Title: row.Row.Value, Items: [], HasItems: false });
      }
    }

    return items;
  }

  private getCloakOfPoisonousness(): string {
    // Roll 14-55, ignoring 31-32, print result, adding ** at the end of the descriptor.
    let rollNumber: number = 0;
    let shouldContinue: boolean = true;

    while (shouldContinue) {
      const roll = this.dice.roll("1d55r<14");

      if (roll.total === 31 || roll.total === 32) {
        shouldContinue = true;
      } else {
        rollNumber = roll.total;
        shouldContinue = false;
        break;
      }
    }

    const rowResult = this.getMiscMagic(1, rollNumber);
    const title = `${rowResult[0].Title}(**)`;
    return title;
  }
}

class MiscMagic3Processor {
  constructor(
    private readonly dice: IDice, 
    private readonly misc3table: MyTable<ITableRow>,
    private readonly iounStonesRepository: IounStoneRepository,
    private readonly insturmentOfTheBardsRepository: InsturmentOfTheBardsRepository
  ) {}

  getMiscMagic(count: number = 1, preRoll?: number): IFooModel[] {
    if (count < 1) count = 1;
    const items: IFooModel[] = [];

    for (let index = 0; index < count; index++) {
      const roll =
        preRoll === undefined
          ? this.dice.roll(this.misc3table.DieExpression).total
          : preRoll;
      const row = this.misc3table.find(roll);

      let title = row.Row.Value;
      // Figurine of Wondrous Power
      if (row.Index === 0) {
        title = this.getFigurineOfWondrousPower(row.Row.Value);
      }
      // Gauntlets of Fumbling
      if (row.Index === 3) {
        title = this.getGauntletsOfFumbling();
      }
      // Gem of Brightness
      if (row.Index === 6) {
        title = row.Row.Value.replace(
          "1d50",
          this.dice.roll("1d50").total.toString()
        );
      }
      // Girdle of Giant Strength
      if (row.Index === 9) {
        title = row.Row.Value.replace(
          "(1d6)",
          this.dice.roll("1d6").total.toString()
        );
      }
      // Helm of Brilliance
      if (row.Index === 10) {
        const diamonds = this.dice.roll("1d10").total.toString();
        const rubies = this.dice.roll("1d20").total.toString();
        const fireOpals = this.dice.roll("1d30").total.toString();
        const opals = this.dice.roll("1d40").total.toString();
        title = row.Row.Value.replace("1d10", diamonds)
          .replace("1d20", rubies)
          .replace("1d30", fireOpals)
          .replace("1d40", opals);
      }
      // Helm of Lightning
      if (row.Index === 12) {
        title = this.getHelmOfLightning();
      }
      // Helm of Teleportation
      if (row.Index === 14) {
        title = row.Row.Value.replace(
          "1d3",
          this.dice.roll("1d3").total.toString()
        );
      }
      // Horn of Bubbles
      if (row.Index === 17) {
        title = this.getHornOfBubbles();
      }
      // Horn of Collapsing
      if (row.Index === 18) {
        title = this.getHornOfCollapsing();
      }
      // Horn of Valhalla
      if (row.Index === 20) {
        title = this.getHornOfValhalla(row.Row);
      }
      // Incense of Meditation
      if (row.Index === 23) {
        title = row.Row.Value.replace(
          "1d12",
          this.dice.roll("1d12").total.toString()
        );
      }
      // Ioun Stones
      if (row.Index === 25) {
        title = this.getIounStones();
      }
      // Instrument of the Bards
      if (row.Index === 26) {
        title = this.getInsturmentOfTheBards();
      }
      // Iron Flask
      if (row.Index === 27) {
        const ironFlaskContents =
          this.dice.roll("d2").total == 2
            ? "It has 1 creature trapped inside it."
            : "";
        title = row.Row.Value.replace(
          "It has (0-1) creatures trapped inside it.",
          ironFlaskContents
        );
      }
      // Javelin of Piercing
      if (row.Index === 29) {
        title = row.Row.Value.replace(
          "2d4",
          this.dice.roll("2d4").total.toString()
        );
      }
      // Jewel of Flawlessness
      if (row.Index === 31) {
        title = row.Row.Value.replace(
          "1d100",
          this.dice.roll("1d100").total.toString()
        );
      }
      // Keoghtom's Ointment
      if (row.Index === 32) {
        title = row.Row.Value.replace(
          "1d4+1",
          this.dice.roll("1d4+1").total.toString()
        );
      }
      const item: IFooModel = {
        Title: title,
        Items: [],
        HasItems: false,
      };
      items.push(item);
    }

    return items;
  }

  private getFigurineOfWondrousPower(value: string): string {
    const figurines = [
      "Bronze Griffon",
      "Ebony Fly",
      "Golden Lions (pair)",
      "Ivory Goats (trio)",
      "Marble Elephant",
      "Obsidian Steed",
      "Onyx Dog",
      "Serpentine Owl",
      "Silver Raven",
    ];
    const title = `${value} ${figurines.getRandom()}`;
    return title;
  }

  private getGauntletsOfFumbling(): string {
    // Reroll 17-25, ignoring 19-20, Print result with ** at end of descriptor
    let rollNumber: number = 0;
    let shouldContinue: boolean = true;

    while (shouldContinue) {
      const roll = this.dice.roll("1d25r<17");

      if (roll.total === 19 || roll.total === 20) {
        shouldContinue = true;
      } else {
        rollNumber = roll.total;
        shouldContinue = false;
        break;
      }
    }

    const rowResult = this.getMiscMagic(1, rollNumber);
    const title = `${rowResult[0].Title}(**)`;
    return title;
  }

  private getHelmOfLightning(): string {
    // Reroll 30-45, ignore 36-37, print result with ** at end of descriptor
    let rollNumber: number = 0;
    let shouldContinue: boolean = true;

    while (shouldContinue) {
      const roll = this.dice.roll("1d45r<30");

      if (roll.total === 36 || roll.total === 37) {
        shouldContinue = true;
      } else {
        rollNumber = roll.total;
        shouldContinue = false;
        break;
      }
    }

    const rowResult = this.getMiscMagic(1, rollNumber);
    const title = `${rowResult[0].Title}(**)`;
    return title;
  }

  private getHornOfBubbles(): string {
    // reroll 46-60, ignore 47-48, print result with ** at the end of the description
    let rollNumber: number = 0;
    let shouldContinue: boolean = true;

    while (shouldContinue) {
      const roll = this.dice.roll("1d60r<46");

      if (roll.total === 47 || roll.total === 48) {
        shouldContinue = true;
      } else {
        rollNumber = roll.total;
        shouldContinue = false;
        break;
      }
    }

    const rowResult = this.getMiscMagic(1, rollNumber);
    const title = `${rowResult[0].Title}(**)`;
    return title;
  }

  private getHornOfCollapsing(): string {
    // reroll 46-60, ignore 49, print result with ** at the end of the description
    let rollNumber: number = 0;
    let shouldContinue: boolean = true;

    while (shouldContinue) {
      const roll = this.dice.roll("1d60r<46");

      if (roll.total === 49) {
        shouldContinue = true;
      } else {
        rollNumber = roll.total;
        shouldContinue = false;
        break;
      }
    }

    const rowResult = this.getMiscMagic(1, rollNumber);
    const title = `${rowResult[0].Title}(**)`;
    return title;
  }

  private getHornOfValhalla(row: ITableRow): string {
    // Silver horn = 2d4+2 warriors; Brass horn = 3d4+3 warriors; Bronze Horn = 4d4+4 warriors; Iron horn = 5d4+5 warriors.
    const silverHorn: [string, string] = ["a Silver", "2d4+2 warriors"];
    const brassHorn: [string, string] = ["a Brass", "3d4+3 warriors"];
    const bronzeHorn: [string, string] = ["a Bronze", "4d4+4 warriors"];
    const ironHorn: [string, string] = ["an Iron", "5d4+5 warriors"];
    const selected = [silverHorn, brassHorn, bronzeHorn, ironHorn].getRandom();    
    const title = row.Value.replace(
      "a (silver/brass/bronze/iron) Horn of Valhalla",
      `${selected[0]} Horn of Valhalla (${selected[1]})`
    );
    return title;
  }

  private getIounStones(): string {
    return this.iounStonesRepository.getRandom()[0].Title;
  }

  private getInsturmentOfTheBards(): string {
    return this.insturmentOfTheBardsRepository.getRandom()[0].Title;
  }
}

class MiscMagic4Processor {
  constructor(private dice: IDice, private misc4table: MyTable<ITableRow>) {}

  getMiscMagic(count: number = 1, preRoll?: number): IFooModel[] {
    if (count < 1) count = 1;
    const items: IFooModel[] = [];

    for (let index = 0; index < count; index++) {
      const roll =
        preRoll === undefined
          ? this.dice.roll(this.misc4table.DieExpression).total
          : preRoll;

      const row = this.misc4table.find(roll);
      let title = row.Row.Value;
      // Manual of Golems
      if (row.Index === 6) {
        const golemTypes = ["clay", "flesh", "iron", "stone"];
        title =
          `You find a Manual of Golems! After reading this tome you learn how to create ` +
          `a ${golemTypes.getRandom()} golem.`;
      }
      // Mirror of Life Trapping
      if (row.Index === 14) {
        const mirrorRoll = this.dice.roll("1d100").total;
        switch (true) {
          case mirrorRoll <= 50:
            title =
              "Mirror of Life Trapping. Mirror is deactivated and appears to be a large wall mirror " +
              "with magical creatures adorning the frame.";
            break;
          case mirrorRoll > 50:
            title =
              "Mirror of Life Trapping. Mirror is active and will attempt to pull the person or living creature into " +
              "the one of the 15 extradimensional pockets.";
            break;
        }
      }
      // Necklace of Missiles
      if (row.Index === 18) {
        title = row.Row.Value.replace(
          "1d6",
          this.dice.roll("1d6").total.toString()
        );
      }
      // Necklace of Prayer Beads
      if (row.Index === 19) {
        title = row.Row.Value.replace(
          "1d6",
          this.dice.roll("1d6").total.toString()
        );
      }
      // Necklace of Strangulation
      if (row.Index === 20) {
        title = this.getNecklaceOfStrangulation();
      }
      // Periapt of Foul Rattling
      if (row.Index === 26) {
        title = this.getPeriaptOfFoulRattling();
      }
      // Phylactery of Monstrous Attention
      if (row.Index === 32) {
        title = this.getPhylacteryOfMonstrousAttention();
      }
      const item: IFooModel = {
        Title: title,
        Items: [],
        HasItems: false,
      };
      items.push(item);
    }

    return items;
  }

  private getNecklaceOfStrangulation(): string {
    // Reroll 20-27, print result, adding ** at the end.
    const roll = this.dice.roll("1d27r<20");
    const rowResult = this.getMiscMagic(1, roll.total);
    const title = `${rowResult[0].Title}(**)`;
    return title;
  }

  private getPeriaptOfFoulRattling(): string {
    // ORIGINAL Reroll 49-60, print result, adding ** at the end.
    // Modified to: Reroll 51-60, print result, adding ** at the end.
    const roll = this.dice.roll("1d60r<51");
    const rowResult = this.getMiscMagic(1, roll.total);
    const title = `${rowResult[0].Title}(**)`;
    return title;
  }

  private getPhylacteryOfMonstrousAttention(): string {
    // Reroll 61-70, print result, adding ** at the end.
    const roll = this.dice.roll("1d70r<61");
    const rowResult = this.getMiscMagic(1, roll.total);
    const title = `${rowResult[0].Title}(**)`;
    return title;
  }
}

class MiscMagic5Processor {
  constructor(private dice: IDice, private misc5table: MyTable<ITableRow>) {}

  getMiscMagic(count: number = 1, preRoll?: number): IFooModel[] {
    if (count < 1) count = 1;
    const items: IFooModel[] = [];

    for (let index = 0; index < count; index++) {
      const roll =
        preRoll === undefined
          ? this.dice.roll(this.misc5table.DieExpression).total
          : preRoll;

      const row = this.misc5table.find(roll);
      let title = row.Row.Value;

      switch (true) {
        // Robe of Powerlessness
        case row.Index === 3:
          title = this.getRobeOfPowerlessness();
          break;
        // Robe of Scintilating Colors
        case row.Index === 4:
          title = row.Row.Value.replace(
            "1d3",
            this.dice.roll("1d3").total.toString()
          );
          break;
        // Robe of Useful Items
        case row.Index === 5:
          title = row.Row.Value.replace(
            "1d100",
            this.dice.roll("1d100").total.toString()
          );
          break;
        // Rope of Constriction
        case row.Index === 7:
          title = this.getRobeOfConstriction();
          break;
        // Scarab of Protection
        case row.Index === 15:
          title = row.Row.Value.replace(
            "1d12",
            this.dice.roll("1d12").total.toString()
          );
          break;
        // Talisman of Healing
        case row.Index === 21:
          title = row.Row.Value.replace(
            "1d6+1",
            this.dice.roll("1d6+1").total.toString()
          );
        // Talisman of Pain
        case row.Index === 23:
          title = row.Row.Value.replace(
            "1d6+1",
            this.dice.roll("1d6+1").total.toString()
          );
          break;
        // Trident of Fish Command
        case row.Index === 28:
          title = row.Row.Value.replace(
            "1d3",
            this.dice.roll("1d3").total.toString()
          );
          break;
        // Trident of Yearning
        case row.Index === 31:
          title = this.getTridentOfYearning();
          break;
        // Vacuous Grimoire
        case row.Index === 32:
          title = this.getVacuousGrimoire();
          break;
        // Wings of Flying
        case row.Index === 34:
          title = row.Row.Value.replace(
            "1d12",
            this.dice.roll("1d12").total.toString()
          );
          break;
        default:
          title = row.Row.Value;
      }

      const item: IFooModel = {
        Title: title,
        Items: [],
        HasItems: false,
      };
      items.push(item);
    }

    return items;
  }

  private getRobeOfPowerlessness(): string {
    // Reroll 1-19, ignoring 10, print result with ** at the end of the description.
    let rollNumber: number = 0;
    let shouldContinue: boolean = true;

    while (shouldContinue) {
      const roll = this.dice.roll("1d19");

      if (roll.total === 10) {
        shouldContinue = true;
      } else {
        rollNumber = roll.total;
        shouldContinue = false;
        break;
      }
    }

    const rowResult = this.getMiscMagic(1, rollNumber);
    const title = `${rowResult[0].Title}(**)`;
    return title;
  }

  private getRobeOfConstriction(): string {
    // reroll 20-31, ignoring 26-27, print result with a ** and the end.
    let rollNumber: number = 0;
    let shouldContinue: boolean = true;

    while (shouldContinue) {
      const roll = this.dice.roll("1d31r<20");

      if (roll.total === 26 || roll.total === 27) {
        shouldContinue = true;
      } else {
        rollNumber = roll.total;
        shouldContinue = false;
        break;
      }
    }

    const rowResult = this.getMiscMagic(1, rollNumber);
    const title = `${rowResult[0].Title}(**)`;
    return title;
  }

  private getTridentOfYearning(): string {
    // Reroll 70-83, print result with a ** at the end.
    const roll = this.dice.roll("1d83r<70");
    const rowResult = this.getMiscMagic(1, roll.total);
    const title = `${rowResult[0].Title}(**)`;
    return title;
  }

  private getVacuousGrimoire(): string {
    // Reroll 61-69, print result with a ** at the end.
    const roll = this.dice.roll("1d69r<61");
    const rowResult = this.getMiscMagic(1, roll.total);
    const title = `${rowResult[0].Title}(**)`;
    return title;
  }
}

export const MiscMagic1Data: ITableRow[] = [
  {
    Roll: [1, 2],
    Value:
      "You found an alchemy jug! It can be used once a day to produce ONE of the following liquids " +
      "that you declare before opening the jug: " +
      "Acid	8 ounces, Basic poison 1/2 ounce; Beer 4 gallons; Honey 1 gallon; Mayonnaise 2 gallons; Oil 1 quart; " +
      "Vinegar 2 gallons; Water, fresh 8 gallons; Water, salt 12 gallons; Wine 1 gallon",
  },
  {
    Roll: [3, 4],
    Value: "You found an Amulet of Proof against Direction and Location!**",
  },
  {
    Roll: 5,
    Value:
      "You found an Amulet of Life Protection! This amulet gives the wearer a +6 to resistance " +
      "versus spells that cause instant death!",
  },
  { Roll: [6, 7], Value: "You found an Amulet of the Planes!" },
  {
    Roll: [8, 11],
    Value: "You found an Amulet of Proof against Direction and Location!",
  },
  { Roll: [12, 13], Value: "You find a large, oddly-shaped barrel.*" },
  { Roll: [14, 16], Value: "You find an Arrow of Direction!" },
  {
    Roll: 17,
    Value:
      "**Artifact or Relic*, GOTO Misc. Magic Special Table, roll once, PRINT result",
  },
  {
    Roll: [18, 20],
    Value:
      "You find a bag of beans! Inside are 3d4 dry beans. Each planted bean has a random effect.",
  },
  { Roll: 21, Value: "You find a bag of holding!**" },
  { Roll: [22, 26], Value: "You find a bag of holding!" },
  { Roll: 27, Value: "You found a bag of holding!*" },
  {
    Roll: [28, 29],
    Value: "You find a bag of tricks! It can be used up to 3 times a day.",
  },
  {
    Roll: [30, 31],
    Value:
      "You find a Beaker of Plentiful Potions! It can create 1d4+1 random potions; each potion holds 1d4+1 doses.",
  },
  {
    Roll: 32,
    Value:
      "You find a folding boat! When unfolded, it can hold up to 4 medium sized creatures comfortably.",
  },
  {
    Roll: 33,
    Value:
      "You find a book of Exalted Deeds! Reading this book gives the reader the following permanently: " +
      "2 random assets, a +2 die types to Spellcasting, +2 die types to Willpower, and a protective Halo. " +
      "The book disappears as soon as it is read.",
  },
  {
    Roll: 34,
    Value:
      "You find a book of Infinite Spells! It contains 22+1d7 random spells. " +
      "The first person to open the book is the owner of the book, " +
      "and can cast 1 random spell from the book per page. The same spell can be cast up to 10 times, " +
      "and then the book will automatically move forward to the next spell. " +
      "Once a page is turned, the owner of the book cannot turn back the pages. " +
      "When the final page is turned, the book disappears.",
  },
  { Roll: 35, Value: "You find a book of Infinite Spells!**" },
  {
    Roll: 36,
    Value:
      "**Boots of Dancing, Reroll 37-55, print result, and add ** to the description",
  },
  {
    Roll: [37, 42],
    Value:
      "You find boots of Elvenkind! They give you a +6 to move silently checks!",
  },
  { Roll: [43, 47], Value: "You find boots of Levitation!" },
  {
    Roll: [48, 50],
    Value:
      "You find boots of speed! When the heels are clicked together " +
      "you gain one extra attack or action every round for 10 rounds.",
  },
  {
    Roll: [52, 55],
    Value:
      "You find boots of Striding and Springing! " +
      "These boots increase your walking speed to 30 ft per round, and you can jump 3 times the normal distance.",
  },
  {
    Roll: [56, 58],
    Value:
      "You found a bowl of Commanding Water Elementals! When filled with water, once per day, " +
      "you can use it to summon 1 water elemental.",
  },
  { Roll: 59, Value: "You found a bowl of Commanding Water Elementals!**" },
  {
    Roll: [60, 79],
    Value:
      "You find Bracers of Defense! They give you an extra 2 wound point armor.",
  },
  { Roll: [80, 81], Value: "You find Bracers of Defense!**" },
  {
    Roll: [82, 84],
    Value:
      "You find a Brazier of Commanding Fire Elementals! Once per day, when let, you may summon a fire elemental.",
  },
  { Roll: 85, Value: "You find a Brazier of Commanding FIre Elementals!**" },
  {
    Roll: [86, 92],
    Value:
      "You find a Brooch of Shielding! It gives you a +6 resistance versus " +
      "force effects and a +12 resistance to magic missile.",
  },
  { Roll: 93, Value: "You find a Broom of Flying!**" },
  {
    Roll: [94, 98],
    Value:
      "You find a Broom of Flying! It can carry up to 200 lbs at a speed of 50 ft, or up to 400 lbs at up to 30 ft.",
  },
  {
    Roll: [99, 100],
    Value:
      "You found Bucknard's Everfull Purse! If one gold coin is placed into this bag, " +
      "the next day it will have 25 gold coins. Does not work if more than one coin is inserted, " +
      "or if the coin is made of a metal other than gold.",
  },
];

export const MiscMagic2Data: ITableRow[] = [
  // Index 0
  {
    Roll: [1, 6],
    Value:
      "You find a Candle of Invocation! When burned, your mana points temporarily double for 24 hours.",
    AltValue: "Candle of Invocation",
  },
  // Index 1
  {
    Roll: [7, 8],
    Value:
      "You found a Carpet of Flying! It is (5/10) ft wide by (5/10) ft long!",
    AltValue: "Carpet of Flying",
  },
  // Index 2
  {
    Roll: [9, 10],
    Value:
      "You found a Censer of Controlling Air Elementals! When filled with incense and lit, " +
      "you can summon 1 air elemental per day.",
    AltValue: "Censer Contolling Air Elementals",
  },
  // Index 3
  {
    Roll: 11,
    Value: "You found a Censer of Controlling Air Elementals!**",
    AltValue: "Censer of Summoning Hostile Air Elementals",
  },
  // Index 4
  {
    Roll: [12, 13],
    Value: "You find a Chime of Opening! It has 1d10 uses left.",
    AltValue: "Chime of Opening",
  },
  // Index 5
  {
    Roll: 14,
    Value: "You find a Chime of Opening!**",
    AltValue: "Chime of Hunger",
  },
  // Index 6
  {
    Roll: [15, 18],
    Value:
      "You find a Cloak of Displacement! All creatures attacking you take a -4 on their attack roll " +
      "when you are wearing this cloak.",
    AltValue: "Cloak of Displacement",
  },
  // Index 7
  {
    Roll: [19, 27],
    Value:
      "You find a Cloak of Elvenkind! When you are wearing it, you gain a +4 to Stealth " +
      "skill checks and creatures attempting to Spot you get a -4 on their rolls.",
    AltValue: "Cloak of Elvenkind",
  },
  // Index 8
  {
    Roll: [28, 30],
    Value:
      "You find a Cloak of the Manta Ray! When you are wearing it, you gain the ability to breathe underwater, " +
      "and your base swimming speed is 60 ft.",
    AltValue: "Cloak of Manta Ray",
  },
  // Index 9
  {
    Roll: [31, 32],
    Value:
      "Roll 14-55, ignoring 31-32, print result, adding ** at the end of the descriptor.",
    AltValue: "Cloak of Poisonousness",
  },
  // Index 10
  {
    Roll: [33, 55],
    Value:
      "You find a Cloak of Protection! When you are wearing it, you gain a +1 WP armor, " +
      "+1 die type to physical resistance checks, and +1 die type to mental resistance checks.",
    AltValue: "Cloak of Protection",
  },
  // Index 11
  {
    Roll: [56, 60],
    Value:
      "You find a Crystal Ball! Once per day, while touching the Crystal Ball, you can scry with it.",
    AltValue: "Crystal Ball",
  },
  // Index 12
  {
    Roll: 61,
    Value: "You find a Crystall Ball!**",
    AltValue: "Crystal Hypnosis Ball",
  },
  // Index 13
  {
    Roll: [62, 63],
    Value: "You find a Cube of Force! It has 1d36 charges left.",
    AltValue: "Cube of Force",
  },
  // Index 14
  {
    Roll: [64, 65],
    Value: "You find a Cube of Frost Resistance!",
    AltValue: "Cube of Frost Resistance",
  },
  // Index 15
  {
    Roll: [66, 67],
    Value: "You find a Cubic Gate! It has 1d3 charges left in it.",
    AltValue: "Cubic Gate",
  },
  // Index 16
  {
    Roll: [68, 69],
    Value:
      "You find Doem's Instant Fortress! When placed on a flat surface and the command word used, " +
      "it can instantly turn into a fortress, or be reduced back to a pocket-sized trinket.",
    AltValue: "Doem's Instant Fortress",
  },
  // Index 17
  {
    Roll: [70, 72],
    Value: "You find a Decanter of Endless Water!",
    AltValue: "Decanter of Endless Water",
  },
  // Index 18
  {
    Roll: [73, 76],
    Value: "You find a deck of cards!**",
    AltValue: "Deck of Many Things",
  },
  // Index 19
  {
    Roll: 77,
    Value: "You find 2 Kettle Drums!**",
    AltValue: "Drums of Deafening",
  },
  // Index 20
  {
    Roll: [78, 79],
    Value: "You find 2 Kettle Drums!****",
    AltValue: "Drums of Panic",
  },
  // Index 21
  {
    Roll: [80, 85],
    Value:
      "You find a small pouch with Dust of Appearance inside! It has 1d100 uses left.",
    AltValue: "Dust of Appearance",
  },
  // Index 22
  {
    Roll: [86, 91],
    Value:
      "You find a small pouch with Dust of Disappearance inside! It has 1d10 uses left.",
    AltValue: "Dust of Disappearance",
  },
  // Index 23
  {
    Roll: 92,
    Value: "You find a small pouch with Dust of Appearance inside!**",
    AltValue: "Dust of Sneezing and Choking",
  },
  // Index 24
  {
    Roll: 93,
    Value: "You find an Efreeti Bottle!",
    AltValue: "Efreeti Bottle",
  },
  // Index 25
  {
    Roll: 94,
    Value: "You find an Eversmoking Bottle!",
    AltValue: "Eversmoking Bottle",
  },
  // Index 26
  {
    Roll: 95,
    Value: "You find Eyes of Charming! They have 1d3 charges left.",
    AltValue: "Eyes of Charming",
  },
  // Index 27
  {
    Roll: [96, 97],
    Value:
      "You find Eyes of the Eagle! You gain a +4 to all Sight rolls when wearing them.",
    AltValue: "Eyes of the Eagle",
  },
  // Index 28
  {
    Roll: [98, 99],
    Value:
      "You find Eyes of Minute Seeing! You gain a +4 to Investigation rolls when wearing them.",
    AltValue: "Eyes of Minute Seeing",
  },
  // Index 29
  {
    Roll: 100,
    Value:
      "You find Eyes of Petrification! You can cast 'Petrify' up to 10 times a day when wearing them.",
    AltValue: "Eyes of Petrification",
  },
];

export const MiscMagic3Data: ITableRow[] = [
  {
    Roll: [1, 15],
    AltValue: "Figurine of Wondrous Power",
    Value: "You find a Figuirine of Wondrous Power!",
    Notes:
      "Roll for the type for figuirine: Bronze Griffon, Ebony Fly, Golden Lions (pair), " +
      "Ivory Goats (trio), Marble Elephant, Obsidian Steed, Onyx Dog, Serpentine Owl, Silver Raven",
  },
  {
    Roll: 16,
    AltValue: "Flask of Curses",
    Value: "You find a Decanter of Endless Water!**",
  },
  {
    Roll: [17, 18],
    AltValue: "Gauntlets of Agility",
    Value:
      "You find Gauntlets of Agility! You gain a +6 die step to your Agility when wearing these.",
  },
  {
    Roll: [19, 20],
    AltValue: "Gauntlets of Fumbling",
    Value:
      "Reroll 17-25, ignoring 19-20, Print result with ** at end of descriptor",
  },
  {
    Roll: [21, 22],
    AltValue: "Gauntlets of Ogre Power",
    Value:
      "You find Gauntlets of Ogre Power! You gain a +6 die step to your Strength when wearing these.",
  },
  {
    Roll: [23, 25],
    AltValue: "Gauntlets of Swimming and Climbing",
    Value:
      "You find Gauntlets of Swimming and Climbing! " +
      "You gain a +3 die step to your swim and climbing checks when wearing these.",
  },
  {
    Roll: 26,
    AltValue: "Gem of Brightness",
    Value: "You find a Gem of Brightness! It has 1d50 charges left in it.",
  },
  {
    Roll: 27,
    AltValue: "Gem of Seeing",
    Value:
      "You found a Gem of Seeing! Up to 6 times a day, when viewed through it, " +
      "it allows the user to True See for up to 5 minutes at a time.",
  },
  {
    Roll: 28,
    AltValue: "Girdle of Femininity/Masculinity",
    Value: "You found a Girdle of Giant Strength!**",
  },
  {
    Roll: 29,
    AltValue: "Girdle of Giant Strength",
    Value:
      "You found a Girdle of Giant Strength! You gain (1d6) die steps to your Strength when wearing this.",
  },
  {
    Roll: 30,
    AltValue: "Helm of Brilliance",
    Value:
      "You find a Helm of Brilliance! It has 1d10 diamonds, 1d20 rubies, 1d30 fire opals, and 1d40 opals embedded in it.",
  },
  {
    Roll: [31, 35],
    AltValue: "Helm of Comprehending Languages & Reading Magic",
    Value:
      "You find a Helm of Comprehending Languages & Reading Magic! You gain +6 die steps " +
      "towards understanding any language or reading any magic when wearing this.",
  },
  {
    Roll: [36, 37],
    AltValue: "Helm of Lightning",
    Value:
      "Reroll 30-45, ignore 36-37, print result with ** at end of descriptor",
  },
  {
    Roll: [38, 39],
    AltValue: "Helm of Telepathy",
    Value:
      "You found a Helm of Telepathy! You can detect surface thoughts at will, " +
      "communicate telepathically at will, and once per day attempt to use Suggestion on another creature.",
  },
  {
    Roll: 40,
    AltValue: "Helm of Teleportation",
    Value: "You found a Helm of Teleportation! It has 1d3 charges in it.",
  },
  {
    Roll: [41, 45],
    AltValue: "Helm of Underwater Action",
    Value:
      "You find a Helm of Underwater Action! While wearing this helm, the user gains underwater breathing, " +
      "can swim at a speed of 30 ft, and darkvision.",
  },
  {
    Roll: 46,
    AltValue: "Horn of Blasting",
    Value:
      "You find a Horn of Blasting! If the command word is spoken and the instrument is then played, " +
      "it deals 5d6 points of sonic damage to creatures within a 40-foot cone and causes them to be " +
      "deafened for 2d6 rounds (a DC 15 physical resistance save reduces the damage by half and negates the deafening).",
  },
  {
    Roll: [47, 48],
    AltValue: "Horn of Bubbles",
    Value:
      "reroll 46-60, ignore 47-48, print result with ** at the end of the description",
  },
  {
    Roll: 49,
    AltValue: "Horn of Collapsing",
    Value:
      "reroll 46-60, ignore 49, print result with ** at the end of the description",
  },
  {
    Roll: [50, 53],
    AltValue: "Horn of the Tritons",
    Value:
      "You find a Horn of the Tritons! This can be used once per day to either: calm rough waters, " +
      "summon 1d4+1 sharks, or create a fear effect on aquatic or amphibious creatures.",
  },
  {
    Roll: [54, 60],
    AltValue: "Horn of Valhalla",
    Value:
      "You find a (silver/brass/bronze/iron) Horn of Valhalla! You may use it once per day to " +
      "summon warriors from Valhalla that will fight for you for 1 hour or until they reach 0 Life Points, " +
      "whichever comes first.",
    Notes:
      "Silver horn = 2d4+2 warriors; Brass horn = 3d4+3 warriors; Bronze Horn = 4d4+4 warriors; Iron horn = 5d4+5 warriors.",
  },
  {
    Roll: [61, 63],
    AltValue: "Horseshoes of Speed",
    Value:
      "You find Horseshoes of Speed! When all 4 shoes are affixed to a horse, " +
      "that horse gains an increase in speed by 30 ft.",
  },
  {
    Roll: [64, 65],
    AltValue: "Horseshoes of a Zephyr",
    Value:
      "You find Horseshoes of a Zephyr! When all 4 shoes are affixed to a horse, " +
      "that horse moves normally while floating 4 inches above the ground.",
  },
  {
    Roll: [66, 70],
    AltValue: "Incense of Meditation",
    Value:
      "You find Incense of Meditation! There is 1d12 sticks inside the case, " +
      "and each one gives a temporary boost of +6 to Spellcasting for 1 day. " +
      "Boost does not stack with other Incense of Meditation sticks.",
  },
  {
    Roll: 71,
    AltValue: "Incense of Obsession",
    Value: "You find Incense of Meditation!**",
  },
  {
    Roll: 72,
    AltValue: "Ioun Stones",
    Value: "You found an Ioun Stone!",
    Notes: "GOTO Ioun Stone table",
  },
  {
    Roll: [73, 78],
    AltValue: "Instrument of the Bards",
    Value: "GOTO Instrument of the Bards table",
  },
  {
    Roll: [79, 80],
    AltValue: "Iron Flask",
    Value: "You find an Iron Flask! It has (0-1) creatures trapped inside it.",
  },
  {
    Roll: [81, 85],
    AltValue: "Javelin of Lightning",
    Value:
      "You find a Javelin of Lightning!  When you hurl it and speak its command word, " +
      "it transforms into a bolt of lightning, forming a line 5 feet wide that extends " +
      "out from you to a target within 120 feet. Each creature in the line excluding you " +
      "and the target must make a DC 13 Get Out of Harm's Way saving throw, " +
      "taking 4d6 lightning damage on a failed save, and half as much damage on a successful one. " +
      "The lightning bolt turns back into a javelin when it reaches the target. " +
      "Make a ranged weapon attack against the target. On a hit, the target takes damage " +
      "from the javelin plus 4d6 lightning damage.",
  },
  {
    Roll: [86, 90],
    AltValue: "Javelin of Piercing",
    Value:
      "You found 2d4 Javelins of Piercing! When the command word is spoken, a Javelin will launch itself " +
      "at a target that is within 180 ft. If it hits, it does 1d6+6 damage. Each Javelin can be used this way once, " +
      "afterwards it turns into a normal javelin.",
  },
  {
    Roll: 91,
    AltValue: "Jewel of Attacks",
    Value: "You find a Jewel of Flawlessness!**",
  },
  {
    Roll: 92,
    AltValue: "Jewel of Flawlessness",
    Value: "You find a Jewel of Flawlessness! It has 1d100 facets on it.",
  },
  {
    Roll: [93, 100],
    AltValue: "Keoghtom's Ointment",
    Value:
      "You find a jar of Keoghtom's Ointment! It has 1d4+1 doses inside. " +
      "Each dose does 2d8+2 basic healing and cures any diseases and poisons.",
  },
];

export const MiscMagic4Data: ITableRow[] = [
  {
    Roll: 1,
    AltValue: "Libram of Gainful Conjuration",
    Value:
      "You find a Libram of Gainful Conjuration! After reading you gain a permanent +1 die type to SpellCasting.",
  },
  {
    Roll: 2,
    AltValue: "Libram of Ineffable Damnation",
    Value: "You find a Libram of Gainful Conjuration!**",
  },
  {
    Roll: 3,
    AltValue: "Libram of Silver Magic",
    Value: "You find a Libram of Gainful Conjuration!****",
  },
  {
    Roll: 4,
    AltValue: "Lyre of Building",
    Value:
      "You find a Lyre of Building! When using this instrument, once per day, " +
      "you can prevent damage to all inanimate objects in a 300 ft radius for up to 30 minutes.",
  },
  {
    Roll: 5,
    AltValue: "Manual of Bodily Health",
    Value:
      "You find a Manual of Bodily Health! After reading this tome you gain 1d3 die steps in Vitality.",
  },
  {
    Roll: 6,
    AltValue: "Manual of Gainful Exercise",
    Value:
      "You find a Manual of Gainful Exercise! After reading this tome you gain 1d3 die steps in Strength.",
  },
  {
    Roll: 7,
    AltValue: "Manual of Golems",
    Value:
      "You find a Manual of Golems! After reading this tome you learn how to created one of the " +
      "following random golems: clay, flesh, iron or stone.",
  },
  {
    Roll: 8,
    AltValue: "Manual of Puissant Skil at Arms",
    Value:
      "You find a Manual of Puissant Skill at Arms! After reading this tome you gain 1 die type " +
      "in melee and ranged weapons each.",
  },
  {
    Roll: 9,
    AltValue: "Manual of Quickness of Action",
    Value:
      "You find a Manual of Quickness of Action! After reading this tome you gain 1d3 die types in Agility.",
  },
  {
    Roll: 10,
    AltValue: "Manual of Stealthy Pilfering",
    Value:
      "You find a Manual of Stelthy Pilfering! After reading this time you game 1 die type to Covert skills.",
  },
  {
    Roll: 11,
    AltValue: "Mattock of the Titans",
    Value:
      "You find a Mattock of the Titans! Any creature of at least Huge size can use it to " +
      "loosen or tumble earth or earthen ramparts (a 10-foot cube every 10 minutes). " +
      "It also smashes rock (a 10-foot cube per hour). If used as a weapon, it is the equivalent of a " +
      "Gargantuan adamantine warhammer, dealing 4d6 points of base damage.",
  },
  {
    Roll: 12,
    AltValue: "Maul of the Titans",
    Value:
      "This mallet is 8 feet long. If used as a weapon, it is the equivalent of a +3 greatclub and " +
      "deals triple damage against inanimate objects. The wielder must have a Strength of " +
      "at least d12 to wield it properly. Otherwise, they take a -4 penalty on attack rolls.",
  },
  {
    Roll: [13, 15],
    AltValue: "Medallion of ESP",
    Value:
      "You find a Medallion of ESP! It allows you to pick up on the surface thoughts of any " +
      "creature within 1d3*30 ft range when it is worn and focused on.",
  },
  {
    Roll: [16, 17],
    AltValue: "Medallion of Thought Projection",
    Value: "You found a Medallion of ESP!**",
  },
  {
    Roll: 18,
    AltValue: "Mirror of Life Trapping",
    Value:
      "roll %, if 50 or less, Mirror is deactivated and appears to be a large wall mirror " +
      "with magical creatures adorning the frame. If 51 or higher, Mirror is active and will " +
      "attempt to pull the person or living creature into the one of the 15 extradimensional pockets.",
  },
  {
    Roll: 19,
    AltValue: "Mirror of Mental Prowess",
    Value: "You find a Mirror 5 ft tall by 2 ft wide!*",
  },
  {
    Roll: 20,
    AltValue: "Mirror of Opposition",
    Value: "You find a Mirror 4 ft tall by 3 ft wide!**",
  },
  {
    Roll: [21, 23],
    AltValue: "Necklace of Adaptation",
    Value:
      "You find a Necklace of Adaptation! When worn, it wraps you in a shell of fresh air, " +
      "giving you a +12 resistance against airborne poisonins, suffocation, and drowning.",
  },
  {
    Roll: [24, 27],
    AltValue: "Necklace of Missiles",
    Value:
      "You find a Necklace of Missiles! It contains 1d6 missles that when thrown, " +
      "have a range of 70 ft and do 1d12 Fireball damage on impact.",
  },
  {
    Roll: [28, 33],
    AltValue: "Necklace of Prayer Beads",
    Value:
      "You find a Necklace of Prayer Beads! It has 1d6 beads, each bead doing a random divine spell.",
  },
  {
    Roll: [34, 35],
    AltValue: "Necklace of Strangulation",
    Value: "Reroll 20-27, print result, adding ** at the end.",
  },
  {
    Roll: [36, 38],
    AltValue: "Net of Entrapment",
    Value:
      "You find a Net of Entrapment! It is 10 ft square with 3 inch webbing parttern, " +
      "and when used, the target has a -6 to Get Out of Harm's Way, or to disentangle themselves from the net.",
  },
  {
    Roll: [39, 42],
    AltValue: "Net of Snaring",
    Value:
      "You find a Net of Snaring! Up to 3 times per day, the user can speak the command word, " +
      "and then throw the net. The net automatically grows two sizes larger. " +
      "If the attack hits, the target must make a Agi+Agi check to get out of the snaring net with a DC of 27.",
  },
  {
    Roll: [43, 44],
    AltValue: "Nalzure's Marvelous Pigments",
    Value:
      "You find Nalzure's Marvelous Pignments! They allow you to make 3D items worth 25 Gold or Less out of a 2D painting!",
  },
  {
    Roll: [45, 46],
    AltValue: "Pearl of Power",
    Value:
      "You find a Pearl of Power! Once per day, whomever is holding this can " +
      "speak the command word and regain 1d12 Mana points.",
  },
  {
    Roll: [47, 48],
    AltValue: "Pearl of Willpower",
    Value:
      "You find a Pearl of Willpower! When worn, it gives the wearer a +2 bonus to all Willpower rolls.",
  },
  {
    Roll: [49, 50],
    AltValue: "Periapt of Foul Rattling",
    Value: "Reroll 49-60, print result, adding ** at the end.",
  },
  {
    Roll: [51, 53],
    AltValue: "Periapt of Health",
    Value:
      "You find a Periapt of Health! You are immune to contracting any disease while you wear this pendant. " +
      "If you are already infected with a disease, the effects of the disease are suppressed while you wear the pendant.",
  },
  {
    Roll: [54, 60],
    AltValue: "Periapt of Proof Against Poison",
    Value:
      "You find a Periapt of Proof Against Poison! This delicate silver chain has a brilliant-cut black gem pendant. " +
      "While you wear it, poisons have no effect on you. You are immune to the poisoned condition and have " +
      "immunity to poison damage.",
  },
  {
    Roll: [61, 64],
    AltValue: "Periapt of Wound Closure",
    Value:
      "You find a Periapt of Wound Closure! While you wear this pendant, you stabilize whenever " +
      "you are dying at the start of your turn. You also heal 2 Basic damage every day.",
  },
  {
    Roll: [65, 70],
    AltValue: "Phylactery of Faithfulness",
    Value:
      "You find a Phylactery of Faithfulness! It increases your Asset: Religiousity by 2 die types and " +
      "Your Complication: Loyalty (your chosen God) by 2 die types.",
  },
  {
    Roll: [71, 74],
    AltValue: "Phylactery of Long Years",
    Value:
      "You find a Phylactery of Long Years! For as long as you wear this, your life span is extended, " +
      "save for death by non-natural causes.",
  },
  {
    Roll: [75, 76],
    AltValue: "Phylactery of Monstrous Attention",
    Value: "Reroll 61-70, print result, adding ** at the end.",
  },
  {
    Roll: [77, 84],
    AltValue: "Pipes of the Sewers",
    Value:
      "You find Pipes of the Sewers! You must have the Performance Specailization: " +
      "Woodwinds in order to use this item. While you are attuned to the pipes, " +
      "ordinary rats and giant rats are indifferent toward you and will not attack you " +
      "unless you threaten or harm them. Up to 3 times a day, you may use " +
      "these pipes to call a swarm of rats to aide you.",
  },
  { Roll: 85, AltValue: "Portable Hole", Value: "You find a Portable Hole!" },
  {
    Roll: [86, 100],
    AltValue: "Quaal's Feather Token",
    Value:
      "You find Quaal's Feather Token! Once per day, you can use this to drive of hostile avian creatures.",
  },
];

export const MiscMagic5Data: ITableRow[] = [
  {
    Roll: 1,
    AltValue: "Robe of the Archmagi",
    Value:
      "You find a Robe of the Archmagi! When wearing no other armor, this Robe gives you: " +
      "+6 to your Get Out of Harm's Way, and +4 to Mental Resistance checks",
  },
  {
    Roll: [2, 8],
    AltValue: "Robe of Blending",
    Value:
      "You find a Robe of Blending! Once per day, you can transmute yourself to another humanoid " +
      "creature for up to 1 hour. During that time, you will be able to understand their native language.",
  },
  {
    Roll: 9,
    AltValue: "Robe of Eyes",
    Value:
      "You find a Robe of Eyes! When wearing this, you have 360 degree vision, giving you a " +
      "+4 to Perception:Sight rolls, darkvision d12, can see invisible objects as well as into the " +
      "Ethereal plane.You also gain a -4 resistance check versus being blinded by sudden light effects.",
  },
  {
    Roll: 10,
    AltValue: "Robe of Powerlessness",
    Value:
      "Reroll 1-19, ignoring 10, print result with ** at the end of the description.",
  },
  {
    Roll: 11,
    AltValue: "Robe of Scintilating Colors",
    Value:
      "You find a Robe of Scintillating Colors! It has 1d3 charges and can be used up to 3 times a day " +
      "to create a brilliant display of dazzling colors.",
  },
  {
    Roll: [12, 19],
    AltValue: "Robe of Useful Items",
    Value: "You find a Robe of Useful Items! It has 1d100 patches left on it.",
  },
  {
    Roll: [20, 25],
    AltValue: "Rope of Climbing",
    Value:
      "You find a Rope of Climbing! When the command word is used, " +
      "this rope gives you a +4 to the skill Athletics:Cimbing.",
  },
  {
    Roll: [26, 27],
    AltValue: "Rope of Constriction",
    Value: "reroll 20-31, ignoring 26-27, print result with a ** and the end.",
  },
  {
    Roll: [28, 31],
    AltValue: "Rope of Entanglement",
    Value:
      "You find a Rope of Entanglement! When the command word is spoken, " +
      "the held rope darts forward to entangle the nearest target within 20 ft' of the user.",
  },
  {
    Roll: 32,
    AltValue: "Rug of Smothering",
    Value: "You find a Rug of Welcome!**",
  },
  {
    Roll: 33,
    AltValue: "Rug of Welcome",
    Value:
      "You find a Rug of Welcome! A rug of this type appears exactly the same as a carpet of flying, " +
      "and it performs the functions of one (6-foot by 9-foot size), but a rug of welcome has other, " +
      "additional powers. Upon command it will function as a rug of smothering, entrapping any creature " +
      "up to ogre-size which steps upon it. A rug of welcome can also elongate itself and " +
      "become as hard and strong as steel, the maximum length being 27 feet by 2 feet. " +
      "In this form, it can serve as a bridge, barricade, etc. " +
      "In this latter form it is AC 0 and will take 100 points of damage to destroy. " +
      "Finally, the possessor need only utter a word of command, and the rug will shrink to " +
      "half size for easy storage and transportation.",
  },
  {
    Roll: 34,
    AltValue: "Saw of Mighty Cutting",
    Value:
      "You find a Saw of Mighty Cutting! It requires a person or group of people equal or greater " +
      "in strength than 2d12 to operate. The blade will slice through a 1-foot diameter tree in three rounds, " +
      "a 2-foot thick hardwood tree in one turn, or a 4-foot thick trunk in three turns. " +
      "After six turns (cumulative) of cutting with the saw, the character or characters must " +
      "rest for six turns before doing any further work.",
  },
  {
    Roll: 35,
    AltValue: "Scarab of Death",
    Value: "You find a Scarab of Protection!**",
  },
  {
    Roll: [36, 38],
    AltValue: "Scarab of Enraging Enemies",
    Value: "You find a Scarab of Protection!**",
  },
  {
    Roll: [39, 40],
    AltValue: "Scarab of Insanity",
    Value: "You find a Scarab of Protection!**",
  },
  {
    Roll: [41, 46],
    AltValue: "Scarab of Protection",
    Value:
      "You find a Scarab of Protection! It gives the wearer a +4 to mental resistance checks, " +
      "and has 1d12 charges. The charges can be used to turn a failed mental resistance check into a save, " +
      "and a botched into a fail mental resistance check.",
  },
  {
    Roll: 47,
    AltValue: "Spade of Colossal Excavation",
    Value:
      "You find a Spade of Colossal Excavation! You must have a d12 strength to use this item. When used, " +
      "it can dig out massive holes. In 24 hours the dirt removed will be returned from where it came.",
  },
  {
    Roll: 48,
    AltValue: "Sphere of Aniihilation",
    Value:
      "You find a Sphere of Annihilation! You must make a Spellcasting check (dc 27) in order to control this sphere.",
  },
  {
    Roll: [49, 50],
    AltValue: "Stone of Controlling Earth Elements",
    Value:
      "You find a Stone of Controlling Earth Elementals! Once per day, you may use this to summon an Earth Elemental.",
  },
  {
    Roll: [51, 52],
    AltValue: "Stone of Good Luck",
    Value:
      "You find a Stone of Good Luck! When in possession of this stone, you gain a +2 to all saving throws.",
  },
  {
    Roll: [53, 54],
    AltValue: "Stone of Weight",
    Value: "You find a Stone of Good Luck!**",
  },
  {
    Roll: [55, 57],
    AltValue: "Talisman of Healing",
    Value:
      "You find a Talisman of Healing! It has 1d6+1 charges, and each charge can be used to heal " +
      "yourself or another for 1d4 basic points within 120 ft of you.",
  },
  {
    Roll: 58,
    AltValue: "Talisman of the SPhere",
    Value:
      "You find a Talisman of the Sphere! This talisman gives you a +4 to your Spellcasting when " +
      "attempting to control the Sphere of Annihilation.",
  },
  {
    Roll: [59, 60],
    AltValue: "Talisman of Pain",
    Value:
      "You find a Talisman of Pain! It has 1d6+1 charges and each charge can be used to inflict " +
      "1d4 basic damage on yourself or another within 120 ft of you.",
  },
  {
    Roll: [61, 66],
    AltValue: "Talisman of Zagy",
    Value: "You find a Stone of Controlling Earth Elementals!**",
  },
  {
    Roll: 67,
    AltValue: "Tome of Clear Thought",
    Value:
      "You find a Tome of Clear Thought! Once read, this tome gives the reader a +1 die type to their Intelligence score.",
  },
  {
    Roll: 68,
    AltValue: "Tome of Leadership and Influence",
    Value:
      "You find a Tome of Leadership and Influence! Once read, you gain a +1 die type to your Influence based skills.",
  },
  {
    Roll: 69,
    AltValue: "Tome of Understanding",
    Value:
      "You find a Tome of Understanding! Once read, you gain a +1 die type to your scientific expertise based skills.",
  },
  {
    Roll: [70, 76],
    AltValue: "Trident of Fish Command",
    Value:
      "You find a Trident of Fish Command! it has 1d3 charges left in it, and each charge expended " +
      "allows you to control one creature that naturally swims.",
  },
  {
    Roll: [77, 78],
    AltValue: "Trident of Submission",
    Value:
      "You find a Trident of Submission! When an oppponent is struck with this weapon, " +
      "they must make a mental resistance check (dc 27) or instantly submit and surrender to the weilder of the trident.",
  },
  {
    Roll: [79, 83],
    AltValue: "Trident of Warning",
    Value:
      "You find a Trident of Warning! It enables its wielder to determine the location, depth, kind, " +
      'and number of "aquatic predators" within 360 feet. ',
  },
  {
    Roll: [84, 85],
    AltValue: "Trident of Yearning",
    Value: "Reroll 70-83, print result with a ** at the end.",
  },
  {
    Roll: [86, 87],
    AltValue: "Vacuous Grimoire",
    Value: "Reroll 61-69, print result with a ** at the end.",
  },
  {
    Roll: [88, 90],
    AltValue: "Well of Many Worlds",
    Value:
      "You find a Well of Many Worlds! Once ever 8 hours, you may unfold this black fabric and open a way to a random dimension.",
  },
  {
    Roll: [91, 100],
    AltValue: "Wings of Flying",
    Value:
      "You find Wings of Flying! Once every 1d12 hours, you may use this cloak to gain a flying speed of up to 60 ft for one hour.",
  },
];

export const MiscMagicSpecialData: ITableRow[] = [
  {
    Roll: 1,
    AltValue: "Axe of the Dwarvish Lords",
    Value:
      "You find an Axe of Dwarvish Lords! It is a +6 throwing weapon when used against goblinoids. " +
      "Any dwarf that possesses it gains a +6 die step increase to Craft: " +
      "Armor, Jewelry, Stonemasonry, Traps, and Weaponsmithing). " +
      "Once per week the weilder can summon an Elder Earth Elemental. It is a Legendary Emblem of the Dwarven People.**",
  },
  {
    Roll: 2,
    AltValue: "Baba Yaga's Hut",
    Value: "You find the transportable case of Baba Yaga's Hut!",
  },
  {
    Roll: [3, 4],
    AltValue: "Codex of the Infinite Plantes",
    Value:
      "You find a book so large that it takes a burst of Strength (dc 27) to pick up and move the book. " +
      "The cover of the book is obsidian and the pages are sheets of paper-thin lead. " +
      "Each page is inscribed with writings in alien languages and illuminated with illustrations " +
      "both beautiful and horrific. No matter how many pages are turned, there is always at least one more.**",
  },
  {
    Roll: [5, 20],
    AltValue: "Crown of Might",
    Value:
      "You find the Crown of Might! When worn, the user gains a +1 to hit and +1 to damage for melee and unarmed attacks.",
  },
  {
    Roll: 21,
    AltValue: "Crystal of the Ebon Flame",
    Value: "You find the Crystal of Ebon Flame!",
  },
  {
    Roll: 22,
    AltValue: "Cup and Talisman of Al'Akbar",
    Value: "You find the Cup and Talisman of Al'Akbar!",
  },
  {
    Roll: [23, 24],
    AltValue: "Eye of Vecna",
    Value:
      "You find a bloodshot eye that looks like it was forcefully torn out of somethinng's head.**",
  },
  {
    Roll: 25,
    AltValue: "Hand of Vecna",
    Value: "You find a desicatted, mummified left hand.**",
  },
  {
    Roll: 26,
    AltValue: "Heward's Mystical Organ",
    Value:
      "You find an enormous pipe organ as tall as a cathedral. " +
      "It has three keyboards, twenty-seven ivory stops, and nine pedals.**",
  },
  { Roll: 27, AltValue: "Horn of Change", Value: "You find a Horn of Luck!**" },
  {
    Roll: [28, 29],
    AltValue: "Invulnerable Coat of Arnd",
    Value:
      "You find the Invulnerable Coat of Arnd! It is made of magical chainmail that absorbs " +
      "ten points of damage off every hit and twenty points off of acid, cold, electricity, fire, and sonic damage.",
  },
  {
    Roll: [30, 31],
    AltValue: "Iron Flask of Tuerny the Merciless",
    Value:
      "You find a heavy urn plugged with a turnip-shaped stopper. It is small enough to be " +
      "easily carried in one's palm. The urn is relatively plain in design, " +
      "but the stopper is covered with runes and sigils.",
  },
  {
    Roll: 32,
    AltValue: "Jacinth of Inestimable Beauty",
    Value:
      "You find the Jacinth of Inestimable Beauty! It is an indescribably lovely gem, " +
      "huge sized and exquisitely cut (some say into the shape of a flower). " +
      "Its dozens of facets shoot forth brilliant beams.",
  },
  {
    Roll: 33,
    AltValue: "Johydee's Mask",
    Value:
      "You find Johydee's Mask! It is a full face mask of an unknown opaque material shaded gray. " +
      "It makes the wearer totally immune to all forms of gaze attacks. " +
      "The mask also allows the wearer to assume the guise of a humanoid being, from gnome to hill giant size.",
  },
  {
    Roll: [34, 35],
    AltValue: "Kuroth's Quill",
    Value:
      "You find Kuroth's Quill! This quill is made from the pure white feather of an adult griffin. " +
      "The Quill's user can magically read any writing in any language.",
  },
  {
    Roll: [36, 37],
    AltValue: "Mace of Cuthbert",
    Value:
      "You find the Mace of Cuthbert! It gives you a +5 to hit and +5 to damage when attacking the undead, " +
      "makes the wielder immune to fear effects, and grants a +6 to Spellcasting when casting divine magic.",
  },
  {
    Roll: 38,
    AltValue: "Machine of Lum the Mad",
    Value:
      "You find a large, complex contraption had over a hundred sockets, dials and levers, " +
      "each of different sizes and colors. All of the delicate components led to the machine " +
      "weighing about 5,500 lbs (2490 kg). The machine housed a container of crystal, " +
      "such that it could house a small number of creatures, similar in height to humans.",
  },
  {
    Roll: [39, 40],
    AltValue: "Mighty Servant of Leuk-O",
    Value:
      "You find a towering automaton of jet black metal, shadowy crystal, " +
      "and several mysterious fibrous materials. The device stands over 9 feet tall, " +
      "is nearly 5 feet wide, and some 6 feet deep. It is rounded and might remind one of a " +
      "cross between an overly stout (if gigantic) dwarf and a lumbering beetle. " +
      "The servant has two stocky legs, on which it walks with a curious swaying motion, and a pair of dangling arms.",
  },
  {
    Roll: [41, 47],
    AltValue: "Orb of the Dragonkind",
    Value: "You find an Orb of Dragonkind!**",
  },
  {
    Roll: [48, 63],
    AltValue: "Orb of Might",
    Value:
      "You find the Orb of Might! It gives the weilder a temporary +1 die step to strength, " +
      "+1 to hit and +1 to damage when using melee weapons.",
  },
  {
    Roll: 64,
    AltValue: "Queen Ehlissa's Marvelous Nightingale",
    Value:
      "The artifact resembles a bejeweled bird with crystal eyes and golden feathers. " +
      "A small key on its belly makes the bird appear to be powered at least partly through clockwork. " +
      "A cage with a mesh of golden wires encases the Nightingale and prevents it from escaping. " +
      "The Nightingale is animate, and will hop on its perch to perform, spreading its wings and singing beautiful songs.**",
  },
  {
    Roll: [65, 66],
    AltValue: "Recorder of Ye'Cind",
    Value:
      "You find the Recorder of Ye'Cind! The Recorder can play simple yet haunting tunes on command. " +
      "It sounds a shrill alarm when anything within 30 feet, including itself, is stolen. " +
      "Once per day it can create a magical vision containing clues on some topic of interest to the user. " +
      "It can manifest a variety of other spell-like powers as well.",
  },
  {
    Roll: [67, 68],
    AltValue: "Ring of Gaxx",
    Value:
      "You find a magic ring! It gives +2 to Get out of Harm's Way, +2 to physical and mental resistance checks, " +
      "heals 2 basic life points 4 times a day, and makes the wearer immune to disease and poisons.** ",
  },
  {
    Roll: [69, 74],
    AltValue: "Rod of Seven Parts",
    Value: "You find a piece of a rod!",
  },
  {
    Roll: [75, 91],
    AltValue: "Sceptre of Might",
    Value:
      "You find the Sceptre of Might! Up to 9 times a day, the user of the sceptre can use it to give " +
      "themselves a +12 to Spellcasting. It also gives a +5 to hit and a +5 to damage when used as a mace.",
  },
  {
    Roll: 92,
    AltValue: "Sword of Kas",
    Value:
      "You find a longsword made of black metal. It does 1d8+3 damage, and gives the wielder a +3 to hit and +3 to damage.**",
  },
  {
    Roll: [93, 98],
    AltValue: "Teeth of Dohlver-Nar",
    Value:
      "You find a leather pouch, decorated with embroidered heroes and mystical creatures. Inside are teeth from various creatures.",
  },
  {
    Roll: 99,
    AltValue: "Throne of the Gods",
    Value:
      "You find an ornate chair, inlaid with gold and decorated with precious gems and mosaics. " +
      "It is big enough for a storm giant to sit upon comfortably, and is carved from the heart of a mountain. " +
      "The Throne protrudes from the rear wall of a 100 foot-diameter cavern, " +
      "and rest upon a floor of billowing clouds. No magic will work within this chamber, " +
      "other than the magic abilities of the Throne of the Gods itself.",
  },
  {
    Roll: 100,
    AltValue: "Wand of Orcus",
    Value:
      "You find a wand made of black obsidian and iron rod topped with the skull of a human",
  },
];
