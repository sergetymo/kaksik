import { Application, Route, handleRoutes } from '../mod.ts'

const app = new Application({
  keyFile: '../cert/key.pem',
  certFile: '../cert/cert.pem',
})

app.use(handleRoutes(
  new Route('/test', async (ctx) => {
    ctx.response.body = '# Test page'
  }),
  new Route<{id?: string}>('/param/:id', async (ctx) => {
    ctx.response.body = '# Parametrized page\r\n' +
      'id = ' + ctx.pathParams.id
  }),
  new Route('/', async (ctx) => {
    ctx.response.body = '# HOME page\r\n' +
      '=> /test Test page served by other route\r\n' +
      '=> /param/7 Parametrized page, where id=7\r\n' +
      '=> /404 No routes matched'
  }),
))

app.use(async (ctx) => {
  ctx.response.body = '# No routes matched\r\n' +
    'Running fallback middleware'
})

await app.start()
