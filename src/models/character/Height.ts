export class Height {
  constructor(public Feet: number, public Inches: number) {}

  public toString = (): string => {
    return `${this.Feet}' ${this.Inches}" tall`;
  };
}
