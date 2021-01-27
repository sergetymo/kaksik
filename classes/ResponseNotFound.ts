import { Response } from './Response.ts'
import { Header } from './Header.ts'
import { StatusCode } from './StatusCode.ts'

export class ResponseNotFound extends Response {
  constructor() {
    super(new Header(StatusCode.NotFound, 'Requested resource not found'));
  }
}
