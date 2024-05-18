import { Dice, Die } from "../../../dice";
import { Strength } from "../Strength";
import { Vitality } from "../Vitality";
import { LongHaul } from "./LongHaul";

const die: Die = Dice.d4;
const str: Strength = new Strength(die);
const vit: Vitality = new Vitality(die);
const sut: LongHaul = new LongHaul(str, vit);

test("Name is Long Haul", () => {
  expect(sut.Name).toBe("Long Haul");
});

test("Value should be Strength + Vitality", () => {
  expect(sut.value).toBe(str.value + vit.value);
});

test("Random roll should be between 2 and 8", () => {
  let roll = sut.roll();
  expect(roll).toBeGreaterThanOrEqual(2);
  expect(roll).toBeLessThanOrEqual(8);
});
