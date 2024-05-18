import { Die } from "../../../dice";
import { SkillBase } from "../SkillBase";
import { ISpecialization } from "./ISpecialization";

export class SpecializationBase implements ISpecialization {
    constructor(private _dieType: Die, private parentSkill: SkillBase){}

    roll(): number {
        let sides = this.Sides + this.parentSkill.Sides;
        let die = new Die("any", sides);
        return die.roll();
    }
    updateDie(newDie: Die): void {
        this._dieType = newDie;
    }   
    get Sides(): number { return this._dieType.sides;}
}