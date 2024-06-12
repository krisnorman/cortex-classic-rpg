import { Skill, SkillDie } from "../ISkill.js";
import { Specialization } from "./index.js";

export class Training extends Specialization {
  constructor(skillDie: SkillDie, parentSkill: Skill) {
    super("Training", skillDie, parentSkill);
  }
}

export class Riding extends Specialization {
  constructor(skillDie: SkillDie, parentSkill: Skill) {
    super("Riding", skillDie, parentSkill);
  }
}

export class VetZoology extends Specialization {
  constructor(skillDie: SkillDie, parentSkill: Skill) {
    super("Vet Zoology", skillDie, parentSkill);
  }
}
