import { Die } from "../../dice";
import { SkillBase } from "./SkillBase";

export class Athletics extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "Athletics";
    }
}