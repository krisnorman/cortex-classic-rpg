import { DieType, IDice } from "@krisnorman/rpg-utils";
import { IFooModel, ITableRow, MyTable } from "./index.js";

export class InsturmentOfTheBards implements IFooModel {
  constructor(title: string) {
    this.Title = title;
    this.Items = [];
    this.HasItems = false;
  }
  Title: string;
  Items: string[];
  HasItems: boolean;
}

export class InsturmentOfTheBardsRepository {
  private readonly insturmentOfTheBardsTable = new MyTable(
    InsturmentOfTheBardsData,
    "Insturment of the Bards",
    DieType.d20
  );

  constructor(private readonly dice: IDice) {}

  getRandom(count: number = 1): InsturmentOfTheBards[] {
    const items: InsturmentOfTheBards[] = [];

    for (let index = 0; index < count; index++) {
      const roll = this.dice.roll(this.insturmentOfTheBardsTable.DieExpression);
      const row = this.insturmentOfTheBardsTable.find(roll.total);

      let title = `${row.Row.AltValue}. ${row.Row.Value}`;

      switch (true) {
      }

      const item = new InsturmentOfTheBards(title);
      items.push(item);
    }

    return items;
  }
}

export const InsturmentOfTheBardsData: ITableRow[] = [
  {
    Roll: [1, 5],
    Value:
      "Must have a D6 Spellcasting and a d8 in Performance: String Instruments to use. " +
      "Gives a +2 die step to Spellcasting when used for the following spells: " +
      "Fly, Invisibility, Levitate, Entangle, Faerie Fire, Shillelagh, Speak with Animals.",
    AltValue: "Faclucan Bandore",
  },
  {
    Roll: [6, 9],
    Value:
      "Must have a D6 Spellcasting and a d8 in Performance: String Instruments to use. " +
      "Gives a +2 die step to Spellcasting when used for the following spells: " +
      "Fly, Invisibility, Levitate,Barkskin, Cure Wounds (1d8+1), Fog Cloud",
    AltValue: "Mac-Fuirmidh Cittern",
  },
  {
    Roll: [10, 12],
    Value:
      "Must have a D6 Spellcasting and a D8 in Performance: Stringed Instruments. " +
      "Gives a +2 die step when used for the following spells: Fly, Invisibility, " +
      "Levitate, Animal Friendship, Protection from Fire, Protection from Poison",
    AltValue: "Doss Lute",
  },
  {
    Roll: [13, 15],
    Value:
      "Must have a D8 Spellcasting and a D10 in Performance: Stringed Instruments to use. " +
      "Gives a +3 die step when used for the following spells: Fly, Invisibility, " +
      "Levitate, Cure Wounds (3d8+3), Dispel Magic, Protection from Lightning",
    AltValue: "Canaith Mandolin",
  },
  {
    Roll: [16, 17],
    Value:
      "Must have a D8 Spellcasting and a D10 in Performance: Stringed Instruments to use. " +
      "Gives a +3 die step when used for the following spells: Fly, Invisibility, " +
      "Levitate, Stone Shape, Wall of Fire, Wind Wall",
    AltValue: "Cli Lyre",
  },
  {
    Roll: [18, 19],
    Value:
      "Must have a D10 Spellcasting and a D12 in Performance:String Instruments to use. " +
      "Gives a +4 die step when used for the following spells: Fly, Invisibility, " +
      "Levitate, Control Weather, Cure Wounds (5d8+5), Wall of Thorns.",
    AltValue: "Anstruth Harp",
  },
  {
    Roll: 20,
    Value:
      "Must have a D12 Spellcasting and a D12 in Performance: String Instruments to use. " +
      "Gives a +5 die step when used for the following spells: Fly, Invisibility, " +
      "Levitate, Confusion, Control Weather, Fire Storm.",
    AltValue: "Ollamh Harp",
  },
];
