import { Vitality, Willpower } from "../";
import { DerivedAttributeBase } from "./DerivedAttributeBase";

export class Endurance extends DerivedAttributeBase {
    constructor(vitality: Vitality, willpower: Willpower) {
        super(vitality, willpower);
    }

    public get Name(): string { return "Endurance"; }
}