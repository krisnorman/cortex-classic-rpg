import { Die } from "../../dice";
import { SkillBase } from "./SkillBase";

export class ScientificExpertise extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "ScientificExpertise";
    }
}
