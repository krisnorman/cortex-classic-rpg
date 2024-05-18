import { Roller } from "./Roller";

export class Die {
  constructor(public name: string, public sides: number) {}

  roll(times: number = 1) {
    return Roller.roll(this.sides, times);
  }
}

