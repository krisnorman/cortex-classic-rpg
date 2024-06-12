import { Skill, SkillDie } from "./ISkill.js";

export class Linguist extends Skill {
  constructor(die: SkillDie) {
    super("Linguist", die);
  }
}
