import { State } from '../classes/Application.ts'
import { Context } from '../classes/Context.ts'
import { Redirect } from '../classes/Redirect.ts'

export function handleRedirects <S extends State = Record<string, any>> (
  ...redirects: Array<Redirect>
): (ctx: Context<S>, next: () => Promise<void>) => Promise<void> {
  return async function (ctx: Context<S>, next: () => Promise<void>) {
    const match = redirects.find(redirect => redirect.matches(ctx.request.path))
    if (match) {
      ctx.response = match.response
    } else {
      await next()
    }
  }
}
