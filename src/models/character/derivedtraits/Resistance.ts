import { Vitality } from "../attributes/Vitality.js";
import { DerivedTraitBase } from "./DerivedTraitBase.js";

export class Resistance extends DerivedTraitBase {
    constructor(vitality: Vitality) {
        super(vitality, vitality);
    }

    public get Name(): string { return "Resistance"; }
}