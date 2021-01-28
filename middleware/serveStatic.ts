import { Context } from '../classes/Context.ts'
import { State } from '../classes/Application.ts'
import { Directory } from '../classes/Directory.ts'
import { ResponseFailure } from '../classes/ResponseFailure.ts'
import { ResponseNotFound } from '../classes/ResponseNotFound.ts'

export function serveStatic<S extends State = Record<string, any>> (
  fromDirectory: string = './',
  toUrl: string = '/'
): (ctx: Context<S>, next: () => Promise<void>) => Promise<void> {
  return async function (ctx: Context<S>, next: () => Promise<void>) {
    if (ctx.request.path.startsWith(toUrl)) {
      try {
        ctx.response = await new Directory(
          fromDirectory,
          ctx.request.path,
          toUrl,
        ).response()
      } catch (e) {
        switch (e.name) {
          case 'NotFound':
          case 'PermissionDenied':
            ctx.response = new ResponseNotFound()
            break
          default:
            ctx.response = new ResponseFailure()
            break
        }
      }
    } else {
      await next()
    }
  }
}
