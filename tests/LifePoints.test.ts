import { Dice, Die } from "../src/models/dice";
import { Vitality } from "../src/models/character/attributes/Vitality";
import { Willpower } from "../src/models/character/attributes/Willpower";
import { LifePoints } from "../src/models/character/attributes/derived/LifePoints";

const die: Die = Dice.d4;
const wil: Willpower = new Willpower(die);
const vit: Vitality = new Vitality(die);
const sut: LifePoints = new LifePoints(wil, vit);

test("Name is Life Points", () => {
  expect(sut.Name).toBe("Life Points");
});

test("Value should be Willpower + Vitality", () => {
  expect(sut.value).toBe(wil.value + vit.value);
});

// Life points are not random. Roll should return the max values for both attributes.
test("Roll returns a non-random total of the sum of the two attributes", () => {
  let roll = sut.roll();
  expect(roll).toBe(wil.value + vit.value);
});
