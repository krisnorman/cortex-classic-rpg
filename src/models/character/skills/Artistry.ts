import { Skill, SkillDie } from "./ISkill.js";

export class Artistry extends Skill {
    constructor(die: SkillDie) {
        super("Artistry", die);
    }    
}
