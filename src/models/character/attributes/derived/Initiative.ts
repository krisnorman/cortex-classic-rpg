import { Agility, Alertness } from "../";
import { DerivedAttributeBase } from "./DerivedAttributeBase";

export class Initiative extends DerivedAttributeBase {
    constructor(agility: Agility, alertness: Alertness) {
        super(agility, alertness);
    }

    public get Name(): string { return "Initiative"; }
}