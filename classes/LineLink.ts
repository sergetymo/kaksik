import { Line } from './Line.ts'

export class LineLink extends Line {
  constructor (
    private readonly link: string,
    private readonly description?: string,
  ) {
    super()
  }

  protected get contents (): string {
    const parts: Array<string> = [this.ARROW, this.link]
    if (this.description) {
      parts.push(this.description)
    }
    return parts.join(this.SPACE)
  }
}
