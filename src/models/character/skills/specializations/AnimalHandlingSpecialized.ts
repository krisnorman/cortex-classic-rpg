import { Roller, Die } from "../../../dice";
import { ISkill } from "../ISkill";
import { SkillBase } from "../SkillBase";
import { ISpecialization } from "./ISpecialization";
import { SpecializationBase } from "./SpecializationBase";

export class Training extends SpecializationBase {
    constructor(private dieType: Die, parentSkill: SkillBase){
        super(dieType, parentSkill);
    } 
}
 
export class Riding extends SpecializationBase {
    constructor(private dieType: Die, parentSkill: SkillBase){
        super(dieType, parentSkill);
    } 
}

export class VetZoology extends SpecializationBase {
    constructor(private dieType: Die, parentSkill: SkillBase){
        super(dieType, parentSkill);
    } 
}
// export class Riding implements ISpecialization {
//     constructor(private _dieType: Die, public ParentSkill: ISkill){}    
//     roll(): number {
//         return this._dieType.roll();
//     }
//     updateDie(newDie: Die): void {
//         this._dieType = newDie;
//     }
        
//     get Die(): string { return this._dieType.name; };  
// }

// export class VetZoology implements ISpecialization {
//     constructor(private _dieType: Die, public ParentSkill: ISkill){}    
//     roll(): number {
//         return this._dieType.roll();
//     }
//     updateDie(newDie: Die): void {
//         this._dieType = newDie;
//     }
        
//     get Die(): string { return this._dieType.name; };  
// }