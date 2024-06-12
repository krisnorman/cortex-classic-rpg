import { Vitality } from "../attributes/Vitality.js";
import { Willpower } from "../attributes/Willpower.js";
import { DerivedTraitBase } from "./DerivedTraitBase.js";

export class Endurance extends DerivedTraitBase {
    constructor(vitality: Vitality, willpower: Willpower) {
        super(vitality, willpower);
    }

    public get Name(): string { return "Endurance"; }
}