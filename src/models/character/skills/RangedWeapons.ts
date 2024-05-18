import { Die } from "../../dice";
import { SkillBase } from "./SkillBase";

export class RangedWeapons extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "RangedWeapons";
    }
}
