import { Middleware, compose } from './Middleware.ts'
import { Context } from './Context.ts'
import { ResponseFailure } from './ResponseFailure.ts'

export type Config = Omit<Deno.ListenTlsOptions, 'transport'>
export type ConfigDefaults = Required<Pick<Config, 'hostname' | 'port'>>
export type ConfigArgument = Partial<Pick<Config, 'hostname' | 'port'>>
  & Required<Pick<Config, 'keyFile' | 'certFile'>>
// deno-lint-ignore no-explicit-any
export type State = Record<string | number | symbol, any>

export class Application <S extends State> {
  public state: S
  public readonly config: Config

  private server?: Deno.Listener
  private decoder: TextDecoder
  private isStarted = false
  private middleware: Array<Middleware<S, Context<S>>> = []
  private composed?: (context: Context<S>) => Promise<void>

  constructor (config: ConfigArgument, initialState: S = {} as S) {
    this.decoder = new TextDecoder()
    this.state = initialState
    this.config = Object.assign<ConfigDefaults, ConfigArgument>({
      hostname: 'localhost',
      port: 1965,
    }, config)
  }

  public async start (): Promise<void> {
    this.server = Deno.listenTls(this.config)
    this.isStarted = true
    console.log(`Listening on ${this.config.hostname}:${this.config.port}`)
    while (this.isStarted) {
      try {
        for await (const connection of this.server) {
          await this.handleConnection(connection)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  public use <AS extends State = S> (
    ...middleware: Array<Middleware<AS, Context<AS>>>
  ): Application<AS extends S ? AS : (AS & S)> {
    this.middleware.push(...middleware)
    this.composed = undefined
    // deno-lint-ignore no-explicit-any
    return this as Application<any>
  }

  private compose (): (ctx: Context<S>) => Promise<void> {
    if (!this.composed) this.composed = compose(this.middleware)
    return this.composed
  }

  private async handleConnection (connection: Deno.Conn): Promise<void> {
    const buffer = new Uint8Array(1026)
    const length = await connection.read(buffer)
    if (!length) return void 0
    const requestString = this.decoder.decode(buffer.subarray(0, length))
    const ctx = new Context(this, requestString)
    try {
      await this.compose()(ctx)
    } catch (_error) {
      ctx.response = new ResponseFailure()
    }
    await connection.write(ctx.response.contents)
    connection.close();
  }
}
