import { Skill, SkillDie } from "./ISkill.js";

export class Perception extends Skill {
  constructor(die: SkillDie) {
    super("Perception", die);
  }
}
