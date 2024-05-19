import { BurstOfStrength } from "./BurstOfStrength";
import { Endurance } from "./Endurance";
import { Initiative } from "./Initiative";
import { LifePoints } from "./LifePoints";
import { LongHaul } from "./LongHaul";
import { Memorize } from "./Memorize";
import { OutOfHarmsWay } from "./OutOfHarmsWay";
import { Recall } from "./Recall";
import { Resistance } from "./Resistance";
import { Attributes } from "../";

export class DerivedAttributes {
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
