import { MechanicalEngineering } from "./MechanicalEngineering";
import { Linguist } from "./Linguist";
import { Knowledge } from "./Knowledge";
import { Influence } from "./Influence";
import { HeavyWeapons } from "./HeavyWeapons";
import { Guns } from "./Guns";
import { Discipline } from "./Discipline";
import { Covert } from "./Covert";
import { Athletics } from "./Athletics";
import { Artistry } from "./Artistry";
import { AnimalHandling } from "./AnimalHandling";
import { Die, Dice } from "@krisnorman/rpg-utils";
import { MedicalExpertise } from "./MedicalExpertise";
import { MeleeWeaponCombat } from "./MeleeWeaponCombat";
import { Perception } from "./Perception";
import { Performance } from "./Performance";
import { Pilot } from "./Pilot";
import { PlanetaryVehicles } from "./PlanetaryVehicles";
import { RangedWeapons } from "./RangedWeapons";
import { ScientificExpertise } from "./ScientificExpertise";
import { Survival } from "./Survival";
import { TechnicalEngineering } from "./TechnicalEngineering";
import { UnarmedCombat } from "./UnarmedCombat";
import { Craft } from "./Craft";
import { SkillBase } from "./SkillBase";

export interface ISkills {
  AnimalHandling: AnimalHandling;
  Artistry: SkillBase;
  Athletics: SkillBase;
  Covert: SkillBase;
  Craft: SkillBase;
  Discipline: SkillBase;
  Guns: SkillBase;
  HeavyWeapons: SkillBase;
  Influence: SkillBase;
  Knowledge: SkillBase;
  Linguist: SkillBase;
  MechanicalEngineering: SkillBase;
  MedicalExpertise: SkillBase;
  MeleeWeaponCombat: SkillBase;
  Perception: SkillBase;
  Performance: SkillBase;
  Pilot: SkillBase;
  PlanetaryVehicles: SkillBase;
  RangedWeapons: SkillBase;
  ScientificExpertise: SkillBase;
  Survival: SkillBase;
  TechnicalEngineering: SkillBase;
  UnarmedCombat: SkillBase;
}

export class Skills implements ISkills {
  AnimalHandling: AnimalHandling;
  Artistry: SkillBase;
  Athletics: SkillBase;
  Covert: SkillBase;
  Craft: SkillBase;
  Discipline: SkillBase;
  Guns: SkillBase;
  HeavyWeapons: SkillBase;
  Influence: SkillBase;
  Knowledge: SkillBase;
  Linguist: SkillBase;
  MechanicalEngineering: SkillBase;
  MedicalExpertise: SkillBase;
  MeleeWeaponCombat: SkillBase;
  Perception: SkillBase;
  Performance: SkillBase;
  Pilot: SkillBase;
  PlanetaryVehicles: SkillBase;
  RangedWeapons: SkillBase;
  ScientificExpertise: SkillBase;
  Survival: SkillBase;
  TechnicalEngineering: SkillBase;
  UnarmedCombat: SkillBase;

  constructor(
    animalHandling: Die = Dice.d0,
    artistry: Die = Dice.d0,
    athletics: Die = Dice.d0,
    covert: Die = Dice.d0,
    craft: Die = Dice.d0,
    discipline: Die = Dice.d0,
    guns: Die = Dice.d0,
    heavyWeapons: Die = Dice.d0,
    influence: Die = Dice.d0,
    knowledge: Die = Dice.d0,
    linguist: Die = Dice.d0,
    mechanicalEngineering: Die = Dice.d0,
    medicalExpertise: Die = Dice.d0,
    meleeWeaponCombat: Die = Dice.d0,
    perception: Die = Dice.d0,
    performance: Die = Dice.d0,
    pilot: Die = Dice.d0,
    planetaryVehicles: Die = Dice.d0,
    rangedWeapons: Die = Dice.d0,
    scientificExpertise: Die = Dice.d0,
    survival: Die = Dice.d0,
    technicalEngineering: Die = Dice.d0,
    unarmedCombat: Die = Dice.d0
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
    this.MechanicalEngineering = new MechanicalEngineering(mechanicalEngineering);
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