import { AppConfig } from "./AppConfig";
import { Attributes } from "./models/character/attributes";
import { Character } from "./models/character/Character";
import { Hair } from "./models/character/Hair";
import { Height } from "./models/character/Height";
import { AnimalHandling, Skills } from "./models/character/skills";
import { Training } from "./models/character/skills/specializations/AnimalHandlingSpecialized";
import { Specializations } from "./models/character/skills/specializations/Specializations";
import { Dice } from "./models/dice";

let config = AppConfig.getInstance();
config.Botch = 2;
let attributes = Attributes.Create(4,6,2,10,8,12);
let skills = new Skills();

skills.AnimalHandling.updateDie(Dice.d4);
//skills.AnimalHandling.specializations[0]

let specializations = new Specializations(
    new Training(Dice.d4, skills.AnimalHandling));

let character = new Character(
    new Hair("Blonde", "Short", "Straight"),
    new Height(6,2),
    attributes,
    skills,
    specializations 
);

let training = character.Skills.AnimalHandling.Specializations.Training;

console.log(training.Sides);