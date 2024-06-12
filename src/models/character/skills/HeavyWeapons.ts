import { Skill, SkillDie } from "./ISkill.js";

export class HeavyWeapons extends Skill {
  constructor(die: SkillDie) {
    super("Heavy Weapons", die);
  }
}
