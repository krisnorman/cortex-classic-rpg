import { Die } from "../../dice";
import { SkillBase } from "./SkillBase";

export class Influence extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "Influence";
    }
}
