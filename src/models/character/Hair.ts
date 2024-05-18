export class Hair {
  constructor(
    public Color: string,
    public Length: string,
    public Style: string
  ) {}

  public toString = (): string => {
    return `${this.Length} ${this.Color} ${this.Style} hair`;
  };
}
