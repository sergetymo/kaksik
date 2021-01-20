import Line from './Line.ts'

export default class TextLine extends Line {
  private readonly text: string

  constructor (text: string = '') {
    super()
    // TODO: replace CRLFs with spaces?
    this.text = text
  }

  protected get contents (): string {
    return this.text
  }
}
