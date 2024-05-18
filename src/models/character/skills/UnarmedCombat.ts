import { Die } from "../../dice";
import { SkillBase } from "./SkillBase";

export class UnarmedCombat extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "UnarmedCombat";
    }
}
