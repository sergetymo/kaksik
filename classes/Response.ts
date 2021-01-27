import { Body } from './Body.ts'
import { Gemtext } from './Gemtext.ts'
import { Header } from './Header.ts'
import { StatusCode } from './StatusCode.ts'

export class Response {
  private _header?: Header
  private _body?: Body
  private _mime = 'text/gemini'

  constructor (header?: Header, body?: Body | Gemtext) {
    this._header = header
    this._body = body instanceof Gemtext ? new Body(body) : body
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

  public set body (contents: string | Gemtext | Uint8Array | Body) {
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
