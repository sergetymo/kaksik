export abstract class Line {
  protected readonly CRLF = '\r\n'
  protected readonly SPACE = ' '
  protected readonly EMPTY = ''
  protected readonly TICKS = '```'
  protected readonly ARROW = '=>'
  protected readonly HASH = '#'
  protected readonly ASTERISK = '*'
  protected readonly GREATER = '>'

  public get string (): string {
    return `${this.contents}${this.CRLF}`
  }

  protected abstract get contents (): string
}
