import { Height } from "./Height";
import { Hair } from "./Hair";
import { Attributes } from "../character/attributes";
import { Achievement } from "./Achievement";
import { DerivedAttributes } from "../character/attributes/derived/DerivedAttributes";
import { Specializations } from "./skills/specializations/Specializations";
import { ISkills } from "./skills";

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
  DerivedAttributes: DerivedAttributes;
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
  DerivedAttributes: DerivedAttributes;
  Achievement: Achievement;  

  constructor(
    public Hair: Hair,
    public Height: Height,
    public Attributes: Attributes,
    public Skills: ISkills,
    public Specializations: Specializations
  ) {
    this.DerivedAttributes = new DerivedAttributes(Attributes);
    this.Achievement = new Achievement();
  }
}
