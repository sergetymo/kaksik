import { Line } from './Line.ts'

export class LineText extends Line {
  constructor (private readonly text: string = '') {
    super()
    // TODO: replace CRLFs with spaces?
    this.text = text
  }

  protected get contents (): string {
    return this.text
  }
}
