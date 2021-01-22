import { Response } from './Response.ts'
import { Header } from './Header.ts'
import { StatusCode } from './StatusCode.ts'

export class ResponseRedirect extends Response {
  constructor (path: string, isPermanent: boolean = false) {
    super(new Header(
      isPermanent
        ? StatusCode.PermanentRedirect
        : StatusCode.TemporaryRedirect
      ,
      path)
    )
  }
}
