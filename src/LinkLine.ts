import Line from './Line.ts'

export default class LinkLine extends Line {
  private readonly link: string
  private readonly desctription?: string

  constructor (link: string, desctription?: string) {
    super()
    // TODO: validate link
    this.link = link
    this.desctription = desctription
  }

  protected get contents (): string {
    const parts: Array<string> = [this.ARROW, this.link]
    if (this.desctription) {
      parts.push(this.desctription)
    }
    return parts.join(this.SPACE)
  }
}
