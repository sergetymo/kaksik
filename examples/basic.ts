import { Application } from '../mod.ts'

const app = new Application({
  'hostname': 'localhost',
  'port': 1965,
  'keyFile': '../cert/key.pem',
  'certFile': '../cert/cert.pem',
})

app.use(ctx => {
  ctx.response.body = '# Hello World!'
})

await app.start()

