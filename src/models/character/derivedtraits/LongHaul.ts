import { Strength } from "../attributes/Strength.js";
import { Vitality } from "../attributes/Vitality.js";
import { DerivedTraitBase } from "./DerivedTraitBase.js";

export class LongHaul extends DerivedTraitBase {
    constructor(strength: Strength, vitality: Vitality) {
        super(strength, vitality);
    }

    public get Name(): string { return "Long Haul"; }
}