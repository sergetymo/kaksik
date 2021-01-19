import ResponseBody from './ResponseBody.ts'
import ResponseHeader from './ResponseHeader.ts'

export default class Response {
  public header?: ResponseHeader
  public body?: ResponseBody

  constructor (header?: ResponseHeader, body?: ResponseBody) {
    this.header = header
    this.body = body
  }

  public get contents (): Uint8Array {
    if (!this.header) {
      throw new Error('Response header is missing')
    }
    const header = this.header.contents
    if (!this.body) {
      return header
    }
    const body = this.body.contents
    const contents = new Uint8Array(header.length + body.length)
    contents.set(header)
    contents.set(body, header.length)
    return contents
  }
}
