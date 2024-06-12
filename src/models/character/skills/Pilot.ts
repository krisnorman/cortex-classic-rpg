import { Skill, SkillDie } from "./ISkill.js";

export class Pilot extends Skill {
  constructor(die: SkillDie) {
    super("Pilot", die);
  }
}
