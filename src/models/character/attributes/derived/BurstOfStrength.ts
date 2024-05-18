import { Strength } from "../";
import { DerivedAttributeBase } from "./DerivedAttributeBase";

export class BurstOfStrength extends DerivedAttributeBase {
    constructor(strength: Strength) {
        super(strength, strength);
    }

    public get Name(): string { return "BurstOfStrength"; }
}