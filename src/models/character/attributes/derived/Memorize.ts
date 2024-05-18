import { Alertness, Intelligence } from "../";
import { DerivedAttributeBase } from "./DerivedAttributeBase";

export class Memorize extends DerivedAttributeBase {
  constructor(intelligence: Intelligence, alertness: Alertness) {
    super(intelligence, alertness);
  }

  public get Name(): string { return "Memorize"; }
}
