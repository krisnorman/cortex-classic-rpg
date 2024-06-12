import { Skill, SkillDie } from "./ISkill.js";

export class Performance extends Skill {
  constructor(die: SkillDie) {
    super("Performance", die);
  }
}
