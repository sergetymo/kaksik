import { urlParse } from '../deps.ts'

export class Request {
  public protocol: string
  public host: string
  public path: string
  public params?: URLSearchParams

  constructor (requestString: string) {
    // TODO: ditch urlParse in favor of new URL()
    const url = urlParse(requestString)
    this.protocol = url.protocol || 'gemini:'
    this.host = url.hostname
    this.path = url.pathname || ''
    if (url.search) this.params = url.searchParams
  }
}
