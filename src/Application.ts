import { ApplicationOptions, ServerConfiguration, State } from './types.d.ts'

export default class Application<S extends State> {
  public state: S
  private listener?: Deno.Listener

  constructor (options: ApplicationOptions<S>) {
    this.state = options.state ?? {} as S
  }
}
