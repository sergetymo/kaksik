import {
  Application,
  handleRedirects,
  handleRoutes,
  Redirect,
  Route,
} from '../mod.ts'

const app = new Application({
  keyFile: '../cert/key.pem',
  certFile: '../cert/cert.pem',
})

app.use(handleRedirects(
  new Redirect('/short', '/long-very-long-url', true),
  new Redirect('/home', 'https://tymo.name'),
))

app.use(handleRoutes(
  new Route('/long-very-long-url', async (ctx) => {
    ctx.response.body = '# Redirect target page'
  }),
))

await app.start()
