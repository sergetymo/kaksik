import { Response } from './Response.ts'
import { Header } from './Header.ts'
import { StatusCode, StatusCodeFailure } from './StatusCode.ts'

export class ResponseFailure extends Response {
  constructor (
    statusCode: StatusCodeFailure = StatusCode.TemporaryFailure,
    message: string = "Request failed",
  ) {
    super(new Header(statusCode, message))
  }
}
