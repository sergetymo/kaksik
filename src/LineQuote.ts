import { Line } from './Line.ts'

export class LineQuote extends Line {
  private readonly text: string

  constructor (text: string) {
    super()
    this.text = text
  }

  protected get contents (): string {
    return [this.GREATER, this.text].join(this.SPACE)
  }
}
