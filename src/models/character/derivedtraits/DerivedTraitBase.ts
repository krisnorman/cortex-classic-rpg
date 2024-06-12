import { AttributeBase } from "../attributes/index.js";
import { IRollable } from "@krisnorman/rpg-utils";

export class DerivedTraitBase implements IRollable {
  constructor(
    private attribute1: AttributeBase,
    private attribute2: AttributeBase
  ) {
    this.value = attribute1.value + attribute2.value;
  }

  value: number;

  roll(): number {
    let attr1Result = this.attribute1.roll();
    let attr2Result = this.attribute2.roll();
    let sum = attr1Result + attr2Result;
    return sum;
  }
}
