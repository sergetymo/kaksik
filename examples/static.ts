import { Application, serveStatic } from '../mod.ts'

const app = new Application({
  keyFile: '../cert/key.pem',
  certFile: '../cert/cert.pem',
})

app.use(serveStatic('./public/no_index_file/', '/log/'))
app.use(serveStatic('./public/'))

await app.start()

