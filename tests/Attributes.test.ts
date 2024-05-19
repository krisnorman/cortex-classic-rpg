import { Attributes } from "../src/models/character/attributes/Attributes";
const validValue: number = 2;
const underMinValue = 1;
const overMaxValue = 14;
const indivisibleBy2Value = 5;
 
// Strength tests
test("Strength: passing a value under minimum throws an error", () => {
  let sut = () =>
    Attributes.Create(
      underMinValue,
      validValue,
      validValue,
      validValue,
      validValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Strength: passing a value over max throws an error", () => {
  let sut = () =>
    Attributes.Create(
      overMaxValue,
      validValue,
      validValue,
      validValue,
      validValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Strength: passing a value indivisible by 2 throws an error", () => {
  let sut = () =>
    Attributes.Create(
      indivisibleBy2Value,
      validValue,
      validValue,
      validValue,
      validValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Strength: passing a value divisible by 2 and between 2 and 12 does not throw an error", () => {
  let sut = Attributes.Create(
    validValue,
    validValue,
    validValue,
    validValue,
    validValue,
    validValue
  );

  expect(sut.Strength.value).toBe(validValue);
});

// Agility tests
test("Agility: passing a value under minimum throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      underMinValue,
      validValue,
      validValue,
      validValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Agility: passing a value over max throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      overMaxValue,
      validValue,
      validValue,
      validValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Agility: passing a value indivisible by 2 throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      indivisibleBy2Value,
      validValue,
      validValue,
      validValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Agility: passing a value divisible by 2 and between 2 and 12 does not throw an error", () => {
  let sut = Attributes.Create(
    validValue,
    validValue,
    validValue,
    validValue,
    validValue,
    validValue
  );

  expect(sut.Agility.value).toBe(validValue);
});

// Vitality tests
test("Vitality: passing a value under minimum throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      validValue,
      underMinValue,
      validValue,
      validValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Vitality: passing a value over max throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      validValue,
      overMaxValue,
      validValue,
      validValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Vitality: passing a value indivisible by 2 throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      validValue,
      indivisibleBy2Value,
      validValue,
      validValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Vitality: passing a value divisible by 2 and between 2 and 12 does not throw an error", () => {
  let sut = Attributes.Create(
    validValue,
    validValue,
    validValue,
    validValue,
    validValue,
    validValue
  );

  expect(sut.Vitality.value).toBe(validValue);
});

// Alertness tests
test("Alertness: passing a value under minimum throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      validValue,
      validValue,
      underMinValue,
      validValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Alertness: passing a value over max throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      validValue,
      validValue,
      overMaxValue,
      validValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Alertness: passing a value indivisible by 2 throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      validValue,
      validValue,
      indivisibleBy2Value,
      validValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Alertness: passing a value divisible by 2 and between 2 and 12 does not throw an error", () => {
  let sut = Attributes.Create(
    validValue,
    validValue,
    validValue,
    validValue,
    validValue,
    validValue
  );

  expect(sut.Alertness.value).toBe(validValue);
});

// Intelligence tests
test("Intelligence: passing a value under minimum throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      validValue,
      validValue,
      validValue,
      underMinValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Intelligence: passing a value over max throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      validValue,
      validValue,
      validValue,
      overMaxValue,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Intelligence: passing a value indivisible by 2 throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      validValue,
      validValue,
      validValue,
      indivisibleBy2Value,
      validValue
    );
  expect(() => sut()).toThrow();
});

test("Intelligence: passing a value divisible by 2 and between 2 and 12 does not throw an error", () => {
  let sut = Attributes.Create(
    validValue,
    validValue,
    validValue,
    validValue,
    validValue,
    validValue
  );

  expect(sut.Intelligence.value).toBe(validValue);
});

// Willpower tests
test("Willpower: passing a value under minimum throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      validValue,
      validValue,
      validValue,
      validValue,
      underMinValue
    );
  expect(() => sut()).toThrow();
});

test("Willpower: passing a value over max throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      validValue,
      validValue,
      validValue,
      validValue,
      overMaxValue
    );
  expect(() => sut()).toThrow();
});

test("Willpower: passing a value indivisible by 2 throws an error", () => {
  let sut = () =>
    Attributes.Create(
      validValue,
      validValue,
      validValue,
      validValue,
      validValue,
      indivisibleBy2Value
    );
  expect(() => sut()).toThrow();
});

test("Willpower: passing a value divisible by 2 and between 2 and 12 does not throw an error", () => {
  let sut = Attributes.Create(
    validValue,
    validValue,
    validValue,
    validValue,
    validValue,
    validValue
  );

  expect(sut.Willpower.value).toBe(validValue);
});
