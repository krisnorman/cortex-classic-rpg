import { Skill, SkillDie } from "./ISkill.js";

export class Knowledge extends Skill {
  constructor(die: SkillDie) {
    super("Knowledge", die);
  }
}
