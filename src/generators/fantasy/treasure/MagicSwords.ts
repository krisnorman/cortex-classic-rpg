import { DieType, IDice } from "@krisnorman/rpg-utils";
import { IFooModel, ITableRow, MyTable } from "./index.js";

export class MagicSword implements IFooModel {
  constructor(title: string) {
    this.Title = title;
    this.Items = [];
    this.HasItems = false;
  }
  Title: string;
  Items: string[];
  HasItems: boolean;
}

export class MagicSwordRepository {
  private readonly magicSwordTable = new MyTable(
    MagicSwordData,
    "Magic Swords",
    DieType.percentile
  );
  constructor(private readonly dice: IDice) {}

  getRandom(count: number = 1): MagicSword[] {
    const items: MagicSword[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.magicSwordTable.DieExpression);
      const row = this.magicSwordTable.find(roll.total);

      let title = `${row.Row.AltValue}. ${row.Row.Value}`;

      switch (true) {
        case row.Index === 5:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 6:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 8:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 9:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 10:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 12:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 14:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 16:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 17:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 18:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 19:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 20:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 21:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 22:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 23:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 24:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
        case row.Index === 25:
          if (this.getIsNamedArtifact()) title += "$$";
          break;
      }

      const item = new MagicSword(title);
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

export const MagicSwordData: ITableRow[] = [
  {
    Roll: [1, 25],
    Value:
      "You find a magical sword! It gives you a +1 to hit and a +1 one to wound damage.",
    AltValue: "Sword +1",
  },
  {
    Roll: [26, 30],
    Value:
      "You find a magical sword! it gives you a +1 to hit and damage on normal creatures, and a +2 to hit and damage on magic-using and enchanted creatures.",
    AltValue: "Sword +1, +2 vs magic-using and enchanted creatures",
  },
  {
    Roll: [31, 35],
    Value:
      "You find a magical sword! It gives you a +1 to hit and damage on normal creatures, and a +3 to hit and damage on lycanthropes and shape-changing creatures.",
    AltValue: "Sword +1, +3 vs lycanthropes and shape-changers",
  },
  {
    Roll: [36, 40],
    Value:
      "You find a magical sword! It gives you a +1 to hit and damage on normal creatures, and a +3 to hit and damage on regenerating creatures.",
    AltValue: "Sword +1, +3 vs regenerating creatures",
  },
  {
    Roll: [41, 45],
    Value:
      "You find a magical sword! It gives you a +1 to hit and damage on normal creatures and a +4 to hit and damage on reptiles.",
    AltValue: "Sword +1, +4 vs reptiles",
  },
  {
    Roll: [46, 49],
    Value:
      "You find a magical sword! When drawn and the command word is said, the blade turns into flames. It gives you a +1 to hit and damage on normal creatures, a +2 to hit and damage on regnerating creatures, and a +3 to hit and damage on cold-using, inflammable, or avian creatures.",
    AltValue:
      "Sword +1, Flame Tongue; +2 vs regenerating creatures; +3 vs cold-using, inflammable, or avian creatures",
    Notes:
      "roll 1-100, if roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: 50,
    Value:
      "You find a magical sword! It gives you a +1 to hit and damage. Once per game session, you may re-roll ONE skill check and take the greater of the two rolls.",
    AltValue: "Sword +1; Luck Blade",
    Notes:
      "roll 1-100, if roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: [51, 58],
    Value: "You find a magical sword! It gives you a +2 to hit and damage.",
    AltValue: "Sword +2",
  },
  {
    Roll: [59, 62],
    Value:
      "You find a magical sword! It gives you a +2 to hit and damage regular creatures, and does a bonus die of damage against giants.",
    AltValue: "Sword +2, Giant Slayer",
    Notes:
      "roll 1-100, if roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: [63, 66],
    Value:
      "You find a magical sword! It gives you +2 to hit and damage regular creatures, and does a bonus die of damage against dragons.",
    AltValue: "Sword +2, Dragon Slayer",
    Notes:
      "roll 1-100, if roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: 67,
    Value:
      "You find a magical sword! It gives you a +2 to hit and damage regular creatures, and on an EXTRA SUCCESS the opponent creature automatically dies. *",
    AltValue: "Sword +2, Nine Lives Stealer",
    Notes:
      "cursed weapon, roll 1-100, if roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: [68, 71],
    Value: "You find a magical sword! It gives you a +3 to hit and damage.",
    AltValue: "Sword +3",
  },
  {
    Roll: [72, 74],
    Value:
      "You find a magical sword! It gives you a +3 to hit and damage regular creatures. When drawn and the command word it said, the blade turns into ice and gives you a +6 to hit and damage fire-using and fire-dwelling creatures.",
    AltValue:
      "Sword +3, Frost Brand; +6 vs fire-using/fire-dwelling creatures.",
    Notes:
      "roll 1-100, if the roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: [75, 76],
    Value: "You find a magical sword! It gives you a +4 to hit and damage.",
    AltValue: "Sword +4",
  },
  {
    Roll: 77,
    Value:
      "You find a magical sword! It gives you a +4 to hit and damage, and as long as it is in your possession, you gain a +4 to Get out of Harm's Way.",
    AltValue: "Sword +4 Defender",
    Notes:
      "roll 1-100, if the roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: 78,
    Value: "You find a magical sword! It gives you a +5 to hit and damage.",
    AltValue: "Sword +5",
  },
  {
    Roll: 79,
    Value:
      "You find a magical sword! It gives you a +5 to hit and damage, and as long as it is in your possession, you gain a +5 to Get out of Harm's Way.",
    AltValue: "Sword +5 Defender",
    Notes:
      "roll 1-100, if the roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: 80,
    Value:
      "You find a magical sword! It gives you a +5 to hit and damage, +6 to mental resistance, and +10 to hit and damage vs undead creatures.",
    AltValue: "Sword +5 Holy Avenger",
    Notes:
      "roll 1-100, if the roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: 81,
    Value:
      "You find a magical sword! It does +1 to hit and damage on the first round of combat, +2 on the second round, +3 on the 3rd round, +4 on the 4th round, and then resets back to +1, repeating the cycle until combat is over.",
    AltValue: "Sword of Dancing",
    Notes:
      "roll 1-100, if the roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: 82,
    Value:
      "You find a magical sword! It does +1 to hit and damage, and for every cut it makes, the creature loses 1 WP due to blood loss every round.",
    AltValue: "Sword of Wounding",
    Notes:
      "roll 1-100, if the roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: 83,
    Value:
      "You find a magical sword! It does +2 to hit and damage, and for every point of damage the sword deals, the weilder gains in healing.",
    AltValue: "Sword of Life Stealing",
    Notes:
      "roll 1-100, if the roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: 84,
    Value:
      "You find a magical sword! It does +3 to hit and damage, and on an EXTRA SUCCESS automatically severs a random limb of the opponent.",
    AltValue: "Sword of Sharpness",
    Notes:
      "roll 1-100, if the roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: 85,
    Value:
      "You find a magical sword! It does +3 to hit and damage, and on an EXTRA SUCCESS automatically decapitates the opponent.",
    AltValue: "Vorpal Sword",
    Notes:
      "roll 1-100, if the roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: [86, 90],
    Value: "You find a magical sword! It does +1 to hit and damage. *",
    AltValue: "Sword +1, Cursed",
    Notes:
      "roll 1-100, if the roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: [91, 95],
    Value: "You find a magical sword! It does +2 to hit and damage. *",
    AltValue: "Sword -2, Cursed",
    Notes:
      "roll 1-100, if the roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
  {
    Roll: [96, 100],
    Value: "You find a magical sword! It does +2 to hit and damage. **",
    AltValue: "Sword of Berserking",
    Notes:
      "roll 1-100, if the roll is 90-100, it is a NAMED ARTIFACT and should be marked with a $$ after the description.",
  },
];
