import { Dice, Die } from "@krisnorman/rpg-utils";
import { Agility } from "../src/models/character/attributes/Agility";
import { Alertness } from "../src/models/character/attributes/Alertness";
import { OutOfHarmsWay } from "../src/models/character/attributes/derived/OutOfHarmsWay";

const die: Die = Dice.d4;
const agi: Agility = new Agility(die);
const ale: Alertness = new Alertness(die);
const sut: OutOfHarmsWay = new OutOfHarmsWay(agi, ale);

test("Name is Out Of Harm's Way", () => {
  expect(sut.Name).toBe("Out Of Harm's Way");
});

test("Value should be Agility + Alertness", () => {
  expect(sut.value).toBe(agi.value + ale.value);
});

test("Random roll should be between 2 and 8", () => {
  let roll = sut.roll();
  expect(roll).toBeGreaterThanOrEqual(2);
  expect(roll).toBeLessThanOrEqual(8);
});
