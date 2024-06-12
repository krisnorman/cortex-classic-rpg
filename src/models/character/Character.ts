import { Height } from "./Height.js";
import { Hair } from "./Hair.js";
import { Attributes } from "./attributes/index.js";
import { Achievement } from "./Achievement.js";
import { IDerivedTraits, DerivedTraits } from "./derivedtraits/DerivedTraits.js";
import { Specializations } from "./skills/specializations/Specializations.js";
import { ISkills } from "./skills/index.js";

export interface ICharacter {
  Id: number;
  Name: string;
  NickName: string;
  HomeWorld: string;
  Concept: string;
  Hair: Hair;
  Eyes: string;
  Skin: string;
  Age: number;
  Height: Height;
  Weight: number;
  Other: string;
  Birthmarks: string[];
  Tattoos: string[];
  TotalWoundPoints: number;
  CurrentWoundPoints: number;
  TotalStunPoints: number;
  CurrentStunPoints: number;
  Attributes: Attributes;
  DerivedTraits: IDerivedTraits;
  Achievement: Achievement;
  Skills: ISkills;
  Specializations: Specializations;
}

export class Character implements ICharacter {
  Id: number = 0;
  Name: string = "";
  NickName: string = "";
  HomeWorld: string = "";
  Concept: string = "";
  Eyes: string = "";
  Skin: string = "";
  Age: number = 0;
  Weight: number = 0;
  Other: string = "";
  Birthmarks: string[] = [];
  Tattoos: string[] = [];
  TotalWoundPoints: number = 0;
  CurrentWoundPoints: number = 0;
  TotalStunPoints: number = 0;
  CurrentStunPoints: number = 0;
  DerivedTraits: IDerivedTraits;
  Achievement: Achievement;  

  constructor(
    public Hair: Hair,
    public Height: Height,
    public Attributes: Attributes,
    public Skills: ISkills,
    public Specializations: Specializations
  ) {
    this.DerivedTraits = new DerivedTraits(Attributes);
    this.Achievement = new Achievement();
  }
}
