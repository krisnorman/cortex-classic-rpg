import { Dice, Die } from "../src/models/dice";
import { Intelligence } from "../src/models/character/attributes/Intelligence";
import { Willpower } from "../src/models/character/attributes/Willpower";
import { Recall } from "../src/models/character/attributes/derived/Recall";

const die: Die = Dice.d4;
const int: Intelligence = new Intelligence(die);
const wil: Willpower = new Willpower(die);
const sut: Recall = new Recall(int, wil);

test("Name is Recall", () => {
  expect(sut.Name).toBe("Recall");
});

test("Value should be Intelligence + Willpower", () => {
  expect(sut.value).toBe(int.value + wil.value);
});

test("Random roll should be between 2 and 8", () => {
  let roll = sut.roll();
  expect(roll).toBeGreaterThanOrEqual(2);
  expect(roll).toBeLessThanOrEqual(8);
});
