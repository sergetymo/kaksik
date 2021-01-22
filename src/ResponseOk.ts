import { Response } from './Response.ts'
import { Body } from './Body.ts'
import { Header } from './Header.ts'
import { StatusCode } from './StatusCode.ts'

export class ResponseOk extends Response {
  constructor (mime: string, body: Body) {
    const header = new Header(StatusCode.Success, mime)
    super(header, body)
  }
}
