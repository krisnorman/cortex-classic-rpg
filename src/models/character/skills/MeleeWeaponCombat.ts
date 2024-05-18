import { Die } from "../../dice";
import { SkillBase } from "./SkillBase";


export class MeleeWeaponCombat extends SkillBase {
    constructor(private dieType: Die){
        super(dieType);
        this.name = "MeleeWeaponCombat";
    }
}
