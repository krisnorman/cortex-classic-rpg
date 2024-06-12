import { IRollable } from "@krisnorman/rpg-utils";
import { Skill, SkillDie, SkillDieTypes } from "../index.js";

export interface ISpecialization {
  sides: SkillDieTypes;
}

export class Specialization implements ISpecialization, IRollable {
  constructor(
    public name: string,
    private die: SkillDie,
    private skill: Skill
  ) {
    if (skill.sides < 6)
      throw new Error(
        "Specializations require a parent skill score of at least d6."
      );
    this.die.add(this.skill.sides);
    this.sides = this.die.sides;
  }

  sides: SkillDieTypes;

  roll(times?: number): number {
    return this.die.roll();
  }
}
