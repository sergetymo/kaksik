import { State } from '../classes/Application.ts'
import { Context } from '../classes/Context.ts'
import { Route, RouteContext } from '../classes/Route.ts'

export function handleRoutes<S extends State = Record<string, any>> (
  ...routes: Array<Route>
): (ctx: Context<S>, next: () => Promise<void>) => Promise<void> {
  return async function (ctx: Context<S>, next: () => Promise<void>) {
    const [path, query] = ctx.request.path.split('?', 2)
    const route = routes.find(route => route.matches(path))
    if (route) {
      await route.handle(path, query, ctx as RouteContext, next)
    } else {
      await next()
    }
  }
}
