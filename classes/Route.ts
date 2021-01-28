import { State } from './Application.ts'
import { Context } from './Context.ts'

const PARAMETER = /(:[^\/]+)/g

function safeDecode (component: string): string {
  try {
    return decodeURIComponent(component)
  } catch {
    return component
  }
}

export function parseQueryParameters (query: string): Parameters {
  return query.split('&')
    .filter(p => p.length)
    .reduce<Parameters>((acc, pair) => {
      const [key, value] = pair.split('=', 2)
      acc[safeDecode(key)] = value ? safeDecode(value) : undefined
      return acc
    }, {})
}

export type Parameters = Record<string, string | undefined>

export interface RouteContext<
  P extends Parameters = Parameters,
  // deno-lint-ignore no-explicit-any
  S extends State = Record<string, any>,
> extends Context<S> {
  pathParams: P
  queryParams: Parameters
  route: Route<P, S>
}

export type RouteHandler<
  P extends Parameters = Parameters,
  // deno-lint-ignore no-explicit-any
  S extends State = Record<string, any>,
> = (
  ctx: RouteContext<P, S>,
  next: () => Promise<void>
) => Promise<void>

export class Route<
  P extends Parameters = Parameters,
  // deno-lint-ignore no-explicit-any
  S extends State = Record<string, any>,
> {
  public readonly pathParameterNames: Array<keyof P>
  public readonly matcher: RegExp

  constructor(
    public readonly path: string,
    public readonly handler: RouteHandler<P, S>,
  ) {
    this.matcher = new RegExp(
      '^' + this.path.replace(PARAMETER, '([^\/]+)') + '$'
    )
    this.pathParameterNames = (this.path.match(PARAMETER) || [])
      .map(name => name.substring(1))
  }

  private parsePathParameters (path: string): P {
    const matches = path.match(this.matcher)
    if (!matches) return {} as P
    return this.pathParameterNames.reduce<P>(
      (acc: P, name: keyof P, index: number) => {
        acc[name] = safeDecode(matches[index + 1]) as P[keyof P]
        return acc
      },
      {} as P
    )
  }

  public matches (path: string): boolean {
    return !!path.match(this.matcher)
  }

  public async handle (
    path: string,
    query: string,
    ctx: RouteContext<P, S>,
    next: () => Promise<void>,
  ): Promise<void> {
    ctx.pathParams = this.parsePathParameters(path)
    ctx.queryParams = parseQueryParameters(query || '')
    ctx.route = this
    await this.handler(ctx, next)
  }
}
