import { Line } from './Line.ts'

export class Gemtext {
  private readonly encoder: TextEncoder
  private readonly _lines: Array<Line>
  private encoded?: Uint8Array

  constructor (...lines: Array<Line>) {
    this.encoder = new TextEncoder()
    this._lines = lines
  }

  public get string (): string {
    return this._lines.map(line => line.string).join('')
  }

  public get buffer (): Uint8Array {
    if (!this.encoded) this.encoded = this.encoder.encode(this.string)
    return this.encoded
  }

  public get lines (): Readonly<Array<Line>> {
    return Object.freeze(Array.from(this._lines))
  }

  public append (...content: Array<Line | Gemtext>): this {
    content.forEach(element => {
      if (element instanceof Gemtext) {
        this._lines.push(...element.lines)
      } else {
        this._lines.push(element)
      }
    })
    return this
  }
}
