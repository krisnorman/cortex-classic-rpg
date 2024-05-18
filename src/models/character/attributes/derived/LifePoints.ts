import { Willpower,Vitality } from "../";
import { DerivedAttributeBase } from "./DerivedAttributeBase";

export class LifePoints extends DerivedAttributeBase {
    constructor(willpower: Willpower,vitality: Vitality) {
        super(willpower, vitality);
    }

    public get Name(): string { return "Life Points"; }

    // Override roll to return the max values of willpower and vitality.
    // Life Points should not be random.
    override roll(): number {
        return this.value;
    }
}