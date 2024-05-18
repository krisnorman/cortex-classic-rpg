import { Dice, Die } from "../../../dice";
import { Agility } from "../Agility";
import { Alertness } from "../Alertness";
import { Initiative } from "./Initiative";

const die: Die = Dice.d4;
const agi: Agility = new Agility(die);
const ale: Alertness = new Alertness(die);
const sut: Initiative = new Initiative(agi, ale);

test("Name is Initiative", () => {
  expect(sut.Name).toBe("Initiative");
});

test("Value should be Agility + Alertness", () => {
  expect(sut.value).toBe(agi.value + ale.value);
});

test("Random roll should be between 2 and 8", () => {
  let roll = sut.roll();
  expect(roll).toBeGreaterThanOrEqual(2);
  expect(roll).toBeLessThanOrEqual(8);
});
