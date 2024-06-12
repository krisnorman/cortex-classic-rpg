import { Intelligence } from "../attributes/Intelligence.js";
import { Willpower } from "../attributes/Willpower.js";
import { DerivedTraitBase } from "./DerivedTraitBase.js";

export class Recall extends DerivedTraitBase {
    constructor(intelligence: Intelligence, willpower: Willpower) {
        super(intelligence, willpower);
    }

    public get Name(): string { return "Recall"; }
}