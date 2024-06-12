import { Agility } from "./Agility.js";
import { Alertness } from "./Alertness.js";
import { Intelligence } from "./Intelligence.js";
import { Strength } from "./Strength.js";
import { Vitality } from "./Vitality.js";
import { Willpower } from "./Willpower.js";
import { DerivedTraits, IDerivedTraits } from "../derivedtraits/index.js";

export interface IAttributes {
  Strength: Strength;
  Agility: Agility;
  Vitality: Vitality;
  Alertness: Alertness;
  Intelligence: Intelligence;
  Willpower: Willpower;
  DerivedTraits: IDerivedTraits;
}

export class Attributes implements IAttributes {
  DerivedTraits: IDerivedTraits;

  constructor(
    public Strength: Strength,
    public Agility: Agility,
    public Vitality: Vitality,
    public Alertness: Alertness,
    public Intelligence: Intelligence,
    public Willpower: Willpower
  ) {
    this.DerivedTraits = new DerivedTraits(this);
  }
}
