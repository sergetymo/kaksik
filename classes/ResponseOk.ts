import { Response } from './Response.ts'
import { Body } from './Body.ts'
import { Header } from './Header.ts'
import { StatusCode } from './StatusCode.ts'
import { MIME_GEMINI } from './File.ts'
import { Gemtext } from './Gemtext.ts'

export class ResponseOk extends Response {
  constructor(body: Body | Gemtext, mime: string = MIME_GEMINI) {
    const header = new Header(StatusCode.Success, mime)
    super(header, body)
  }
}
