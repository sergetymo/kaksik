import { Line } from './Line.ts'

export type HeadingLevel = 1 | 2 | 3

export class LineHeading extends Line {
  private readonly text: string
  private readonly level: HeadingLevel

  constructor (text: string, level: HeadingLevel = 2) {
    super()
    this.text = text
    this.level = level
  }

  protected get contents (): string {
    return [this.HASH.repeat(this.level), this.text].join(this.SPACE)
  }
}
