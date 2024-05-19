import { Die } from "@krisnorman/rpg-utils";
import { SkillBase } from "./SkillBase";

export class TechnicalEngineering extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "TechnicalEngineering";
    }
}
