import { Response } from './Response.ts'
import { Header } from './Header.ts'
import { StatusCode, StatusCodeFailure } from './StatusCode.ts'

export class ResponseFailure extends Response {
  constructor (
    message: string = "Request failed",
    statusCode: StatusCodeFailure = StatusCode.TemporaryFailure,
  ) {
    super(new Header(statusCode, message))
  }
}
