import { IRow } from "@krisnorman/rpg-utils";
import { GenericTable } from "../../../index.js";

export class MyTable<T extends ITableRow> extends GenericTable<T> {
    constructor(
        protected data: T[],
        public readonly Name: string,
        public readonly DieExpression: string,
        public readonly PrefixText?: string
    ) {
        super(data);
    }

    get Rows(): T[] {
        return this.data;
    }
}

export interface ITableRow extends IRow {
    CalculatedValue?: string;
    Notes?: string;
    TableName?: string;
    AltValue?: string;
    Items?: ITableRow[];
  }