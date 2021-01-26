import { Line } from './Line.ts'

export class LineLink extends Line {
  private readonly link: string
  private readonly description?: string

  constructor (link: string, description?: string) {
    super()
    // TODO: validate link?
    this.link = link
    this.description = description
  }

  protected get contents (): string {
    const parts: Array<string> = [this.ARROW, this.link]
    if (this.description) {
      parts.push(this.description)
    }
    return parts.join(this.SPACE)
  }
}
