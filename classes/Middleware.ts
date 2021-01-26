import { State } from './Application.ts'
import { Context } from './Context.ts'

export interface Middleware<S extends State, C extends Context<S>> {
  (context: C, next: () => Promise<void>): Promise<void> | void
}

export function compose<S extends State, C extends Context<S>> (
  middleware: Array<Middleware<S, C>>
) {
  return function composeMiddleware (
    context: C,
    next?: () => Promise<void>,
  ): Promise<void> {
    let index = -1

    async function dispatch (i: number): Promise<void> {
      if (i <= index) {
        throw new Error('next() called multiple times')
      }
      index = i
      let fn: Middleware<S, C> | undefined = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return
      await fn(context, dispatch.bind(null, i + 1))
    }

    return dispatch(0)
  }
}
