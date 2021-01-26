import { Context } from '../classes/Context.ts'
import { State } from '../classes/Application.ts'
import { GeminiDirectory } from '../classes/GeminiDirectory.ts'

export function serveStatic<S extends State = Record<string, any>> (
  root: string = './',
) {
  // TODO: serve static files on specific url, e.g. gemini://server.com/gemlog
  // TODO: by calling serveStatic('./path/to/gemlog/dir', '/gemlog')
  // TODO: bypassing paths that not matched to next() and allowing multiple mws
  return async function (ctx: Context<S>) {
    try {
      ctx.response = await new GeminiDirectory(root, ctx.request.path).response()
    } catch (e) {
      console.log(e)
      switch (e.name) {
        case 'NotFound':
        case 'PermissionDenied':
          // TODO: respond with 51
          break
        default:
          // TODO: respond with 50
          break
      }
    }
  }
}
