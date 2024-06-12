import { ITableRow, MyTable } from "./MyTable.js";
import { IFooModel } from "./FantasyTreasureGenerator.js";
import { DieType, IDice } from "@krisnorman/rpg-utils";

export class Potion implements IFooModel {
  constructor(private row: ITableRow) {
    this.Title = row.Value;
  }

  readonly Title: string = "";
  readonly Items: string[] = [];
  readonly HasItems: boolean = false;
}

export class PotionsRepository {
  private readonly potionsTable = new MyTable(
    PotionsData,
    "Potions",
    DieType.percentile
  );

  constructor(private dice: IDice) {}

  getRandom(count: number = 1): Potion[] {
    if (count < 1) count = 1;
    let potions: Potion[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.potionsTable.DieExpression);
      const row = this.potionsTable.find(roll.total);
      const potion = new Potion(row.Row);
      potions.push(potion);
    }

    return potions;
  }
}

export const PotionsData: ITableRow[] = [
  {
    Roll: [1, 3],
    Value:
      "You find a vial of animal control! There are (1d6) doses inside, each good for (1d6) hours!",
  },
  {
    Roll: [4, 6],
    Value:
      "You find a vial of clairaudience! There are (1d6) doses inside, each good for (1d6) hours!",
  },
  {
    Roll: [7, 9],
    Value:
      "You find a vial of clairvoyance! There are (1d6) doses inside, each good for (1d6) hours!",
  },
  {
    Roll: [10, 12],
    Value:
      "You find a potion of climbing! It has (1d6) doses inside, each good to give you a +2 to climbing checks for (1d6) hours!",
  },
  {
    // ????
    Roll: [13, 15],
    Value:
      "Reroll on potion table, add ** tag at end of description, print result.",
  },
  {
    Roll: [16, 18],
    Value:
      "You find a vial of diminution! It has (1d6) doses that allow you to shrink in size for (1d6) hours!",
  },
  {
    Roll: [19, 20],
    Value:
      "You find a vial of dragon control! It has (1d6) doses inside and gives you a +6 on your rolls to control dragons for (1d6) hours!",
  },
  {
    Roll: [21, 23],
    Value:
      "You find a potion of ESP! It has (1d6) doses and gives you a +4 bonus on sense motive checks for (1d6) hours!",
  },
  {
    Roll: [24, 26],
    Value:
      "You find a potion of extra healing! It has (1d6) doses, and each dose does 2d6 basic (wound and stun, split) healing!",
  },
  {
    Roll: [27, 29],
    Value:
      "You find a potion of fire resistance! It has (1d6) doses, and each dose gives you a +4 resistance versus fire for (1d6) hours!",
  },
  {
    Roll: [30, 32],
    Value:
      "You find a potion of flying! It has (1d6) doses and allows you to fly for (1d6) hours per dose!",
  },
  {
    Roll: [33, 34],
    Value:
      "You find a potion of gaseous form! It has (1d6) doses and allows you to be a gaseous form for (1d6) hours!",
  },
  {
    Roll: [35, 36],
    Value:
      "You find a potion of giant control! It has (1d6) doses and gives you a +6 on your rolls to control giants for (1d6) hours!",
  },
  {
    Roll: [37, 39],
    Value:
      "You find a vial of giant strength! It has (1d6) doses and gives you a +12 on your strength checks for the next (1d6) hours!",
  },
  {
    Roll: [40, 41],
    Value:
      "You find a potion of growth! It has (1d6) doses and allows you to grow in size for (1d6) hours!",
  },
  {
    Roll: [42, 47],
    Value:
      "You find a potion of healing! It has (1d6) doses, and does 1d6 basic healing!",
  },
  {
    Roll: [48, 49],
    Value:
      "You find a potion of Heroism! It has (1d6) doses and you gain 10 Life Points for (1d6) hours!",
  },
  {
    Roll: [50, 51],
    Value:
      "You find a vial of Human Control! It has (1d6) doses and and gives you a +6 on your rolls to control humans for (1d6) hours!",
  },
  {
    Roll: [52, 54],
    Value:
      "You find a potion on invisibility! It has (1d6) doses and allows to you be invisible for (1d6) hours!",
  },
  {
    Roll: [55, 57],
    Value:
      "You find a potion of invulnerability! It has (1d6) doses and allows you to be invulnerable for (1d6) minutes!",
  },
  {
    Roll: [58, 60],
    Value:
      "You find a potion of levitation! It has (1d6) doses and allows you to levitate for (1d6) hours!",
  },
  {
    Roll: [61, 63],
    Value:
      "You find a potion of longevity! It has (1d6) doses and allows you to de-age by (1d6 human equivolent) years!",
  },
  {
    Roll: [64, 66],
    Value:
      "You find a vial of oil of etherealness! It has (1d6) doses and allows you to be ethereal for (1d6*10) minutes!",
  },
  {
    Roll: [67, 69],
    Value:
      "You find a vial of oil of slipperiness! It has (1d6) doses and gives you a +6 to movement for (1d6) hours!",
  },
  {
    Roll: [70, 72],
    Value:
      "You find a philter of love! It has (1d6) doses and when you drink this, you are charmed by the next creature you see for (1d6) hours!",
  },
  {
    Roll: [73, 75],
    Value:
      "You find a philter of persuasiveness! It has (1d6) doses and when you drink this, you get +6 to Persuasion rolls for (1d6) hours!",
  },
  {
    Roll: [76, 78],
    Value:
      "You find a vial of plant control! It has (1d6) doses and gives you a +6 to control plants for (1d6) hours!",
  },
  {
    Roll: [79, 81],
    Value:
      "You find a vial of polymorph self! It has (1d6) doses and allows you to polymorph to other creatures for (1d6) hours!",
  },
  {
    // ????
    Roll: [82, 84],
    Value:
      "Reroll on potion table, add ** tag at end of description, print result.",
  },
  {
    Roll: [85, 87],
    Value:
      "You find a potion of speed! It has (1d6) doses and you gain one extra action per round for (1d6) minutes!",
  },
  {
    Roll: [88, 90],
    Value:
      "You find a potion of super-heroism! It has (1d6) doses and you gain 30 temporary life pionts and +4 all attack rolls for (1d6) minutes!",
  },
  {
    Roll: [91, 93],
    Value:
      "You find a potion of sweet water! It has (1d6) doses and will purify any liquid it is poured into, turning it into pure water.",
  },
  {
    Roll: [94, 96],
    Value:
      "You find a potion of treasure finding! It has (1d6) doses and leads you to the largest treasure hoard within 400 ft of you for (1d6) hours!",
  },
  {
    Roll: 97,
    Value:
      "You find a potion of undead control! It has (1d6) doses and gives you a +6 on rolls to control the undead for (1d6) hours!",
  },
  {
    Roll: [98, 100],
    Value:
      "You find a potion of water breathing! It has (1d6) doses and gives you the ability to breathe underwater for (1d6) hours!",
  },
];

export const PotionsTable = new MyTable(
  PotionsData,
  "Potions",
  DieType.percentile
);
