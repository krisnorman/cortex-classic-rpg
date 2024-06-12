import { Skill, SkillDie } from "./ISkill.js";

export class Discipline extends Skill {
  constructor(die: SkillDie) {
    super("Discipline", die);
  }
}
