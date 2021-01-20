import Line from './Line.ts'
import { HeadingLevel } from './types.d.ts';

export default class HeadingLine extends Line {
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
