import { ServerConfiguration, State } from './types.d.ts'
import { Middleware, compose } from './Middleware.ts'
import Context from './Context.ts'

export default class Application<S extends State> {
  public state: S

  private config: ServerConfiguration
  private server?: Deno.Listener
  private isStarted: boolean = false
  private middleware: Array<Middleware<State, Context<State>>> = []
  private composedMiddleware?: (context: Context<S>) => Promise<void>

  constructor (serverConfiguration: ServerConfiguration, initialState: S = {} as S) { 
    this.state = initialState
    this.config = serverConfiguration
  }

  public async start (): Promise<void> {
    this.server = Deno.listenTls(this.config)
    this.isStarted = true
    console.log(`Starting app on ${this.config.hostname}:${this.config.port}...`)
    while (this.isStarted) {
      try {
        for await (const connection of this.server) {
          this.handleConnection(connection)
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
    this.composedMiddleware = undefined
    return this as Application<any>
  }

  private compose (): (context: Context<S>) => Promise<void> {
    if (!this.composedMiddleware) {
      this.composedMiddleware = compose(this.middleware)
    }
    return this.composedMiddleware
  }

  private async handleConnection (connection: Deno.Conn): Promise<void> {
    let buffer = new Uint8Array(1026)
    const length = await connection.read(buffer)
    if (!length) return void 0
    const requestString = new TextDecoder('utf-8').decode(buffer.subarray(0, length))
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
