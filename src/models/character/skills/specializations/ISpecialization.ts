import { Die } from "../../../dice";

export interface ISpecialization {    
    roll(): number;
    updateDie(newDie: Die): void;
    Sides: number;
}
