import { Vitality } from "../";
import { DerivedAttributeBase } from "./DerivedAttributeBase";

export class Resistance extends DerivedAttributeBase {
    constructor(vitality: Vitality) {
        super(vitality, vitality);
    }

    public get Name(): string { return "Resistance"; }
}