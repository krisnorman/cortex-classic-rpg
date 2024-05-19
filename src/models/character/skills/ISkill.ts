import { Die } from "@krisnorman/rpg-utils";

export interface ISkill {
    roll(): number;
    updateDie(newDie: Die): void;
    Die: string;
}