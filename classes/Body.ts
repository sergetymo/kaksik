import { GeminiText } from './GeminiText.ts'

export class Body {
  public readonly contents: Uint8Array

  constructor (contents: GeminiText | Uint8Array | string) {
    if (typeof contents === 'string') {
      this.contents = new TextEncoder().encode(contents)
    } else if (contents instanceof GeminiText) {
      this.contents = contents.buffer
    } else {
      this.contents = contents
    }
  }
}

