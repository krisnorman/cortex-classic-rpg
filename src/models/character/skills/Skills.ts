import { MechanicalEngineering } from "./MechanicalEngineering.js";
import { Linguist } from "./Linguist.js";
import { Knowledge } from "./Knowledge.js";
import { Influence } from "./Influence.js";
import { HeavyWeapons } from "./HeavyWeapons.js";
import { Guns } from "./Guns.js";
import { Discipline } from "./Discipline.js";
import { Covert } from "./Covert.js";
import { Athletics } from "./Athletics.js";
import { Artistry } from "./Artistry.js";
import { AnimalHandling } from "./AnimalHandling.js";
import { MedicalExpertise } from "./MedicalExpertise.js";
import { MeleeWeaponCombat } from "./MeleeWeaponCombat.js";
import { Perception } from "./Perception.js";
import { Performance } from "./Performance.js";
import { Pilot } from "./Pilot.js";
import { PlanetaryVehicles } from "./PlanetaryVehicles.js";
import { RangedWeapons } from "./RangedWeapons.js";
import { ScientificExpertise } from "./ScientificExpertise.js";
import { Survival } from "./Survival.js";
import { TechnicalEngineering } from "./TechnicalEngineering.js";
import { UnarmedCombat } from "./UnarmedCombat.js";
import { Craft } from "./Craft.js";
import { Skill, SkillDie } from "./ISkill.js";

export interface ISkills {
  AnimalHandling: AnimalHandling;
  Artistry: Skill;
  Athletics: Skill;
  Covert: Skill;
  Craft: Skill;
  Discipline: Skill;
  Guns: Skill;
  HeavyWeapons: Skill;
  Influence: Skill;
  Knowledge: Skill;
  Linguist: Skill;
  MechanicalEngineering: Skill;
  MedicalExpertise: Skill;
  MeleeWeaponCombat: Skill;
  Perception: Skill;
  Performance: Skill;
  Pilot: Skill;
  PlanetaryVehicles: Skill;
  RangedWeapons: Skill;
  ScientificExpertise: Skill;
  Survival: Skill;
  TechnicalEngineering: Skill;
  UnarmedCombat: Skill;
}

export class Skills implements ISkills {
  AnimalHandling: AnimalHandling;
  Artistry: Skill;
  Athletics: Skill;
  Covert: Skill;
  Craft: Skill;
  Discipline: Skill;
  Guns: Skill;
  HeavyWeapons: Skill;
  Influence: Skill;
  Knowledge: Skill;
  Linguist: Skill;
  MechanicalEngineering: Skill;
  MedicalExpertise: Skill;
  MeleeWeaponCombat: Skill;
  Perception: Skill;
  Performance: Skill;
  Pilot: Skill;
  PlanetaryVehicles: Skill;
  RangedWeapons: Skill;
  ScientificExpertise: Skill;
  Survival: Skill;
  TechnicalEngineering: Skill;
  UnarmedCombat: Skill;

  constructor(
    animalHandling: SkillDie,
    artistry: SkillDie,
    athletics: SkillDie,
    covert: SkillDie,
    craft: SkillDie,
    discipline: SkillDie,
    guns: SkillDie,
    heavyWeapons: SkillDie,
    influence: SkillDie,
    knowledge: SkillDie,
    linguist: SkillDie,
    mechanicalEngineering: SkillDie,
    medicalExpertise: SkillDie,
    meleeWeaponCombat: SkillDie,
    perception: SkillDie,
    performance: SkillDie,
    pilot: SkillDie,
    planetaryVehicles: SkillDie,
    rangedWeapons: SkillDie,
    scientificExpertise: SkillDie,
    survival: SkillDie,
    technicalEngineering: SkillDie,
    unarmedCombat: SkillDie
  ) {
    this.AnimalHandling = new AnimalHandling(animalHandling);
    this.Artistry = new Artistry(artistry);
    this.Athletics = new Athletics(athletics);
    this.Covert = new Covert(covert);
    this.Craft = new Craft(craft);
    this.Discipline = new Discipline(discipline);
    this.Guns = new Guns(guns);
    this.HeavyWeapons = new HeavyWeapons(heavyWeapons);
    this.Influence = new Influence(influence);
    this.Knowledge = new Knowledge(knowledge);
    this.Linguist = new Linguist(linguist);
    this.MechanicalEngineering = new MechanicalEngineering(
      mechanicalEngineering
    );
    this.MedicalExpertise = new MedicalExpertise(medicalExpertise);
    this.MeleeWeaponCombat = new MeleeWeaponCombat(meleeWeaponCombat);
    this.Perception = new Perception(perception);
    this.Performance = new Performance(performance);
    this.Pilot = new Pilot(pilot);
    this.PlanetaryVehicles = new PlanetaryVehicles(planetaryVehicles);
    this.RangedWeapons = new RangedWeapons(rangedWeapons);
    this.ScientificExpertise = new ScientificExpertise(scientificExpertise);
    this.Survival = new Survival(survival);
    this.TechnicalEngineering = new TechnicalEngineering(technicalEngineering);
    this.UnarmedCombat = new UnarmedCombat(unarmedCombat);
  }
}
