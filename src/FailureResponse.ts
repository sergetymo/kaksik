import Response from './Response.ts'
import ResponseHeader from './ResponseHeader.ts'
import ResponseStatusCode from './ResponseStatusCode.ts'

export type FailureStatusCode = ResponseStatusCode.TemporaryFailure
  | ResponseStatusCode.ServerUnavailable
  | ResponseStatusCode.CGIError
  | ResponseStatusCode.ProxyError
  | ResponseStatusCode.SlowDown
  | ResponseStatusCode.PermanentFailure
  | ResponseStatusCode.NotFound
  | ResponseStatusCode.Gone
  | ResponseStatusCode.ProxyRequestRefused
  | ResponseStatusCode.BadRequest

export default class FailureResponse extends Response {
  constructor (
    statusCode: FailureStatusCode = ResponseStatusCode.TemporaryFailure,
    message: string = "Request failed",
  ) {
    super(new ResponseHeader(statusCode, message))
  }
}
