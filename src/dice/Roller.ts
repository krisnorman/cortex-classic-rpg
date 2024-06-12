import { IDice } from "@krisnorman/rpg-utils";
import { IRoller } from "./IRoller.js";

export class Roller implements IRoller {
  constructor(private dice: IDice) {}

  roll(sides: number, times: number = 1): number {
    let total: number = 0;

    for (let index = 0; index < times; index++) {
      total += this._roll(sides);
    }

    return total;
  }

  private _roll(sides: number) {
    const result = this.dice.roll(`1d${sides}`).total;
    return result;
  }
}
