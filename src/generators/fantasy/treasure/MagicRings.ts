import { ITableRow, MyTable } from "./MyTable.js";
import { IFooModel } from "./FantasyTreasureGenerator.js";
import { DieType, IDice } from "@krisnorman/rpg-utils";
import { IRowResult2 } from "../../../data/index.js";

export class MagicRing implements IFooModel {
  constructor(title: string) {
    this.Title = title;
    this.Items = [];
    this.HasItems = false;
  }

  Title: string;
  Items: string[];
  HasItems: boolean;
}

export class MagicRingsRepository {
  private readonly ringsTable = new MyTable(
    MagicRingsData,
    "Magic Rings",
    DieType.percentile
  );
  constructor(private dice: IDice) {}

  getRandom(count: number = 1): MagicRing[] {
    const rings: MagicRing[] = [];

    for (let index = 0; index < count; index++) {
      let row = this.getRandomRow();
      let title = row.Row.Value;

      // Random ring (tagged with **)
      if (row.Index === 1 || row.Index === 21) {
        let shouldContinue = true;
        while (shouldContinue) {
          row = this.getRandomRow();
          title = row.Row.Value.replace("!", "!**");
          if (row.Index != 1 && row.Index != 21) shouldContinue = false;
        }
      }

      // Spell Storing
      if (row.Index === 14) {
        const numSpells = this.dice.roll("1d10").total;
        const capacity = this.dice.roll("1d100").total - numSpells;
        title = row.Row.Value.replace("1d10", numSpells.toString()).replace(
          "1d100 minus previous roll",
          capacity.toString()
        );
      }

      title = title.replace(
        "1d100 charges",
        `${this.dice.roll(DieType.percentile).total.toString()} charges`
      );

      const ring = new MagicRing(title);
      rings.push(ring);
    }

    return rings;
  }

  private getRandomRow(): IRowResult2<ITableRow> {
    const roll = this.dice.roll(this.ringsTable.DieExpression);
    const row = this.ringsTable.find(roll.total);
    return row;
  }
}

export const MagicRingsData: ITableRow[] = [
  { Roll: [1, 6], Value: `You have found a ring of contrariness!` },
  {
    Roll: [7, 12],
    Value: `You have found a (roll random ring) !** It has 1d100 charges left in it.`,
  },
  {
    Roll: [13, 14],
    Value: `You have found a ring of Djinni Summoning! It has 1d100 charges left in it`,
  },
  {
    Roll: 15,
    Value: `You have found a ring of Elemental Command! It has 1d100 charges left in it.`,
  },
  {
    Roll: [16, 21],
    Value: `You have found a ring of Feather Falling! It has 1d100 charges left in it.`,
  },
  {
    Roll: [22, 27],
    Value: `You have found a ring of Fire Resistance! It adds +6 resistance versus fire effects!`,
  },
  {
    Roll: [28, 30],
    Value: `You have found a ring of Free Action! It has 1d100 charges left in it.`,
  },
  {
    Roll: [31, 33],
    Value: `You have found a ring of Human Influence! It adds +6 to your Influence skills when dealing with Humans!`,
  },
  {
    Roll: [34, 40],
    Value: `You found a ring of Invisibility! It has 1d100 charges left in it.`,
  },
  {
    Roll: [41, 43],
    Value: `You found a ring of Mammal Control! it has 1d100 charges left in it.`,
  },
  {
    Roll: 44,
    Value: `You found a ring of Wishes! It has 1d100 charges left in it.`,
  },
  {
    Roll: [45, 60],
    Value: `You found a ring of Protection! It absorbs 4 wound and 4 stun points per round of combat.`,
  },
  {
    Roll: 61,
    Value: `You found a ring of Regeneration! You will heal 2 basic points per round of combat.`,
  },
  {
    Roll: [62, 63],
    Value: `You found a ring of Shooting Stars! It has 1d100 charges left it in.`,
  },
  {
    Roll: [64, 65],
    Value: `You found a ring of Spell Storing! It has 1d10 spells already in it and can hold 1d100 minus previous roll more spells!`,
  },
  {
    Roll: [66, 69],
    Value: `You found a ring of Spell Turning! It has 1d100 charges in it.`,
  },
  {
    Roll: [70, 75],
    Value: `You found a ring of Swimming! You get a +6 to all swimming checks!`,
  },
  {
    Roll: [76, 77],
    Value: `You found a ring of Telekinesis! It has 1d100 charges left.`,
  },
  {
    Roll: [78, 79],
    Value: `You found a Ring of Wishes! It has 3 charges left in it.`,
  },
  {
    Roll: [80, 85],
    Value: `You find a ring of Warmth! You get +6 versus cold effects!`,
  },
  {
    Roll: [86, 90],
    Value: `You find a ring of Water Walking! It has 1d100 charges left on it.`,
  },
  {
    Roll: [91, 98],
    Value: `You find a (roll a random ring)!*** It has 1d100 charges left.`,
  },
  {
    Roll: 99,
    Value: `You find a ring of Wizardry! It adds +12 to your Spellcasting!`,
  },
  {
    Roll: 100,
    Value: `You find a ring of X-Ray Vision! You can see people's bones unless blocked by lead!`,
  },
];
