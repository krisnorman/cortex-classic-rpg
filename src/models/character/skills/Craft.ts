import { Skill, SkillDie } from "./ISkill.js";

export class Craft extends Skill {
  constructor(die: SkillDie) {
    super("Craft", die);
  }
}
