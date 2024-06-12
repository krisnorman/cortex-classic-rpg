import { Willpower } from "../attributes/index.js";
import { Vitality } from "../attributes/Vitality.js";
import { DerivedTraitBase } from "./DerivedTraitBase.js";

export class LifePoints extends DerivedTraitBase {
    constructor(willpower: Willpower, vitality: Vitality) {
        super(willpower, vitality);
    }

    public get Name(): string { return "LifePoints"; }
}