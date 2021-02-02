import {
  Application,
  Gemtext,
  LineHeading,
  LineLink,
  LineText,
} from '../mod.ts'

const app = new Application({
  keyFile: '../cert/key.pem',
  certFile: '../cert/cert.pem',
})

app.use(ctx => {
  const content = new Gemtext(
    new LineHeading('Second page', 1),
    new LineText(),
  )

// ... do some calculation
  const prevPageId = 1
  const nextPageId = 3

  content.append(
    new LineHeading('Navigation'),
    new LineText(),
  )

  const nav = new Gemtext(
    new LineLink(`/pages/${prevPageId}`, 'Previous page'),
    new LineLink(`/pages/${nextPageId}`, 'Next page'),
  )

  content.append(
    new LineText('----'),
    nav,
    new LineText('----'),
  )

  ctx.response.body = content
})

await app.start()
