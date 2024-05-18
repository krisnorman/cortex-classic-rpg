import { Die } from "../../dice";
import { SkillBase } from "./SkillBase";

export class Knowledge extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "Knowledge";
    }
}
