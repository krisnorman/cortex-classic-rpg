import { IRow } from "@krisnorman/rpg-utils";

export interface IRowResult2<T extends IRow> {
  ActualRoll: number;
  Row: T;
  Index: number;
}
