import { Line } from './Line.ts'

export class LinePreformattingToggle extends Line {
  private readonly altText?: string

  constructor (altText?: string) {
    super()
    this.altText = altText
  }

  protected get contents (): string {
    if (this.altText) {
      return [this.TICKS, this.altText].join(this.EMPTY)
    }
    return this.TICKS
  }
}
