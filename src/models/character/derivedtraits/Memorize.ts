import { Alertness } from "../attributes/Alertness.js";
import { Intelligence } from "../attributes/Intelligence.js";
import { DerivedTraitBase } from "./DerivedTraitBase.js";

export class Memorize extends DerivedTraitBase {
  constructor(intelligence: Intelligence, alertness: Alertness) {
    super(intelligence, alertness);
  }

  public get Name(): string { return "Memorize"; }
}
