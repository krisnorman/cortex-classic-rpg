import { Die } from "./Die";

export class Dice {
    static get d0(): Die { return new Die("none", 0); }
    static get d2(): Die { return new Die("d2", 2); }
    static get d4(): Die { return new Die("d4", 4); }
    static get d6(): Die { return new Die("d6", 6); }
    static get d8(): Die { return new Die("d8", 8); }
    static get d10(): Die { return new Die("d10", 10); }
    static get d12(): Die { return new Die("d12", 12); }
    static get d20(): Die { return new Die("d20", 20); }
    static get d30(): Die { return new Die("d30", 30); }
    static get d100(): Die { return new Die("d100", 100); }
    static create(name: string, sides: number) { return new Die(name, sides); }
}
