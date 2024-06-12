import { Skill, SkillDie } from "./ISkill.js";

export class MechanicalEngineering extends Skill {
  constructor(die: SkillDie) {
    super("Mechanical Engineering", die);
  }
}
