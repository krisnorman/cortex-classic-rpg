import { Skill, SkillDie } from "./ISkill.js";

export class Survival extends Skill {
  constructor(die: SkillDie) {
    super("Survival", die);
  }
}
