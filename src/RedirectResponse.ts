import Response from './Response.ts'
import ResponseHeader from './ResponseHeader.ts'
import ResponseStatusCode from './ResponseStatusCode.ts'

export default class RedirectResponse extends Response {
  constructor (path: string, isPermanent: boolean = false) {
    super(new ResponseHeader(
      isPermanent
        ? ResponseStatusCode.PermanentRedirect
        : ResponseStatusCode.TemporaryRedirect
      ,
      path)
    )
  }
}
