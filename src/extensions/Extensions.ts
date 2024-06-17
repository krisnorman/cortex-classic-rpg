import { DiceTs } from "@krisnorman/rpg-utils";
export {};

declare global {
  interface Array<T> {
    getRandom(): T;
  }
}

if (!Array.prototype.getRandom) {
  Array.prototype.getRandom = function <T>(this: T[]): T {
    const dice = new DiceTs();
    const expression = `1d${this.length}`;
    const roll = dice.roll(expression);
    const result = this[roll.total - 1];
    return result;
  };
}
