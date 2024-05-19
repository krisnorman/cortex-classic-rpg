import { Die } from "@krisnorman/rpg-utils";
import { SkillBase } from "./SkillBase";


export class Craft extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "Craft";
    }
}
