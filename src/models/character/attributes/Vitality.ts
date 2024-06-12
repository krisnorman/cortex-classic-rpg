import { AttributeBase, AttributeDie } from "./AttributeBase.js";

export class Vitality extends AttributeBase {
  constructor(dieType: AttributeDie) {
    super(dieType);
  }

  public get Name(): string {
    return "Vitality";
  }
  public get Abbreviation(): string {
    return "Vit";
  }
}
