import { Skill, SkillDie } from "./ISkill.js";

export class MeleeWeaponCombat extends Skill {
  constructor(die: SkillDie) {
    super("Melee Weapon Combat", die);
  }
}
