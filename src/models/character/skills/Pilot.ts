import { Die } from "../../dice";
import { SkillBase } from "./SkillBase";

export class Pilot extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "Pilot";
    }
}
