import { Die } from "@krisnorman/rpg-utils";

export interface ISpecialization {    
    roll(): number;
    updateDie(newDie: Die): void;
    Sides: number;
}
