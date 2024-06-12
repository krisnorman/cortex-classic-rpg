import { Skill, SkillDie } from "./ISkill.js";

export class Guns extends Skill {
  constructor(die: SkillDie) {
    super("Guns", die);
  }
}
