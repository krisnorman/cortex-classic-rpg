import { Agility } from "../attributes/Agility.js";
import { Alertness } from "../attributes/Alertness.js";
import { DerivedTraitBase } from "./DerivedTraitBase.js";

export class OutOfHarmsWay extends DerivedTraitBase {
    constructor(agility: Agility, alertness: Alertness) {
        super(agility, alertness);
    }

    public get Name(): string { return "Out Of Harm's Way"; }
}