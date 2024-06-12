import { Skill, SkillDie } from "./ISkill.js";

export class UnarmedCombat extends Skill {
  constructor(die: SkillDie) {
    super("Unarmed Combat", die);
  }
}
