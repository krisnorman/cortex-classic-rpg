import { DieType, IDice } from "@krisnorman/rpg-utils";
import { IFooModel, ITableRow, MyTable } from "./index.js";

export class MagicArmor implements IFooModel {
  constructor(title: string) {
    this.Title = title;
    this.Items = [];
    this.HasItems = false;
  }
  Title: string;
  Items: string[];
  HasItems: boolean;
}

export class MagicArmorRepository {
  private readonly magicArmorTable = new MyTable(
    MagicArmorData,
    "Magic Armor",
    DieType.percentile
  );

  constructor(private dice: IDice) {}
  getRandom(count: number = 1): MagicArmor[] {
    const magicArmor: MagicArmor[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.magicArmorTable.DieExpression);
      const row = this.magicArmorTable.find(roll.total);
      const item = new MagicArmor(row.Row.Value);
      magicArmor.push(item);
    }

    return magicArmor;
  }
}

export const MagicArmorData: ITableRow[] = [
  {
    Roll: [1, 5],
    Value: "You found magical chainmail! It does a total of 5W protection!",
    AltValue: "Chain Mail +1",
  },
  {
    Roll: [6, 9],
    Value: "You found magical chainmail! It does a total of 6W protection.",
    AltValue: "Chain Mail +2",
  },
  {
    Roll: [10, 11],
    Value: "You found magical chainmail! It does a total of 7W protection.",
    AltValue: "Chain Mail +3",
  },
  {
    Roll: [12, 19],
    Value: "You found magical Leather Armor! It does a total of 3W protection.",
    AltValue: "Leather Armor +1",
  },
  {
    Roll: [20, 26],
    Value: "You found magical plate mail! It does a total of 8W protection.",
    AltValue: "Plate Mail +1",
  },
  {
    Roll: [27, 32],
    Value: "You found magical plate mail! it does a total of 9W protection.",
    AltValue: "Plate Mail +2",
  },
  {
    Roll: [33, 35],
    Value: "You found magical plate mail! It does a total of 10W protection.",
    AltValue: "Plate Mail +3",
  },
  {
    Roll: [36, 37],
    Value: "You found magical plate mail! It does a total of 11W protection",
    AltValue: "Plate Mail +4",
  },
  {
    Roll: 38,
    Value: "You found magical plate mail! It does a total of 12W protection.",
    AltValue: "Plate Mail +5",
  },
  {
    Roll: 39,
    Value:
      "You found Plate Mail of Etherealness! It does a total of 7W protection, and once per day, when the command word is spoken, the wearer turns ethereal, for up to 10 minutes, OR until the armor is removed OR until the command word is spoken again.",
    AltValue: "Plate Mail of Etherealness",
  },
  {
    Roll: [40, 44],
    Value:
      "You find a Plate Mail of Invulnerability! While wearing this armor, you have resistance to one of the following damage types: bludgeoning, piercing, or slashing, at the DMs discretion. **",
    AltValue: "Plate mail of Vulnerability",
  },
  {
    Roll: [45, 50],
    Value: "You find magical ring mail! It does 4W damage protection.",
    AltValue: "Ring Mail +1",
  },
  {
    Roll: [51, 55],
    Value: "You find magical scale mail! It does 5W damage protection.",
    AltValue: "Scale Mail +1",
  },
  {
    Roll: [56, 59],
    Value: "You find magical scale mail! It does 6W damage protection.",
    AltValue: "Scale Mail +2",
  },
  {
    Roll: [60, 63],
    Value: "You find magical splint mail! It does 7W protection.",
    AltValue: "Splint Mail +1",
  },
  {
    Roll: [64, 66],
    Value: "You find magical splint mail! It does 8W protection.",
    AltValue: "Splint Mail +2",
  },
  {
    Roll: [67, 68],
    Value: "You find magical splint mail! It does 9W protection.",
    AltValue: "Splint Mail +3",
  },
  {
    Roll: 69,
    Value: "You find magical splint mail! It does 10W protection.",
    AltValue: "Splint Mail +4",
  },
  {
    Roll: [70, 75],
    Value: "You find magical studded leather armor! It does 4W protection.",
    AltValue: "Studded Leather +1",
  },
  {
    Roll: [76, 84],
    Value:
      "You find a magical shield! It gives you a +3 to your Get out of Harm's Way.",
    AltValue: "Shield +1",
  },
  {
    Roll: [85, 89],
    Value:
      "You find a magical shield! It gives you a +4 to your Get out of Harm's Way.",
    AltValue: "Shield +2",
  },
  {
    Roll: [90, 93],
    Value:
      "You find a magical shield! It gives you a +5 to your Get out of Harm's Way.",
    AltValue: "Shield +3",
  },
  {
    Roll: [94, 95],
    Value:
      "You find a magical shield! It gives you a +6 to your Get out of Harm's Way.",
    AltValue: "Shield +4",
  },
  {
    Roll: 96,
    Value:
      "You find a magical shield! It gives you a +7 to your Get out of Harm's Way.",
    AltValue: "Shield +5",
  },
  {
    Roll: 97,
    Value:
      "You find a large magical shield! It gives you a +5 to your Get out of Harm's Way for " +
      "Melee attacks and a +8 to your Get out of Harm's Way for ranged attacks.",
    AltValue: "Large Shield +1, +4 versus Missiles",
  },
  {
    Roll: [98, 100],
    Value: "You find a large magical shield!**",
    AltValue: "Shield -1, Missile Attractor",
  },
];
