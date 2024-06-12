import { DiceTs } from "@krisnorman/rpg-utils";

declare global {
  interface Array<T> {
    getRandom(): T;
  }
}

if (!Array.prototype.getRandom) {
  Array.prototype.getRandom = function () {
    if (this == undefined || this.length == 0) return "";    
    const dice = new DiceTs();
    const expression = `1d${this.length}`;
    const roll = dice.roll(expression);
    const result = this[roll.total];
    return result;
  };
}
