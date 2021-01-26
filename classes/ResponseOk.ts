import { Response } from './Response.ts'
import { Body } from './Body.ts'
import { Header } from './Header.ts'
import { StatusCode } from './StatusCode.ts'
import { MIME_GEMINI } from './GeminiFile.ts'
import { GeminiText } from './GeminiText.ts'

export class ResponseOk extends Response {
  constructor(body: Body | GeminiText, mime: string = MIME_GEMINI) {
    const header = new Header(StatusCode.Success, mime)
    super(header, body)
  }
}
