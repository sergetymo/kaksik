import Application from '../src/Application.ts'
import Gemtext from '../src/Gemtext.ts'
import HeadingLine from '../src/HeadingLine.ts'
import LinkLine from '../src/LinkLine.ts'
import TextLine from '../src/TextLine.ts'

const app = new Application({
  'hostname': 'localhost',
  'port': 1965,
  'keyFile': '../cert/key.pem',
  'certFile': '../cert/cert.pem',
})

app.use(ctx => {
  ctx.response.body = new Gemtext(
    new HeadingLine('Imagery', 1),
    new TextLine(),
    new LinkLine('gemini://s.tymo.name', 'stymo'),
    new TextLine(),
    new TextLine('There will be text. Elit eius magnam quae dolor ipsa eveniet aut? Facilis natus eum reiciendis reprehenderit odio. Sed et consectetur fuga quod illum ex minus. Iste quia dolor minus saepe in! Recusandae eligendi iusto blanditiis nostrum ipsum! Consequuntur tempora eaque dolore reiciendis sit. At exercitationem repudiandae doloremque quasi non. Nesciunt veritatis aliquid magnam unde pariatur')
  )
})

app.start()


