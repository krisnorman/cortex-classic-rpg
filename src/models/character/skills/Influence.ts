import { Skill, SkillDie } from "./ISkill.js";

export class Influence extends Skill {
  constructor(die: SkillDie) {
    super("Influence", die);
  }
}
