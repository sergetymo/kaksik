import { Middleware, compose } from './Middleware.ts'
import { Context } from './Context.ts'

export type Config = Omit<Deno.ListenTlsOptions, 'transport'>
// deno-lint-ignore no-explicit-any
export type State = Record<string | number | symbol, any>

export class Application<S extends State> {
  public state: S
  public readonly config: Config

  private server?: Deno.Listener
  private decoder: TextDecoder
  private isStarted = false
  private middleware: Array<Middleware<State, Context<State>>> = []
  private composed?: (context: Context<S>) => Promise<void>

  constructor (config: Config, initialState: S = {} as S) {
    this.decoder = new TextDecoder()
    this.state = initialState
    this.config = config
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

  // TODO: public stop?

  public use <AS extends State = S> (
    ...middleware: Array<Middleware<AS, Context<AS>>>
  ): Application<AS extends S ? AS : (AS & S)> {
    this.middleware.push(...middleware)
    this.composed = undefined
    // deno-lint-ignore no-explicit-any
    return this as Application<any>
  }

  private compose (): (context: Context<S>) => Promise<void> {
    if (!this.composed) this.composed = compose(this.middleware)
    return this.composed
  }

  private async handleConnection (connection: Deno.Conn): Promise<void> {
    const buffer = new Uint8Array(1026)
    const length = await connection.read(buffer)
    if (!length) return void 0
    const requestString = this.decoder.decode(buffer.subarray(0, length))
    const context = new Context(this, requestString)
    try {
      await this.compose()(context)
    } catch (error) {
      console.log(error)
    }
    await connection.write(context.response.contents)
    connection.close();
  }
}
