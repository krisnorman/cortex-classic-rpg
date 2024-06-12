import { Skill, SkillDie } from "./ISkill.js";

export class PlanetaryVehicles extends Skill {
  constructor(die: SkillDie) {
    super("Planetary Vehicles", die);
  }
}
