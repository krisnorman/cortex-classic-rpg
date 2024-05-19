import { AttributeBase } from "./AttributeBase";
import { Die } from "../../dice";

export class Intelligence extends AttributeBase {
    constructor(dieType: Die) {
        super(dieType);
    }

    public get Name(): string { return "Intelligence"; }
    public get Abbreviation(): string { return "Int"; }
}