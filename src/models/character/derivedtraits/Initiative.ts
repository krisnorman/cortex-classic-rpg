import { Agility } from "../attributes/Agility.js";
import { Alertness } from "../attributes/Alertness.js";
import { DerivedTraitBase } from "./DerivedTraitBase.js";

export class Initiative extends DerivedTraitBase {
    constructor(agility: Agility, alertness: Alertness) {
        super(agility, alertness);
    }

    public get Name(): string { return "Initiative"; }
}