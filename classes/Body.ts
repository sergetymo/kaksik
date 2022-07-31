import { Gemtext } from './Gemtext.ts'

export class Body {
  public readonly contents: Uint8Array

  constructor (contents: Gemtext | Uint8Array | string) {
    if (typeof contents === 'string') {
      this.contents = new TextEncoder().encode(contents)
    } else if (contents instanceof Gemtext) {
      this.contents = contents.contents
    } else {
      this.contents = contents
    }
  }
}

