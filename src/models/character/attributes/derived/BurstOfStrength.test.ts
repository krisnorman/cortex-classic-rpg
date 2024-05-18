import { Dice, Die } from "../../../dice";
import { Strength } from "../Strength";
import { BurstOfStrength } from "./BurstOfStrength";

const die: Die = Dice.d4;
const str: Strength = new Strength(die);
const sut: BurstOfStrength = new BurstOfStrength(str);

test("Name is BurstOfStrength", () => {
  expect(sut.Name).toBe("BurstOfStrength");
});

test("Value should be Strenth + Strength", () => {
  expect(sut.value).toBe(str.value * 2);
});

test("Random roll should be between 2 and 8", () => {
  let roll = sut.roll();
  expect(roll).toBeGreaterThanOrEqual(2);
  expect(roll).toBeLessThanOrEqual(8);
});
