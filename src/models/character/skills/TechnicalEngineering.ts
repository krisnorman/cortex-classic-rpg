import { Skill, SkillDie } from "./ISkill.js";

export class TechnicalEngineering extends Skill {
  constructor(die: SkillDie) {
    super("Technical Engineering", die);
  }
}
