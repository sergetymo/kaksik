import Response from './Response.ts'
import ResponseBody from './ResponseBody.ts'
import ResponseHeader from './ResponseHeader.ts'
import ResponseStatusCode from './ResponseStatusCode.ts'

export default class OkResponse extends Response {
  constructor (mime: string, body: ResponseBody) {
    const header = new ResponseHeader(ResponseStatusCode.Success, mime)
    super(header, body)
  }
}
