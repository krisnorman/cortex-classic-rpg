export class Roller {
  static roll(sides: number, times: number = 1): number {
    if (sides < 1) return 0;
    
    if (times <= 1) {
      return Roller._roll(sides);
    }

    let result = 0;

    for (let index = 0; index < times; index++) {
      let currentResult = Roller._roll(sides);

      result = result + currentResult;
    }

    return result;
  }

  private static _roll(sides: number) {
    return Math.floor(Math.random() * (sides - 1 + 1) + 1);
  }
}
