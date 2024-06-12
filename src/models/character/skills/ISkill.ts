import { IDie, IRollable } from "@krisnorman/rpg-utils";
import { IRoller } from "../../../dice/index.js";

export type SkillDieTypes = 0|2|4|6|8|10|12; 

export class SkillDie implements IDie {
    constructor(public sides: SkillDieTypes, private roller: IRoller){
        
    }
    
    roll(times: number = 1): number {
        return this.roller.roll(this.sides);
    }

    add(sides:SkillDieTypes): void {
       this.sides += sides; 
    }

    subtract(sides: SkillDieTypes): void {
        this.sides -= sides;
    }
}

export interface ISkill {
    sides:number;
}

export class Skill implements ISkill, IRollable {
    constructor(public name: string, private die: SkillDie){
        this.sides = die.sides;
    }

    sides: SkillDieTypes;

    roll(times?: number): number {
        return this.die.roll();
    }
}