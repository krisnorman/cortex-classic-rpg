import { IDice } from "@krisnorman/rpg-utils";
import { IFooModel } from "./FantasyTreasureGenerator.js";
import { ITableRow, MyTable } from "./MyTable.js";

export class Weapon implements IFooModel {
  constructor(title: string) {
    this.Title = title;
  }
  Title: string;
  Items: string[] = [];
  HasItems: boolean = false;
}

export class WeaponsRepository {
  private readonly weaponsTable = new MyTable(WeaponsData, "Weapons", "1d58");
  constructor(private dice: IDice) {}

  getRandom(count: number = 1): Weapon[] {
    const weapons: Weapon[] = [];
    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.weaponsTable.DieExpression);
      const row = this.weaponsTable.find(roll.total);
      let title: string = row.Row.Value
        .replace("(1d12)",this.dice.roll("1d12").total.toString())
        .replace("(2d12)", this.dice.roll("2d12").total.toString());

      const weapon = new Weapon(title);
      weapons.push(weapon);
    }
    return weapons;
  }
}

export const WeaponsData: ITableRow[] = [
  {
    Roll: 1,
    Value: `You found (1d12) arrows! They do 1d6 wound damage each when fired from a bow.`,
  },
  { Roll: 2, Value: "You found a battle axe! It does 1d8 wound damage." },
  { Roll: 3, Value: "You found a hand axe! It does 1d6 wound damage." },
  {
    Roll: 4,
    Value: "You found a throwing axe! It does 1d6 wound damage when thrown.",
  },
  {
    Roll: 5,
    Value:
      "You found a bardiche! It does 2d4 wound damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 6,
    Value:
      "You found a bec de corbin! It does 1d8 wound damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 7,
    Value:
      "You found a Bill-Guisarme! It does 2d4 wound damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 8,
    Value:
      "You found a hefty, well cared for stick! Great for bashing in heads! This Bo Stick does 1d6 stun damage.",
  },
  { Roll: 9, Value: "OOGA BOOGA! You found a club! It does 1d6 stun damage!" },
  { Roll: 10, Value: "You found a dagger! It does 1d4 wound damage." },
  {
    Roll: 11,
    Value:
      "You found a dart! Play a game with it or do 1d3 wound damage when thrown at creatures.",
  },
  {
    Roll: 12,
    Value:
      "You found a Fauchard! It does 1d6 wound damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 13,
    Value:
      "You found a Fauchard-Fork! It does 1d8 wound damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 14,
    Value: "You found a footman's flail! It does 1d6+1 stun damage.",
  },
  {
    Roll: 15,
    Value: "You found a horseman's flail! It does 1d4+1 stun damage.",
  },
  {
    Roll: 16,
    Value:
      "You found a military fork! It does 1d8 wound damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 17,
    Value:
      "You found a glaive! It does 1d6 wound damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 18,
    Value:
      "You found a glaive-guisarme! It does 2d4 wound damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 19,
    Value:
      "You found a guisarme! It does 2d4 wound damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 20,
    Value:
      "You found a guisarme-voulge! It does 2d4 wound damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 21,
    Value:
      "You found a halberd! It does 1d10 wound damage and has an extended melee range of 10 ft.",
  },
  { Roll: 22, Value: "You found a lucern hammer! It does 2d4 stun damage." },
  {
    Roll: 23,
    Value:
      "You found a hammer! Now go find some nails! It does 1d4+1 stun damage.",
  },
  {
    Roll: 24,
    Value: "You found a javelin! It does 1d6 wound damage when thrown.",
  },
  {
    Roll: 25,
    Value:
      "Ahhh, what a lovely stick! And it's named Jo! This jo stick does 1d6 stun damage.",
  },
  {
    Roll: 26,
    Value:
      "You found a light lance! It does 1d6 stun damage and can only be used when riding on the back of a mount.",
  },
  {
    Roll: 27,
    Value:
      "You found a medium lance! It does 1d6+1 stun damage and can only be used when riding on the back of a mount.",
  },
  {
    Roll: 28,
    Value:
      "You found a heavy lance! It does 2d4+1 stun damage and can only be used when riding on the back of a mount.",
  },
  { Roll: 29, Value: "You found a footman's mace! It does 1d6+1 stun damage." },
  { Roll: 30, Value: "You found a horseman's mace! It does 1d6 stun damage." },
  { Roll: 31, Value: "You found a morning star! It does 2d4 basic damage." },
  { Roll: 32, Value: "You found a partisan! It does 1d6 wound damage." },
  {
    Roll: 33,
    Value: "You found a footman's military pick! It does 1d6+1 basic damage.",
  },
  {
    Roll: 34,
    Value: "You found a horseman's military pick! It does 1d4+1 basic damage.",
  },
  {
    Roll: 35,
    Value:
      "You found an awl pike! It does 1d6 would damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 36,
    Value: `You found (1d12) light crossbow bolts! They do 1d4 wound damage when fired from a crossbow.`,
  },
  {
    Roll: 37,
    Value: `You found (1d12) heavy cross bow bolts! They do 1d4+1 wound damage when fired from a crossbow.`,
  },
  {
    Roll: 38,
    Value:
      "You found a ranseur! It does 2d4 wound damage and has an extended melee range of 10 ft.",
  },
  { Roll: 39, Value: "You found a scimitar! It does 1d8 would damage." },
  {
    Roll: 40,
    Value: `You found (2d12) metal sling bullets! They do 1d4+1 stun damage when used in a sling.`,
  },
  {
    Roll: 41,
    Value: `You found (2d12) rocks, perfectly shaped to use as bullets in a sling! They do 1d4 stun damage when used in a sling.`,
  },
  {
    Roll: 42,
    Value:
      "You found a spear! It does 1d6 wound damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 43,
    Value:
      "You found a spetum! It does 1d6+1 wound damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 44,
    Value:
      "You found a quarter staff! It does 1d6 stun damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 45,
    Value:
      "You found a bastard sword! It's not it's fault it doesn't know who it's dad is! It does 2d4 wound damage.",
  },
  {
    Roll: 46,
    Value:
      "It's not broad, it's jsut big boned! This broad sword does 2d4 wound damage.",
  },
  { Roll: 47, Value: "You found a long sword! It does 1d8 wound damage." },
  { Roll: 48, Value: "You found a short sword! It does 1d6 wound damage." },
  {
    Roll: 49,
    Value: "You found a two handed sword! It does 1d10 wound damage.",
  },
  { Roll: 50, Value: "You found a trident! It does 1d6+1 wound damage." },
  {
    Roll: 51,
    Value:
      "You found a voulge! It does 2d4 wound damage and has an extended melee range of 10 ft.",
  },
  {
    Roll: 52,
    Value:
      "You found a long composite bow! It has a range of 120 ft and can fire twice a round.",
  },
  {
    Roll: 53,
    Value:
      "You found a short composite bow! It has a range of 70 ft and can fire twice a round.",
  },
  {
    Roll: 54,
    Value:
      "You found a long bow! It has a range of 100 ft and can fire twice a round.",
  },
  {
    Roll: 55,
    Value:
      "You have found a short bow! It has a range of 60 ft and can fire twice a round.",
  },
  {
    Roll: 56,
    Value:
      "You found a heavy crossbow! It has a range of 120 ft and can fire once every two rounds.",
  },
  {
    Roll: 57,
    Value:
      "You found a light crossbow! It has a range of 80 ft and can fire once a round.",
  },
  {
    Roll: 58,
    Value:
      "You found a sling! It has a range of 50 ft and can fire once a round.",
  },
];
// export const WeaponsTable = new MyTable(WeaponsData, "Weapons", "d58");
