import { AttributeBase } from "../";

export class DerivedAttributeBase {
    constructor(private attribute1: AttributeBase, private attribute2: AttributeBase) {
        this.value = attribute1.value + attribute2.value;
    }

    value: number;

    roll(): number {
        let attr1Result = this.attribute1.roll();
        let attr2Result = this.attribute2.roll();
        let sum = attr1Result + attr2Result;
        //let logMsg = `${this.attribute1.abbreviation}(${attr1Result})+${this.attribute2.abbreviation}(${attr2Result})=${sum}`;
        //console.log(logMsg);
        return sum;
    }
}