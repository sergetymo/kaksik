import { Application } from '../mod.ts'

const app = new Application({
  keyFile: '../cert/key.pem',
  certFile: '../cert/cert.pem',
})

app.use(async (ctx, next) => {
  console.log('Received', ctx.request)
  console.time('Response sent in')
  await next()
  console.timeEnd('Response sent in')
})

app.use(async (ctx) => {
  await new Promise(r => setTimeout(r, 100))
  ctx.response.body = '# Hello World!'
})

await app.start()

