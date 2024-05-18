import { Intelligence, Willpower } from "../";
import { DerivedAttributeBase } from "./DerivedAttributeBase";

export class Recall extends DerivedAttributeBase {
    constructor(intelligence: Intelligence, willpower: Willpower) {
        super(intelligence, willpower);
    }

    public get Name(): string { return "Recall"; }
}