import ResponseBody from './ResponseBody.ts'
import Gemtext from './Gemtext.ts'
import ResponseHeader from './ResponseHeader.ts'
import ResponseStatusCode from './ResponseStatusCode.ts'

export default class Response {
  #header?: ResponseHeader
  #body?: ResponseBody
  #mime: string = 'text/gemini'

  constructor (header?: ResponseHeader, body?: ResponseBody) {
    this.#header = header
    this.#body = body
  }

  public get contents (): Uint8Array {
    if (!this.#header) {
      throw new Error('Response header is missing')
    }
    const headerContents = this.#header.contents
    if (!this.#body) {
      return headerContents
    }
    const bodyContents = this.#body.contents
    const responseContents = new Uint8Array(headerContents.length + bodyContents.length)
    responseContents.set(headerContents)
    responseContents.set(bodyContents, headerContents.length)
    return responseContents
  }

  public set body (contents: string | Gemtext | Uint8Array | ResponseBody) {
    this.#header = new ResponseHeader(ResponseStatusCode.Success, this.#mime)
    if (contents instanceof ResponseBody) {
      this.#body = contents
    } else {
      this.#body = new ResponseBody(contents)
    }
  }

  // TODO: public set header
}
