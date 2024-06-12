import { Skill, SkillDie } from "./ISkill.js";

export class MedicalExpertise extends Skill {
  constructor(die: SkillDie) {
    super("Medical Expertise", die);
  }
}
