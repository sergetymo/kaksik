import { urlParse } from 'https://deno.land/x/url_parse/mod.ts'

export default class Request {
  public protocol: string
  public host: string
  public path: string
  public params?: URLSearchParams

  constructor (requestString: string) {
    const url = urlParse(requestString)
    this.protocol = url.protocol || 'gemini:'
    this.host = url.hostname
    this.path = url.pathname || '/'
    if (url.search) {
      this.params = url.searchParams
    }
  }
}
