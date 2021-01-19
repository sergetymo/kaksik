import ResponseStatusCode from './ResponseStatusCode.ts'

export default class ResponseHeader {
  private encoder: TextEncoder
  public readonly statusCode: ResponseStatusCode
  public readonly meta: string

  constructor (statusCode: ResponseStatusCode, meta: string) {
    this.statusCode = statusCode
    this.meta = meta
    this.encoder = new TextEncoder()
  }
  
  public get contents (): Uint8Array {
    return this.encoder.encode(`${this.statusCode} ${this.meta}\r\n`)
  }
}

