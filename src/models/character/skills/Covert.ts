import { Skill, SkillDie } from "./ISkill.js";

export class Covert extends Skill {
  constructor(die: SkillDie) {
    super("Covert", die);
  }
}
