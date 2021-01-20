import Line from './Line.ts'

export default class PreformattingToggleLine extends Line {
  private readonly altText?: string

  constructor (altText?: string) {
    super()
    this.altText = altText
  }
  
  protected get contents (): string {
    if (this.altText) {
      return [this.BACKTICKS, this.altText].join(this.EMPTY)
    }
    return this.BACKTICKS
  }
}
