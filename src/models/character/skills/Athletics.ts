import { Skill, SkillDie } from "./ISkill.js";

export class Athletics extends Skill {
  constructor(die: SkillDie) {
    super("Athletics", die);
  }
}
