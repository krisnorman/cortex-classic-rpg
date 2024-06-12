import { AttributeBase, AttributeDie } from "./AttributeBase.js";

export class Agility extends AttributeBase {
  constructor(dieType: AttributeDie) {
    super(dieType);
  }

  public get Name(): string {
    return "Agility";
  }
  public get Abbreviation(): string {
    return "Agi";
  }
}
