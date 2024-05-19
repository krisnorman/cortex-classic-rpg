import { AttributeBase } from "./AttributeBase";
import { Die } from "@krisnorman/rpg-utils";

export class Willpower extends AttributeBase {
    constructor(dieType: Die) {
        super(dieType);
    }

    public get Name(): string { return "Willpower"; }
    public get Abbreviation(): string { return "Wil"; }
}