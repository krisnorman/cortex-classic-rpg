import { Agility, Alertness } from "../";
import { DerivedAttributeBase } from "./DerivedAttributeBase";

export class OutOfHarmsWay extends DerivedAttributeBase {
    constructor(agility: Agility, alertness: Alertness) {
        super(agility, alertness);
    }

    public get Name(): string { return "Out Of Harm's Way"; }
}