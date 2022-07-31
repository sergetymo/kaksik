import { Line } from './Line.ts'

export class Gemtext {
  private readonly encoder: TextEncoder
  private readonly _lines: Array<Line> = []
  private encoded?: Uint8Array

  constructor (...content: Array<Line | Gemtext>) {
    this.encoder = new TextEncoder()
    this.append(...content)
  }

  public get string (): string {
    return this._lines.map(line => line.string).join('')
  }

  public get contents (): Uint8Array {
    if (!this.encoded) this.encoded = this.encoder.encode(this.string)
    return this.encoded
  }

  public get lines (): ReadonlyArray<Line> {
    return Object.freeze(Array.from(this._lines))
  }

  public append (...linesOrGemtext: Array<Line | Gemtext>): this {
    if (this.encoded) this.encoded = undefined
    linesOrGemtext.forEach(element => {
      if (element instanceof Gemtext) {
        this._lines.push(...element.lines)
      } else {
        this._lines.push(element)
      }
    })
    return this
  }
}
