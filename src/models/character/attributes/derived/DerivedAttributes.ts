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
    LifePoints: LifePoints = new LifePoints(this.attributes.Willpower, this.attributes.Vitality);
    Initiative: Initiative = new Initiative(this.attributes.Agility, this.attributes.Alertness);
    Endurance: Endurance = new Endurance(this.attributes.Vitality, this.attributes.Willpower);
    Resistance: Resistance = new Resistance(this.attributes.Vitality);
    BurstOfStrength: BurstOfStrength = new BurstOfStrength(this.attributes.Strength);
    OutOfHarmsWay: OutOfHarmsWay = new OutOfHarmsWay(this.attributes.Agility, this.attributes.Alertness);
    LongHaul: LongHaul = new LongHaul(this.attributes.Strength,this.attributes.Vitality);
    Memorize: Memorize = new Memorize(this.attributes.Intelligence, this.attributes.Alertness);
    Recall: Recall = new Recall(this.attributes.Intelligence, this.attributes.Willpower);
    
    constructor(private attributes: Attributes) {}
}