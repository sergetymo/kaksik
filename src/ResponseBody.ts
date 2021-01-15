export default class ResponseBody {
  public readonly contents: Uint8Array

  constructor (contents: Uint8Array | string) {
    if (typeof contents === 'string') {
      this.contents = new TextEncoder().encode(contents)
    } else {
      this.contents = contents
    }
  }
}

