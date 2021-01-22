import { StatusCode } from './StatusCode.ts'

export class Header {
  private encoder: TextEncoder
  public readonly statusCode: StatusCode
  public readonly meta: string

  constructor (statusCode: StatusCode, meta: string) {
    this.statusCode = statusCode
    this.meta = meta
    this.encoder = new TextEncoder()
  }

  public get contents (): Uint8Array {
    return this.encoder.encode(`${this.statusCode} ${this.meta}\r\n`)
  }
}

