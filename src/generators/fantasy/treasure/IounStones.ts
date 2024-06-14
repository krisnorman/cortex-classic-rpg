import { IDice } from "@krisnorman/rpg-utils";
import { IFooModel, ITableRow, MyTable } from "./index.js";

export class IounStone implements IFooModel {
  constructor(title: string) {
    this.Title = title;
    this.Items = [];
    this.HasItems = false;
  }
  Title: string;
  Items: string[];
  HasItems: boolean;
}

export class IounStoneRepository {
  private readonly iounStoneTable = new MyTable(
    IounStoneData,
    "Ioun Stone",
    "1d148"
  );

  constructor(private readonly dice: IDice) {}

  getRandom(count: number = 1, preRoll?: number): IounStone[] {
    const items: IounStone[] = [];

    for (let index = 0; index < count; index++) {
      const roll =
        preRoll === undefined
          ? this.dice.roll(this.iounStoneTable.DieExpression).total
          : preRoll;

      const row = this.iounStoneTable.find(roll);

      let title1 = row.Row.AltValue;
      let title2 = row.Row.Value;

      switch (true) {
        case row.Index === 9:
          title2 = title2.replace(
            "2d10",
            this.dice.roll("2d10").total.toString()
          );
          break;
        case row.Index === 11:
          title2 = title2.replace(
            "2d10",
            this.dice.roll("2d10").total.toString()
          );
          break;
        case row.Index === 14:
          title2 = title2.replace(
            "2d10",
            this.dice.roll("2d10").total.toString()
          );
          break;
        case row.Index === 16:
          title2 = title2.replace(
            "2d10",
            this.dice.roll("2d10").total.toString()
          );
          break;
        case row.Index === 14:
          title2 = title2.replace(
            "2d6",
            this.dice.roll("2d6").total.toString()
          );
          break;
        case row.Index === 28:
          title2 = title2.replace(
            "1d12",
            this.dice.roll("1d12").total.toString()
          );
          break;
        case row.Index === 53:
          // Roll 54
          // reroll twice, print both results as the effect of this Ioun stone.
          const first = this.getReroll(54);
          const second = this.getReroll(54);
          title1 = first[0].Title;
          title2 = second[0].Title;
          break;
        case row.Index === 56:
          title2 = title2.replace(
            "1d4",
            this.dice.roll("1d4").total.toString()
          );
          break;
        case row.Index === 57:
          title2 = title2.replace(
            "2d10",
            this.dice.roll("2d10").total.toString()
          );
          break;
        case row.Index === 62:
          title2 = title2.replace(
            "1d20",
            this.dice.roll("1d20").total.toString()
          );
          break;
        case row.Index === 78:
          title2 = title2
            .replace("1d20", this.dice.roll("1d20").total.toString())
            .replace("1d10", this.dice.roll("1d10").total.toString());
          break;
        case row.Index === 84:
          title2 = title2.replace(
            "1d20",
            this.dice.roll("1d20").total.toString()
          );
          break;
        case row.Index === 92:
          title2 = title2.replace(
            "1d20",
            this.dice.roll("1d20").total.toString()
          );
          break;
        case row.Index === 95:
          title2 = title2.replace(
            "1d4",
            this.dice.roll("1d4").total.toString()
          );
          break;
        case row.Index === 110:
          title2 = title2.replace(
            "2d10",
            this.dice.roll("2d10").total.toString()
          );
          break;
        case row.Index === 131:
          title2 = title2.replace(
            "2d10",
            this.dice.roll("2d10").total.toString()
          );
          break;
        case row.Index === 134:
          title2 = title2.replace(
            "1d20",
            this.dice.roll("1d20").total.toString()
          );
          break;
        case row.Index === 144:
          title2 = title2.replace(
            "1d3",
            this.dice.roll("1d3").total.toString()
          );
          break;
      }

      const item = new IounStone(`${title1}. ${title2}`);
      items.push(item);
    }

    return items;
  }

  private getReroll(exclude: number): IounStone[] {
    const expression = `1d148r${exclude}`;
    const roll = this.dice.roll(expression);
    const item = this.getRandom(1, roll.total);
    return item;
  }
}

export const IounStoneData: ITableRow[] = [
  {
    Roll: 1,
    Value:
      "Ioun Stone of Divine Knowledge: Acts as a holy symbol, giving the user +1 die step " +
      "in the Asset Religiousity, grants a +1 die step in Sense Motive, Knowledge: Religion and Intelligence.",
    AltValue: "Amber Sphere",
  },
  { Roll: 2, Value: "Gain a +1 die step to Agility", AltValue: "Anhedral" },
  {
    Roll: 3,
    Value: "Gain a +1 die step to a random Attribute every day.",
    AltValue: "Balian's Yellow",
  },
  {
    Roll: 4,
    Value: "Grants Mind Blank efffect vs Scrying",
    AltValue: "Black and White Ellipsoid",
  },
  {
    Roll: 5,
    Value:
      "Once per day, may drain mana from a creature or magic item for 1d12 mana regeneration.",
    AltValue: "Black Pyritohedron",
  },
  { Roll: 6, Value: "Absorbs 1d12 electrical damage.", AltValue: "Black Star" },
  {
    Roll: 7,
    Value:
      "Once per day, the stone may be directed to do 1d6 wound damage to an opponent. " +
      "Damage is then transferred as healing to the user.",
    AltValue: "Blood Red Ellipsoid",
  },
  {
    Roll: 8,
    Value:
      "Once per day, can transmute 10 ft of minerals into 1d12 mana recovery.",
    AltValue: "Blood Red Orthorhomboid",
  },
  {
    Roll: 9,
    Value: "Bestows airy water in a 10 ft radius sphere at will.",
    AltValue: "Blue Green Spindle",
  },
  {
    Roll: 10,
    Value:
      "2d10 charges of the following: Once per day on command, you gaid 2d4+2 Life Points, " +
      "split between wound and stun points.",
    AltValue: "Brass Lozenge",
  },
  {
    Roll: 11,
    Value:
      "Ioun Stone of Natural Knowledge: Grants +1 die step to Knowledge: Nature",
    AltValue: "Brassy Stone",
  },
  {
    Roll: 12,
    Value:
      "2d20 charges of the following: User and 200 lbs of possessions can go ethereal for one hour.",
    AltValue: "Bright Silver Cylinder",
  },
  {
    Roll: 13,
    Value: "User gains +1 die step on physical resistance checks vs acid",
    AltValue: "Bright White Rectangle",
  },
  {
    Roll: 14,
    Value:
      "Once per day, the user may use the stone to deal 1d12 energy damage to a target " +
      "or use the energy to heat metal.",
    AltValue: "Brilliant Green Bipyramidal",
  },
  {
    Roll: 15,
    Value:
      "2d10 charges of the following: User and 200 lbs of possesions can assume gaseious form for 1 hour.",
    AltValue: "Brown Rhomboid",
  },
  {
    Roll: 16,
    Value:
      "Ioun Stone of Resistance: Gain +1 die step to physical and mental resistance checks.",
    AltValue: "Burnt Orange",
  },
  {
    Roll: 17,
    Value:
      "2d10 charges of the following: User is able to gain the function to breathe underwater for 1 hour.",
    AltValue: "Cephaloid",
  },
  {
    Roll: 18,
    Value:
      "Once per day the user can take a bonus free action, and can also once per day turn ethereal for one hour.",
    AltValue: "Cerulean Blue Rhomboid",
  },
  {
    Roll: 19,
    Value:
      "Ioun Stone of Adaption: Sustains user without food or water, " +
      "gives them a +1 die type on physical resistance vs environmental temperatures, " +
      "and stops ongoing damage (bleeding, poison, etc).",
    AltValue: "Clear Crystal",
  },
  {
    Roll: 20,
    Value: "User becomes insubstantial.",
    AltValue: "Clear Interconnected Spheres",
  },
  {
    Roll: 21,
    Value:
      "Ioun Stone of Spirit Storage: If the user is killed, their spirit is transferred " +
      "to the stone and can be restored with a restoration spell.",
    AltValue: "Clear Pink Phere",
  },
  {
    Roll: 22,
    Value: "Can store 2d6 pre-made spells.",
    AltValue: "Clear Prism",
  },
  {
    Roll: 23,
    Value: "Grants +1 die type to mental resistance.",
    AltValue: "Clear Sphere",
  },
  {
    Roll: 24,
    Value: "Ioun Stone of Sustenance: sustains the user without food or water.",
    AltValue: "Clear Spindle",
  },
  {
    Roll: 25,
    Value: "User can detect undead at will.",
    AltValue: "Clear Teardrop",
  },
  {
    Roll: 26,
    Value: "User can read magic at will.",
    AltValue: "Copper Rectangle",
  },
  { Roll: 27, Value: "User gains +1 die type to Agility.", AltValue: "Cube" },
  {
    Roll: 28,
    Value: "User gains +1 die type to physical resistance checks vs acid.",
    AltValue: "Cylinder",
  },
  {
    Roll: 29,
    Value: "Absorbs 1d12 damage from magic missiles before burning out.",
    AltValue: "Dark Blue Ellipsoid",
  },
  {
    Roll: 30,
    Value: "Ioun Stone of Awareness: Grants +1 die step on Alertness",
    AltValue: "Dark Blue Rhomboid",
  },
  {
    Roll: 31,
    Value:
      "Ioun Stone of True Sight: D12 Darvision D3 die steps on Perception based checks, " +
      "once per day can see Invisible creatures/objects.",
    AltValue: "Dark Blue Rhomboid",
  },
  {
    Roll: 32,
    Value: "User gets +5 to Get out of Harm's Way",
    AltValue: "Dark Green Ellipsoid",
  },
  {
    Roll: 33,
    Value: "Once per day, the user gets Clairaudience for 10 minutes.",
    AltValue: "Dark Green Ellipsoid",
  },
  {
    Roll: 34,
    Value: "User gains +10 die steps to mental resistance vs spells.",
    AltValue: "Dark Orange Dodecahedron",
  },
  {
    Roll: 35,
    Value: "User is imbued with 4 times their normal mana.",
    AltValue: "Dark Purple Pyramid",
  },
  {
    Roll: 36,
    Value: "User is imbued with 3 times their normal mana.",
    AltValue: "Dark Purple Triangle",
  },
  {
    Roll: 37,
    Value:
      "User can use this stone to detect thoughts 3 times, and then the stone burns out, " +
      "becoming an ordinary rock.",
    AltValue: "Dark Red Cube",
  },
  {
    Roll: 38,
    Value:
      "User can survive without water for as long as they have this stone.",
    AltValue: "Decahedron",
  },
  {
    Roll: 39,
    Value: "User can cast continual light on command without expending mana.",
    AltValue: "Decipton",
  },
  {
    Roll: 40,
    Value: "User can see in magically created darkness, 30 ft range.",
    AltValue: "Deep Black Sphere",
  },
  {
    Roll: 41,
    Value: "User can see with infravision, 60 ft range.",
    AltValue: "Deep Purple Prism",
  },
  {
    Roll: 42,
    Value: "User is immune to poison as long as they have this stone.",
    AltValue: "Deep Purple Sphere",
  },
  {
    Roll: 43,
    Value: "Ioun Stone of Agility: User gains +2 die steps to Agility.",
    AltValue: "Deep Red Sphere",
  },
  {
    Roll: 44,
    Value: "User gets +1 die step to Strength.",
    AltValue: "Deep Red Sphere",
  },
  {
    Roll: 45,
    Value: "Adds 1 die type to a random skill.",
    AltValue: "Dendroid",
  },
  { Roll: 46, Value: "Adds 1 die type to Vitality.", AltValue: "Dodecahedron" },
  {
    Roll: 47,
    Value: "Adds 1 die step to Willpower, then disintegrates.",
    AltValue: "Dull Grey",
  },
  {
    Roll: 48,
    Value:
      "While in possession of this stone, you gain a +2 resistance to force damage, " +
      "and are immune to magic missiles.",
    AltValue: "Dull Orange Rhomboid",
  },
  {
    Roll: 49,
    Value:
      "Ioun Stone of Protection: Grants a 1W magic armor layer for the whole body.",
    AltValue: "Dusty Rose Prism",
  },
  {
    Roll: 50,
    Value: "Larloch's Ioun Stone: Gain +5 to Get out of Harm's Way.",
    AltValue: "Dusty Rose Prism",
  },
  { Roll: 51, Value: "User can detect magic at will.", AltValue: "Echinid" },
  {
    Roll: 52,
    Value: "Adds +1 to saving throws vs poison gas.",
    AltValue: "Ellipsoid",
  },
  {
    Roll: 53,
    Value: "Gain +1 die type to Influence based rolls.",
    AltValue: "Enneid",
  },
  {
    Roll: 54,
    Value: "reroll twice, print both results as the effect of this Ioun stone.",
    AltValue: "Euhedral",
  },
  {
    Roll: 55,
    Value: "Adds +2 die steps to Intelligence.",
    AltValue: "Faceted Sphere",
  },
  {
    Roll: 56,
    Value: "Adds +1 to physical resistance checks vs cold.",
    AltValue: "Flickering White Snowflacke",
  },
  {
    Roll: 57,
    Value: "Contains 1d4 wishes, when used turns into a normal stone.",
    AltValue: "Frosty White Octahedron",
  },
  {
    Roll: 58,
    Value:
      "2d10 charges of: User and 200 lbs of possessions can go astral for up to 1 hour.",
    AltValue: "Gold Ellipsoid",
  },
  {
    Roll: 59,
    Value: "Adds +1 die type to the asset Religiousity.",
    AltValue: "Golden Gem",
  },
  {
    Roll: 60,
    Value: "Adds +1 to saving throws vs gas attacks.",
    AltValue: "Green Sphere",
  },
  {
    Roll: 61,
    Value: "Ioun Stone of Vitality: +1 to mental resistance vs death spells.",
    AltValue: "Green and Blue Sphere",
  },
  { Roll: 62, Value: "Adds +1 die type to Strength", AltValue: "Hectoid" },
  {
    Roll: 63,
    Value: "1d20 charges of: user can turn gaseous for one hour.",
    AltValue: "Heptahedron",
  },
  {
    Roll: 64,
    Value:
      "User can bring 1 dying creature back to 1 stun and 1 wound point, stome crumbles to dust when used.",
    AltValue: "Heptid",
  },
  {
    Roll: 65,
    Value: "Stone hums softely when poison is within 20 ft of user.",
    AltValue: "Hexagonoid",
  },
  {
    Roll: 66,
    Value: "Adds +1 to user's mana pool.",
    AltValue: "Incandescent Blue Sphere",
  },
  {
    Roll: 67,
    Value: "Ioun Stone of Insight: Stone adds +2 die steps to Willpower.",
    AltValue: "Incandescent Blue Sphere",
  },
  {
    Roll: 68,
    Value: "Larloch's Ioun Stone: Grants +3 die types to Willpower.",
    AltValue: "Incandescent Blue Sphere",
  },
  {
    Roll: 69,
    Value:
      "Emits a constant foxxilization pulse affecting all living beings within 30 ft",
    AltValue: "Indigo Blue Trapezohedron",
  },
  { Roll: 70, Value: "Grants 360 degree vision", AltValue: "Ioun Eye" },
  {
    Roll: 71,
    Value:
      "Adds +1 die type to Willpower and all Knowledge based skills, sheds light at will.",
    AltValue: "Ioun's Flame",
  },
  {
    Roll: 72,
    Value: "Ioun Stone of Sustenance: sustains the user without air.",
    AltValue: "Iridescent Spindle",
  },
  {
    Roll: 73,
    Value:
      "Grants d12 Low Light Vision, +2 to hit when focused on specified target, " +
      "can use stone as a spying device, BUT cannot knock opponents unconcious.",
    AltValue: "Jet Black",
  },
  {
    Roll: 74,
    Value:
      "Ioun Stone of Greater Absorption: has a 50% chance of absorbing a spell cast at the user.",
    AltValue: "Lavender and Green Ellipsoid",
  },
  {
    Roll: 75,
    Value: "User can understand all spoken languages.",
    AltValue: "Light Blue Prism",
  },
  {
    Roll: 76,
    Value: "Adds +1 to mental resistance vs Charm spells.",
    AltValue: "Lozenge",
  },
  {
    Roll: 77,
    Value: "User is immune to all non-magical attacks.",
    AltValue: "Maroon Star",
  },
  {
    Roll: 78,
    Value: "Disables infravision within 20 ft.",
    AltValue: "Monoclinoid",
  },
  {
    Roll: 79,
    Value:
      "It can store 1d20 spells, and currently has 1d10 spells already in it.*",
    AltValue: "Mottled Grey Sphere",
  },
  {
    Roll: 80,
    Value: "Adds +1 to mental resistance checks.",
    AltValue: "Nephroid",
  },
  {
    Roll: 81,
    Value: "User has continual mind blank cast on them.",
    AltValue: "Octahedron",
  },
  {
    Roll: 82,
    Value: "Adds +6 to mental resistance checks vs mind-affecting spells.",
    AltValue: "Orange Cube",
  },
  {
    Roll: 83,
    Value: "Adds +1 die type to the asset Spellcasting",
    AltValue: "Orange Prism",
  },
  {
    Roll: 84,
    Value: "Adds +1 die type to Intelligence",
    AltValue: "Orthorhomboid",
  },
  {
    Roll: 85,
    Value: "1d20 charges of: Waterwalking up to 1 hour.",
    AltValue: "Ovoid",
  },
  {
    Roll: 86,
    Value: "Ioun Stone of Steadfastness: Immune to Fear",
    AltValue: "Pale Aquamarine Prism",
  },
  {
    Roll: 87,
    Value: "Ioun Stone of Might: Adds +2 die types to Strength",
    AltValue: "Pale Blue Rhomboid",
  },
  {
    Roll: 88,
    Value: "User can not be detected by magical means",
    AltValue: "Pale Green Lozenge",
  },
  {
    Roll: 89,
    Value: "Ioun Stone of Mastery: Grants +1 to ALL rolls.",
    AltValue: "Pale Green Prism",
  },
  {
    Roll: 90,
    Value:
      "Larloch's Ioun Stone: Adds +5 to attack rolls, physical resistance rolls, and mental resistance rolls.",
    AltValue: "Pale Green Prism",
  },
  {
    Roll: 91,
    Value:
      "Ioun Stone of Absorption: Has a 25% chance of absorbing spells cast at the user.",
    AltValue: "Pale Lavender Ellipsoid",
  },
  {
    Roll: 92,
    Value: "Instantly learn 3 new spells, afterwards the stone disintegrates.",
    AltValue: "Pale White Sphere",
  },
  {
    Roll: 93,
    Value:
      "1d20 charges of: User can caste haste on themselves without spending mana.",
    AltValue: "Pearlized Brown Ellipsoid",
  },
  {
    Roll: 94,
    Value: "If worn by an undead, they regenerate 1 WP per hour.*",
    AltValue: "Pearly Black Spindle",
  },
  {
    Roll: 95,
    Value: "User gains 1 WP in healing per 10 rounds/1 turn.",
    AltValue: "Pearly White Prism",
  },
  {
    Roll: 96,
    Value: "Ioun Stone of Regeneration: User gains 1d4 basic healing per hour.",
    AltValue: "Pearly White Spindle",
  },
  {
    Roll: 97,
    Value: "Once per day, can become invisible to the undead for 1 hour.",
    AltValue: "Pebble",
  },
  {
    Roll: 98,
    Value:
      "Provides a +1 die type to Spellcasting ten times, and then disintegrates.",
    AltValue: "Peg",
  },
  {
    Roll: 99,
    Value: "Once per day, user gains a free action.",
    AltValue: "Pentahedron",
  },
  {
    Roll: 100,
    Value: "Stone has a 10% chance of absorbing a spell cast at the user.",
    AltValue: "Pink and Green Ellipsoid",
  },
  {
    Roll: 101,
    Value:
      "Ioun Stone of Leadership: User gains +2 die types to all Influence based skills.",
    AltValue: "Pink and Green Sphere",
  },
  {
    Roll: 102,
    Value: "Adds +1 die type to Vitality",
    AltValue: "Pink Ellipsoid",
  },
  {
    Roll: 103,
    Value: "Ioun Stone of Fortitude: Adds +1 die type to Vitality",
    AltValue: "Pink Rhomboid",
  },
  {
    Roll: 104,
    Value: "User can see in magically created darkness.",
    AltValue: "Prism",
  },
  {
    Roll: 105,
    Value:
      "User can scan surface thoughts of one person per round within 30 ft.",
    AltValue: "Puce Cube",
  },
  {
    Roll: 106,
    Value: "Adds +1 to physical resistance checks vs fire",
    AltValue: "Pulsing Red Star",
  },
  {
    Roll: 107,
    Value: "Adds +1 to Influence rolls vs creatures of the same race.",
    AltValue: "Pure White Octahedron",
  },
  {
    Roll: 108,
    Value: "User regenerates 1 WP every 4 hours.",
    AltValue: "Pyramid",
  },
  {
    Roll: 109,
    Value: "User gains a +5 to mental resistance checks.",
    AltValue: "Rainbow",
  },
  {
    Roll: 110,
    Value: "User can levitate at will.",
    AltValue: "Rainbow Ellipsoid",
  },
  {
    Roll: 111,
    Value:
      "2d10 charges of: User and 200 lbs of possessions can polymorph for 1 hour.",
    AltValue: "Rainbow Spindle",
  },
  {
    Roll: 112,
    Value: "Adds +1 to saving throws vs poison",
    AltValue: "Reactangle",
  },
  {
    Roll: 113,
    Value: "User has water breathing for as long as they possess this stone.",
    AltValue: "Red",
  },
  {
    Roll: 114,
    Value: "Grants a +2 die type towards one random language",
    AltValue: "Red Crystal",
  },
  {
    Roll: 115,
    Value:
      "Ioun Stone of Regeneration: Once per day, user heals 10 basic points.",
    AltValue: "Red Ellipsoid",
  },
  {
    Roll: 116,
    Value: "User gains +2 to physical resistance vs fire.",
    AltValue: "Red Sphere",
  },
  {
    Roll: 117,
    Value:
      "Absorbs 10 points of damage, turns to dust when all 10 points are used.",
    AltValue: "Rhomboid",
  },
  {
    Roll: 118,
    Value:
      "Ioun Stone of Sustenance: User requires no food, water, or air, " +
      "and only requires half the normal amount of rest.",
    AltValue: "Rhomboid",
  },
  {
    Roll: 119,
    Value: "Gain +2 die types in Asset: Lucky",
    AltValue: "Rich Green Star",
  },
  {
    Roll: 120,
    Value: "User can comprehend written languages up to 1 hour per day.",
    AltValue: "Rod",
  },
  { Roll: 121, Value: "Continual Read Magic", AltValue: "Round" },
  {
    Roll: 122,
    Value: "Ioun Stone of Intellect: User gains +2 die types to Intellegence.",
    AltValue: "Scarlet and Blue Sphere",
  },
  {
    Roll: 123,
    Value: "Larloch's Ioun Stone: user gains +6 die types to Intellegence.",
    AltValue: "Scarlet and Blue Sphere",
  },
  {
    Roll: 124,
    Value: "Use can gain +3 die types to strength for one hour per day.",
    AltValue: "Septahedron",
  },
  {
    Roll: 125,
    Value: "User can teleport one time, stone turns to dust when used.",
    AltValue: "Sexahedron",
  },
  {
    Roll: 126,
    Value: "3 times a day, user can teleport.",
    AltValue: "Shining Black Spiral",
  },
  {
    Roll: 127,
    Value: "Adds +1 to physical resistance checks vs electricity",
    AltValue: "Silver Rod",
  },
  {
    Roll: 128,
    Value: "Negates rear-attack bonuses.",
    AltValue: "Silver Sphere",
  },
  {
    Roll: 129,
    Value: "Ioun Stone of Self-Preservation: Gain +1 die type to Intellegence",
    AltValue: "Silgery Gem",
  },
  {
    Roll: 130,
    Value: "Gain +1 to mental resistance vs petrification gazes.",
    AltValue: "Silvery Mirror Cube",
  },
  {
    Roll: 131,
    Value: "reroll once, add $ to the end of the description.",
    AltValue: "Singing Ioun Stone",
  },
  {
    Roll: 132,
    Value: "2d10 charges of : Protection against live-draining spells.",
    AltValue: "Soft Black Rectangle",
  },
  {
    Roll: 133,
    Value: "Adds +1 to mental resistance vs petrification",
    AltValue: "Sphere",
  },
  {
    Roll: 134,
    Value: "Once per day, user can be invisible to animals for one hour.",
    AltValue: "Spindle",
  },
  {
    Roll: 135,
    Value: "1d20 charges of: User can cast Light for up to one hour.",
    AltValue: "Star",
  },
  {
    Roll: 136,
    Value:
      "User is sustained without food for as long as they have this stone.",
    AltValue: "Stelloid",
  },
  {
    Roll: 137,
    Value:
      "Ioun Stone of Historical Knowledge: User gains +2 die type to Knowledge: History",
    AltValue: "Steely Sphere",
  },
  {
    Roll: 138,
    Value: "Every day, has a different effect on the user.",
    AltValue: "Tear of Ioun",
  },
  {
    Roll: 139,
    Value: "Adds +1 to physical resistance vs cold",
    AltValue: "Tetrapton",
  },
  { Roll: 140, Value: "Polymorphs user into a tiger.", AltValue: "Tigereyes" },
  {
    Roll: 141,
    Value:
      "Creates an anti-magic shield around user, when magic hits it, it destroys the magic and then turns to dust.",
    AltValue: "Tile",
  },
  {
    Roll: 142,
    Value: "User ganes +1 die type to Willpower",
    AltValue: "Tredyhedron",
  },
  {
    Roll: 143,
    Value: "User adds +1 to physical resistance vs fire",
    AltValue: "Triclinid",
  },
  {
    Roll: 144,
    Value: "User gains Infravision, range of 60 ft.",
    AltValue: "Tubule",
  },
  {
    Roll: 145,
    Value:
      "Ioun Stone of Reserve: User can store 1d3 spells in the stone to be used at a later time.",
    AltValue: "Vibrant Purple Prism",
  },
  {
    Roll: 146,
    Value:
      "Ioun Stone of Perfect Language: User can understand all spoken languages, " +
      "gains +3 die types to all Influence based skills.",
    AltValue: "White and Pink Rhomboid",
  },
  {
    Roll: 147,
    Value: "Sheds continual light on command",
    AltValue: "Yellow Sphere",
  },
  {
    Roll: 148,
    Value: "Adds +1 mental resistance vs petrification.",
    AltValue: "Yellow Spindle",
  },
];
