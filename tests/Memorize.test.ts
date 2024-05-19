import { Dice, Die } from "@krisnorman/rpg-utils";
import { Alertness } from "../src/models/character/attributes/Alertness";
import { Intelligence } from "../src/models/character/attributes/Intelligence";
import { Memorize } from "../src/models/character/attributes/derived/Memorize";

const die: Die = Dice.d4;
const int: Intelligence = new Intelligence(die);
const ale: Alertness = new Alertness(die);
const sut: Memorize = new Memorize(int, ale);

test("Name is Memorize", () => {
  expect(sut.Name).toBe("Memorize");
});

test("Value should be Intelligence + Alertness", () => {
  expect(sut.value).toBe(int.value + ale.value);
});

test("Random roll should be between 2 and 8", () => {
  let roll = sut.roll();
  expect(roll).toBeGreaterThanOrEqual(2);
  expect(roll).toBeLessThanOrEqual(8);
});
