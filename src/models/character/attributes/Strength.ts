import { AttributeBase } from "./AttributeBase";
import { Die } from "../../dice";

export class Strength extends AttributeBase {
    constructor(dieType: Die) {
        super(dieType);
    }

    public get Name(): string { return "Strength"; }
    public get Abbreviation(): string { return "Str"; }
}