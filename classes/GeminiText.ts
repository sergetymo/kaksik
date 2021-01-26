import { Line } from './Line.ts'

export class GeminiText {
  private encoder: TextEncoder
  private lines: Array<Line>
  private encoded?: Uint8Array

  constructor (...lines: Array<Line>) {
    this.encoder = new TextEncoder()
    this.lines = lines
  }

  public get string (): string {
    return this.lines.map(line => line.string).join('')
  }

  public get buffer (): Uint8Array {
    if (!this.encoded) this.encoded = this.encoder.encode(this.string)
    return this.encoded
  }
}
