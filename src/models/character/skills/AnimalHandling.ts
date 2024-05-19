import { Die } from "@krisnorman/rpg-utils";
import { SkillBase } from "./SkillBase";
import { Riding, Training, VetZoology } from "./specializations/AnimalHandlingSpecialized";

export class AnimalHandling extends SkillBase {
    
    constructor(private dieType: Die){
        super(dieType);
        this.name = "AnimalHandling";        
    }
    
    Specializations: AnimalHandlingSpecializations = new AnimalHandlingSpecializations(this, 2, 2, 2);
}

class AnimalHandlingSpecializations {
    constructor(animalHandling: AnimalHandling, trainingValue: number, ridingValue: number, vetZoologyValue: number){
        this.Training = new Training(new Die(`d${trainingValue}`, trainingValue), animalHandling);
        this.Riding = new Riding(new Die(`d${ridingValue}`, ridingValue), animalHandling);
        this.VetZoology = new VetZoology(new Die(`d${vetZoologyValue}`, vetZoologyValue), animalHandling);
    }
    Training: Training;
    Riding: Riding;
    VetZoology: VetZoology
}