import { Application, State } from './Application.ts'
import { Request } from './Request.ts'
import { Response } from './Response.ts'

export class Context<S extends State> {
  public app: Application<S>
  public state: S
  public request: Request
  public response: Response

  constructor (application: Application<S>, requestString: string) {
    this.app = application
    this.state = application.state
    this.request = new Request(requestString)
    this.response = new Response()
  }
}
