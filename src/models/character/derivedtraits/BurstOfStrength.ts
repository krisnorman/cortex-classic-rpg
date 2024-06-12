import { Strength } from "../attributes/index.js";
import { DerivedTraitBase } from "./DerivedTraitBase.js";

export class BurstOfStrength extends DerivedTraitBase {
    constructor(strength: Strength) {
        super(strength, strength);
    }

    public get Name(): string { return "BurstOfStrength"; }
}