import { IDice } from "@krisnorman/rpg-utils";
import { DiceResult } from "dice-typescript";
import { CharacterStream } from "dice-typescript/dist/lexer";
import { AttributeDice, Strength } from "../src/models/character/attributes";
import { Roller } from "../src/dice";

class DiceMock implements IDice {
  constructor(private total: number) {}

  roll(input: string | CharacterStream): DiceResult {
    const result: DiceResult = <DiceResult>{ total: this.total };
    return result;
  }
}

test("Strength", () => {
  const dice = new DiceMock(5);
  const roller = new Roller(dice);
  const attributeDice = new AttributeDice(roller);
  let sut = new Strength(attributeDice.d10);

  //expect(() => sut()).toThrow();
  expect(sut.roll()).toBe(5);
  expect(sut.Name).toBe("Strength");
  expect(sut.Abbreviation).toBe("Str");
});
