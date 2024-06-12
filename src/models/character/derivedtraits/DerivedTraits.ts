import { BurstOfStrength } from "./BurstOfStrength.js";
import { Endurance } from "./Endurance.js";
import { Initiative } from "./Initiative.js";
import { LifePoints } from "./LifePoints.js";
import { LongHaul } from "./LongHaul.js";
import { Memorize } from "./Memorize.js";
import { OutOfHarmsWay } from "./OutOfHarmsWay.js";
import { Recall } from "./Recall.js";
import { Resistance } from "./Resistance.js";
import { Attributes } from "../attributes/index.js";

export interface IDerivedTraits {
  LifePoints: LifePoints;
  Initiative: Initiative;
  Endurance: Endurance;
  Resistance: Resistance;
  BurstOfStrength: BurstOfStrength;
  OutOfHarmsWay: OutOfHarmsWay;
  LongHaul: LongHaul;
  Memorize: Memorize;
  Recall: Recall;
}

export class DerivedTraits implements IDerivedTraits {
  constructor(private attributes: Attributes) {
    this.LifePoints = new LifePoints(
      this.attributes.Willpower,
      this.attributes.Vitality
    );
    this.Initiative = new Initiative(
      this.attributes.Agility,
      this.attributes.Alertness
    );
    this.Endurance = new Endurance(
      this.attributes.Vitality,
      this.attributes.Willpower
    );
    this.Resistance = new Resistance(this.attributes.Vitality);
    this.BurstOfStrength = new BurstOfStrength(this.attributes.Strength);
    this.OutOfHarmsWay = new OutOfHarmsWay(
      this.attributes.Agility,
      this.attributes.Alertness
    );
    this.LongHaul = new LongHaul(
      this.attributes.Strength,
      this.attributes.Vitality
    );
    this.Memorize = new Memorize(
      this.attributes.Intelligence,
      this.attributes.Alertness
    );
    this.Recall = new Recall(
      this.attributes.Intelligence,
      this.attributes.Willpower
    );
  }

  LifePoints: LifePoints;
  Initiative: Initiative;
  Endurance: Endurance;
  Resistance: Resistance;
  BurstOfStrength: BurstOfStrength;
  OutOfHarmsWay: OutOfHarmsWay;
  LongHaul: LongHaul;
  Memorize: Memorize;
  Recall: Recall;
}
