import { AttributeBase, AttributeDie } from "./AttributeBase.js";

export class Alertness extends AttributeBase {
    constructor(dieType: AttributeDie) {
        super(dieType);
    }

    public get Name(): string { return "Alertness"; }
    public get Abbreviation(): string { return "Ale"; }
}