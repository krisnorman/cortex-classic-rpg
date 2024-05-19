import { Dice, Die } from "@krisnorman/rpg-utils";
import { ISkill } from "./ISkill";

export class SkillBase implements ISkill {
    constructor(protected _dieType: Die = Dice.d0) { }
    roll(): number {
        return this._dieType.roll().Total;
    }
    updateDie(newDie: Die): void {        
        this._dieType = newDie;
    }
    get value(): number {return this._dieType.sides;};
    name: string = "";
    get Sides(): number { return this._dieType.sides; }
    get Die(): string { return this._dieType.name; };    
}
