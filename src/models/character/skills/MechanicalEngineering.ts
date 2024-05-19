import { Die } from "../../dice";
import { SkillBase } from "./SkillBase";

export class MechanicalEngineering extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "MechanicalEngineering";
    }
}