import { Die } from "../../dice";
import { SkillBase } from "./SkillBase";

export class Artistry extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "Artistry";
    }
    
}