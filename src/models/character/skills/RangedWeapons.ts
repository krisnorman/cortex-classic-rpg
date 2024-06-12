import { Skill, SkillDie } from "./ISkill.js";

export class RangedWeapons extends Skill {
  constructor(die: SkillDie) {
    super("Ranged Weapons", die);
  }
}
