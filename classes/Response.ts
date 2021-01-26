import { Body } from './Body.ts'
import { GeminiText } from './GeminiText.ts'
import { Header } from './Header.ts'
import { StatusCode } from './StatusCode.ts'

export class Response {
  private _header?: Header
  private _body?: Body
  private _mime = 'text/gemini'

  constructor (header?: Header, body?: Body | GeminiText) {
    this._header = header
    this._body = body instanceof GeminiText ? new Body(body) : body
    // TODO: ditch/move mime?
    // TODO: auto gemini mime?
    // TODO: Default response?
  }

  public get contents (): Uint8Array {
    if (!this._header) throw new Error('Response header is missing')
    const headerContents = this._header.contents
    if (!this._body) return headerContents
    const bodyContents = this._body.contents
    const contents = new Uint8Array(headerContents.length + bodyContents.length)
    contents.set(headerContents)
    contents.set(bodyContents, headerContents.length)
    return contents
  }

  public set body (contents: string | GeminiText | Uint8Array | Body) {
    this._header = new Header(StatusCode.Success, this._mime)
    if (contents instanceof Body) {
      this._body = contents
    } else {
      this._body = new Body(contents)
    }
  }

  // TODO: public set header
  // TODO: public set mime
}
