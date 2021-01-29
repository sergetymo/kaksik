import { ResponseRedirect } from './ResponseRedirect.ts'

export class Redirect {
  private readonly matcher: RegExp

  constructor(
    public readonly from: string,
    public readonly to: string,
    public readonly permanent: boolean = false,
) {
    this.matcher = new RegExp('^' + this.from + '$')
  }

  public matches (path: string): boolean {
    return !!path.match(this.matcher)
  }

  public get response (): ResponseRedirect {
    return new ResponseRedirect(this.to, this.permanent)
  }
}
