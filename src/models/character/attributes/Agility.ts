import { AttributeBase } from "./AttributeBase";
import { Die } from "../../dice";

export class Agility extends AttributeBase {
    constructor(dieType: Die) {
        super(dieType);
    }

    public get Name(): string { return "Agility"; }
    public get Abbreviation(): string { return "Agi"; }
}