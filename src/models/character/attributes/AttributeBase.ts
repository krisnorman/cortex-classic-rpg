import { Die, Roller } from '../../dice';

export class AttributeBase {
  constructor(private dieType: Die) {
    this.value = dieType.sides;
  }

  value: number;

  public roll(): number {
    return Roller.roll(this.dieType.sides);
  }
}
