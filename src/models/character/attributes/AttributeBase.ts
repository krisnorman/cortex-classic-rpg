import { IDie, IRollable } from "@krisnorman/rpg-utils";
import { IRoller } from "../../../dice/index.js";

export type AttributeDieTypes = 2 | 4 | 6 | 8 | 10 | 12;

export class AttributeDie implements IDie, IRollable {
  constructor(public sides: AttributeDieTypes, private roller: IRoller) {}

  roll(times: number = 1): number {
    return this.roller.roll(this.sides);
  }
}

export class AttributeDice {
  constructor(private roller: IRoller) {}
  get d2(): AttributeDie {
    return new AttributeDie(2, this.roller);
  }
  get d4(): AttributeDie {
    return new AttributeDie(4, this.roller);
  }
  get d6(): AttributeDie {
    return new AttributeDie(6, this.roller);
  }
  get d8(): AttributeDie {
    return new AttributeDie(8, this.roller);
  }
  get d10(): AttributeDie {
    return new AttributeDie(10, this.roller);
  }
  get d12(): AttributeDie {
    return new AttributeDie(12, this.roller);
  }
}

export class AttributeBase implements IRollable {
  constructor(private die: AttributeDie) {
    this.value = die.sides;
  }

  value: number;

  roll(times: number = 1): number {
    return this.die.roll();
  }
}
