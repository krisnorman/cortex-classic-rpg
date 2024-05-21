import { Die } from "@krisnorman/rpg-utils";

export class AttributeBase {
  constructor(private dieType: Die) {
    this.value = dieType.sides;
  }

  value: number;

  public roll(): number {
    return this.dieType.roll().GrandTotal;
  }
}