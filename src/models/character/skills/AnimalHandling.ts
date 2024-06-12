import { Skill, SkillDie } from "./ISkill.js";

export class AnimalHandling extends Skill {
  constructor(die: SkillDie) {
    super("Animal Handling", die);
  }
}
