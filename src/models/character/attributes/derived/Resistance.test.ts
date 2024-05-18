import { Dice, Die } from "../../../dice";
import { Vitality } from "../Vitality";
import { Resistance } from "./Resistance";

const die: Die = Dice.d4;
const vit: Vitality = new Vitality(die);
const sut: Resistance = new Resistance(vit);

test("Name is Resistance", () => {
  expect(sut.Name).toBe("Resistance");
});

test("Value should be Vitality + Vitality", () => {
  expect(sut.value).toBe(vit.value * 2);
});

test("Random roll should be between 2 and 8", () => {
  let roll = sut.roll();
  expect(roll).toBeGreaterThanOrEqual(2);
  expect(roll).toBeLessThanOrEqual(8);
});
