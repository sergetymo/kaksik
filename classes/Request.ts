export class Request {
  public protocol: string
  public host: string
  public path: string
  public params?: URLSearchParams

  constructor (requestString: string) {
    const url = new URL(requestString)
    this.protocol = url.protocol || 'gemini:'
    this.host = url.hostname
    this.path = url.pathname || ''
    if (url.search) this.params = url.searchParams
  }
}
