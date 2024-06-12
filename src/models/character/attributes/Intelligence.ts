import { AttributeBase, AttributeDie } from "./AttributeBase.js";

export class Intelligence extends AttributeBase {
  constructor(dieType: AttributeDie) {
    super(dieType);
  }

  public get Name(): string {
    return "Intelligence";
  }
  public get Abbreviation(): string {
    return "Int";
  }
}
