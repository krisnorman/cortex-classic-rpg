import { AttributeBase, AttributeDie } from "./AttributeBase.js";

export class Strength extends AttributeBase {
  constructor(dieType: AttributeDie) {
    super(dieType);
  }

  public get Name(): string {
    return "Strength";
  }
  public get Abbreviation(): string {
    return "Str";
  }
}
