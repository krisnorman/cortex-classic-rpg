import { DiceTs } from "@krisnorman/rpg-utils";
import { AttributeDice, AttributeDie } from "./models/character/attributes/AttributeBase.js";
import { Strength } from "./models/character/attributes/Strength.js";
import { Roller } from "./dice/Roller.js";

const dice = new DiceTs();
const roller = new Roller(dice);
const attributeDice = new AttributeDice(roller);
const str = new Strength(attributeDice.d10);

console.log(str.roll());
 