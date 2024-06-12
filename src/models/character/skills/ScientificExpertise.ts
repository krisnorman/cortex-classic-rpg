import { Skill, SkillDie } from "./ISkill.js";

export class ScientificExpertise extends Skill {
  constructor(die: SkillDie) {
    super("Scientific Expertise", die);
  }
}
