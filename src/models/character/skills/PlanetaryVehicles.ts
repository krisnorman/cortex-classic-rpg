import { Die } from "@krisnorman/rpg-utils";
import { SkillBase } from "./SkillBase";

export class PlanetaryVehicles extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "PlanetaryVehicles";
    }
}
