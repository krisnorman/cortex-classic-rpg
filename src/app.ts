import { DiceTs } from "@krisnorman/rpg-utils";
import { FantasyTreasureGenerator } from "./generators/fantasy/treasure/FantasyTreasureGenerator.js";
import { MonetaryTreasureRepository } from "./generators/fantasy/treasure/index.js";

const dice = new DiceTs();
const generator = new MonetaryTreasureRepository(dice);
const result = generator.getRandom();
console.log(result);
 