import Application from '../src/Application.ts'
import ResponseStatusCode from '../src/ResponseStatusCode.ts'
import ResponseHeader from '../src/ResponseHeader.ts'
import ResponseBody from '../src/ResponseBody.ts'

const app = new Application({
  'hostname': 'localhost',
  'port': 1965,
  'keyFile': '../cert/key.pem',
  'certFile': '../cert/cert.pem',
})

app.use(ctx => {
  ctx.response.header = new ResponseHeader(ResponseStatusCode.Success, 'text/gemini')
  ctx.response.body = new ResponseBody('# Imagery')
})

app.start()

