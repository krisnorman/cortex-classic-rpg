import { Die } from "../../dice";
import { SkillBase } from "./SkillBase";


export class Performance extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "Performance";
    }
}