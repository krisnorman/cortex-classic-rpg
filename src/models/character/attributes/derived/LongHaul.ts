import { Strength, Vitality } from "../";
import { DerivedAttributeBase } from "./DerivedAttributeBase";

export class LongHaul extends DerivedAttributeBase {
    constructor(strength: Strength, vitality: Vitality) {
        super(strength, vitality);
    }

    public get Name(): string { return "Long Haul"; }
}