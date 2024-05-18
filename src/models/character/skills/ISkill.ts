import { Die } from "../../dice";

export interface ISkill {
    roll(): number;
    updateDie(newDie: Die): void;
    Die: string;
}