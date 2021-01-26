import { Line } from './Line.ts'

export class LineListItem extends Line {
  private readonly text: string

  constructor (text: string = '') {
    super()
    this.text = text
  }

  protected get contents (): string {
    return [this.ASTERISK, this.text].join(this.SPACE)
  }
}
