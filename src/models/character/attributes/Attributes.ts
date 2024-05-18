import { Agility } from "./Agility";
import { Alertness } from "./Alertness";
import { Intelligence } from "./Intelligence";
import { Strength } from "./Strength";
import { Vitality } from "./Vitality";
import { Willpower } from "./Willpower";
import { Die } from "../../dice";
import { AppConstants } from "../../../AppConstants";

export class Attributes {
  Strength: Strength;
  Agility: Agility;
  Vitality: Vitality;
  Alertness: Alertness;
  Intelligence: Intelligence;
  Willpower: Willpower;
  
  private constructor(
    strDie: Die,
    agiDie: Die,
    vitDie: Die,
    aleDie: Die,
    intDie: Die,
    wilDie: Die
  ) {
    this.Strength = new Strength(strDie);
    this.Agility = new Agility(agiDie);
    this.Vitality = new Vitality(vitDie);
    this.Alertness = new Alertness(aleDie);
    this.Intelligence = new Intelligence(intDie);
    this.Willpower = new Willpower(wilDie);    
  }

  public static Create(
    strength: number,
    agility: number,
    vitality: number,
    alertness: number,
    intelligence: number,
    willpower: number
  ): Attributes {    
    if (!this.validate(strength)) throw new Error(`Attribute Strength error. Attributes must be between 2 and 12 and must be divisible by 2.`);
    if (!this.validate(agility)) throw new Error(`Attribute Agility error. Attributes must be between 2 and 12 and must be divisible by 2.`);
    if (!this.validate(vitality)) throw new Error(`Attribute Vitality error. Attributes must be between 2 and 12 and must be divisible by 2.`);
    if (!this.validate(alertness)) throw new Error(`Attribute Alertness error. Attributes must be between 2 and 12 and must be divisible by 2.`);
    if (!this.validate(intelligence)) throw new Error(`Attribute Intelligence error. Attributes must be between 2 and 12 and must be divisible by 2.`);
    if (!this.validate(willpower)) throw new Error(`Attribute Willpower error. Attributes must be between 2 and 12 and must be divisible by 2.`);

    let attrs = new Attributes(
      new Die(`D${strength}`, strength),
      new Die(`D${agility}`, agility),
      new Die(`D${vitality}`, vitality),
      new Die(`D${alertness}`, alertness),
      new Die(`D${intelligence}`, intelligence),
      new Die(`D${willpower}`, willpower)
    );    
    return attrs;
  }

  private static validate(value: number): boolean {
    let divisible = value % 2 === 0;
    let overMax = value > AppConstants.MAX_DIE_TYPE;
    let underMin = value < AppConstants.MIN_DIE_TYPE;
    
    return divisible && !overMax && !underMin;
  }
}