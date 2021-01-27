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
  ctx.response.body = new Gemtext(
    new LineHeading('Gemtext demo', 1),
    new LineText(),
    new LineLink('gemini://s.tymo.name', 'stymo'),
    new LineText(),
    new LineText('There will be text. Elit eius magnam quae dolor ipsa eveniet aut? Facilis natus eum reiciendis reprehenderit odio. Sed et consectetur fuga quod illum ex minus. Iste quia dolor minus saepe in! Recusandae eligendi iusto blanditiis nostrum ipsum! Consequuntur tempora eaque dolore reiciendis sit. At exercitationem repudiandae doloremque quasi non. Nesciunt veritatis aliquid magnam unde pariatur')
  )
})

await app.start()
