import { AttributeBase, AttributeDie } from "./AttributeBase.js";

export class Willpower extends AttributeBase {
  constructor(dieType: AttributeDie) {
    super(dieType);
  }

  public get Name(): string {
    return "Willpower";
  }
  public get Abbreviation(): string {
    return "Wil";
  }
}
