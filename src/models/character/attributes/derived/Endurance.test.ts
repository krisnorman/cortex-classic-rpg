import { Dice, Die } from "../../../dice";
import { Vitality } from "../Vitality";
import { Willpower } from "../Willpower";
import { Endurance } from "./Endurance";

const die: Die = Dice.d4;
const vit: Vitality = new Vitality(die);
const wil: Willpower = new Willpower(die);
const sut: Endurance = new Endurance(vit, wil);

test("Name is Endurance", () => {
  expect(sut.Name).toBe("Endurance");
});

test("Value should be Vitality + Willpower", () => {
  expect(sut.value).toBe(vit.value + wil.value);
});

test("Random roll should be between 2 and 8", () => {
  let roll = sut.roll();
  expect(roll).toBeGreaterThanOrEqual(2);
  expect(roll).toBeLessThanOrEqual(8);
});
