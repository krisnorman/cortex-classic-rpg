import { Die } from "@krisnorman/rpg-utils";
import { SkillBase } from "./SkillBase";

export class Linguist extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "Linguist";
    }
}