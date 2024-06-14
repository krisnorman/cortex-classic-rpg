import { DieType, IDice } from "@krisnorman/rpg-utils";
import { IFooModel, ITableRow, MyTable } from "./index.js";

export class MagicWeapon implements IFooModel {
  constructor(title: string) {
    this.Title = title;
    this.Items = [];
    this.HasItems = false;
  }
  Title: string;
  Items: string[];
  HasItems: boolean;
}

export class MagicWeaponsRepository {
  private readonly magicWeaponsTable = new MyTable(
    MagicWeaponsData,
    "Magic Weapons",
    DieType.percentile
  );

  constructor(private readonly dice: IDice) {}

  getRandom(count: number = 1): MagicWeapon[] {
    const items: MagicWeapon[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.magicWeaponsTable.DieExpression);
      const row = this.magicWeaponsTable.find(roll.total);

      let title = row.Row.Value;

      switch (true) {
        case row.Index === 0:
          title = title.replace(
            "2d12",
            this.dice.roll("2d12").total.toString()
          );
        case row.Index === 1:
          title = title.replace("4d4", this.dice.roll("4d4").total.toString());
        case row.Index === 2:
          title = title.replace("2d6", this.dice.roll("2d6").total.toString());
        case row.Index === 9:
          title = title.replace(
            "2d10",
            this.dice.roll("2d10").total.toString()
          );
        case row.Index === 16:
          if (this.getIsNamedArtifact()) title += "$$";
          title = title.replace("1d6", this.dice.roll("1d6").total.toString());
          break;
        case row.Index === 21:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 25:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 30:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 34:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
      }

      const item = new MagicWeapon(title);
      items.push(item);
    }

    return items;
  }

  private getIsNamedArtifact(): boolean {
    // roll 1-100, if roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.
    const roll = this.dice.roll(DieType.percentile);
    return roll.total >= 90 && roll.total <= 100;
  }
}

export const MagicWeaponsData: ITableRow[] = [
  {
    Roll: [1, 8],
    Value: "You find 2d12 magic arrows! They do +1 to hit and +1 to damage.",
    AltValue: "Arrows +1 (2d12 in number)",
  },
  {
    Roll: [9, 12],
    Value: "You find 4d4 magic arrows! They do +2 to hit and damage.",
    AltValue: "Arrows +2 (4d4 in number)",
  },
  {
    Roll: [13, 14],
    Value: "You find 2d6 magic arrows! They do +3 to hit and damage.",
    AltValue: "Arrows +3 (2d6 in number)",
  },
  {
    Roll: 15,
    Value:
      "You find a magical arrow of slaying! It does +3 to hit and damage against most creatures, " +
      "and will instantly kill 1 random type of creature. ",
    AltValue: "Arrow of Slaying",
  },
  {
    Roll: [16, 20],
    Value: "You find a magical axe! It does +1 to hit and damage.",
    AltValue: "Axe +1",
  },
  {
    Roll: [21, 22],
    Value: "You find a magical axe! It does +2 to hit and damage.",
    AltValue: "Axe +2",
  },
  {
    Roll: 23,
    Value: "You find a magical throwing axe! It does +2 to hit and damage.",
    AltValue: "Axe +2, Throwing",
  },
  {
    Roll: 24,
    Value: "You find a magical axe! It does +3 to hit and damage.",
    AltValue: "Axe +3",
  },
  {
    Roll: [25, 27],
    Value: "You find a magical battle axe! It does +1 to hit and damage.",
    AltValue: "Battle Axe +1",
  },
  {
    Roll: [28, 32],
    Value: "You find 2d10 magical bolts! They do +2 to hit and damage.",
    AltValue: "Bolt +2 (2d10 in number)",
  },
  {
    Roll: [33, 35],
    Value: "You find a magical bow! It does +1 to hit and damage.",
    AltValue: "Bow +1",
  },
  {
    Roll: 36,
    Value: "You find a Crossbow of Accuracy! It does +3 to hit and damage.",
    AltValue: "Crossbow of Accuracy, +3",
  },
  {
    Roll: 37,
    Value:
      "You find a Crossbow of Distance! It has twice the range of a standard crossbow and does +1 to hit and damage.",
    AltValue: "Crossbow of Distance",
  },
  {
    Roll: 38,
    Value:
      "You find a Crossbow of Speed! You can fire at twice the standard rate, and it does +1 to hit and damage.",
    AltValue: "Crossbow of Speed",
  },
  {
    Roll: [39, 46],
    Value:
      "You find a magical dagger! It does +1 to hit and damage normal creatures, " +
      "and +2 to hit and damage vs smaller than man-sized creatures.",
    AltValue: "Dagger, +1, +2 vs creatures smaller than man-sized",
  },
  {
    Roll: [47, 50],
    Value:
      "You find a magical dagger! It does +2 to hit and damage normal creatures, " +
      "and +3 to hit and damage vs larger than man-sized creatures.",
    AltValue: "Dagger +2, +3 vs creatures larger than man-sized",
  },
  {
    Roll: 51,
    Value:
      "You find a Dagger of Venom! It does a +1 to hit and to damage and on an " +
      "EXTRA SUCCESS on an attack, it injects the opponent with poison, " +
      "forcing them to make a physical resistance ched (DC 23) or take poison damage. " +
      "The dagger can hold 6 doses of poison, can be refilled, " +
      "and currently has 1d6 doses of poison hidden inside it.",
    AltValue: "Dagger of Venom",
    Notes:
      "roll 1-100, if roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: [52, 56],
    Value: "You find a magical flail! It does +1 to hit and to damage.",
    AltValue: "Flail +1",
  },
  {
    Roll: [57, 60],
    Value: "You find a magical hammer! It does +1 to hit and to damage.",
    AltValue: "Hammer +1",
  },
  {
    Roll: [61, 62],
    Value: "You find a magical hammer! It does +2 to hit and to damage.",
    AltValue: "Hammer +2",
  },
  {
    Roll: 63,
    Value: "You find a magical hammer! It does +2 to hit and to damage.*",
    AltValue: "Hammer +3, Dwarven Thrower",
  },
  {
    Roll: 64,
    Value:
      "You find a magical hammer! It requires a D12 strength to weild, " +
      "and used as a melee weapon, it does +3 to hit and to damage, " +
      "when used as a thrown weapon, it does +5 to hit and to damage.*",
    AltValue: "Hammer of Thunderbolts",
    Notes:
      "roll 1-100, if roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: [65, 67],
    Value: "You find a magical javelin! It does +2 to hit and to damage.",
    AltValue: "Javelin +2",
  },
  {
    Roll: [68, 72],
    Value: "You find a magical mace! It does +1 to hit and to damage.",
    AltValue: "Mace +1",
  },
  {
    Roll: [73, 75],
    Value: "You find a magical mace! It does +2 to hit and to damage.",
    AltValue: "Mace +2",
  },
  {
    Roll: 76,
    Value:
      "You find a magical mace! It does +1 to hit and to damage on creatures, " +
      "other than undead, demons, and devils. When it strikes undead, demons, " +
      "or devils, it acts as a Disruption spell, either causing the creature to flee in fear, " +
      "or on an EXTRA SUCCESS, instantly destroys the creature.",
    AltValue: "Mace of Disruption",
    Notes:
      "roll 1-100, if roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: 77,
    Value: "You find a magical mace! It does +4 to hit and to damage.",
    AltValue: "Mace +4",
  },
  {
    Roll: [78, 80],
    Value: "You find a magical military pick! It does +1 to hit and to damage.",
    AltValue: "Military Pick +1",
  },
  {
    Roll: [81, 83],
    Value: "You find a magical morning star! It does +1 to hit and to damage.",
    AltValue: "Morning Star +1",
  },
  {
    Roll: [84, 88],
    Value: "You find a magical scimitar! It does +2 to hit and to damage.",
    AltValue: "Scimitar +2",
  },
  {
    Roll: 89,
    Value:
      "You find a Sling of Seeking! It gives you a +2 to hit and damage, " +
      "and bullets thrown from the sling give an additional +1 to damage.",
    AltValue: "Sling of Seeking +2",
    Notes:
      "roll 1-100, if roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: [90, 94],
    Value: "You find a magical spear! It does +1 to hit and to damage.",
    AltValue: "Spear +1",
  },
  {
    Roll: [95, 96],
    Value: "You find a magical spear! It does +2 to hit and to damage.",
    AltValue: "Spear +2",
  },
  {
    Roll: 97,
    Value: "You find a magical spear! It does +3 to hit and to damage.",
    AltValue: "Spear +3",
  },
  {
    Roll: [98, 99],
    Value: "You find a magical spear! It does +1 to hit and to damage*",
    AltValue: "Spear, Cursed Backbiter",
    Notes:
      "roll 1-100, if roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: 100,
    Value: "You find a magical trident! It does +3 to hit and to damage.",
    AltValue: "Trident +3",
  },
];
