# Kaksik
Middleware library for creating applications for [Gemini](https://gemini.circumlunar.space) protocol
on top of [Deno](https://deno.land) runtime, written in TypeScript.

Heavily inspired by [oak](https://github.com/oakserver/oak) and [denoscuri](https://github.com/caranatar/denoscuri).

## Feature roadmap
- [x] Serve gemtext (out of the box, see `TODO: Gemtext docs`)
- [x] Serve static files at configured URLs (via middleware, see [serveStatic](#servestatic))
- [x] Serve programmable resources at configured URLs (via middleware, see [handleRoutes](#handleroutes))
- [x] Serve redirect responses at configured URLs (via middleware, see [handleRedirects](#handleredirects))
- [ ] Serve gone responses at configured URLs (via middleware)
- [ ] Improve `Response` class
- [ ] Document `Gemtext` usage
- [ ] -- 'Good enough' point --
- [ ] *Propose yours by [filing an issue](https://github.com/sergetymo/kaksik/issues/new)*

## Usage
### Prerequisites
1. [Install](https://deno.land/#installation) Deno executable
2. Obtain SSL certificates. You can generate self-signed ones using `openssl` command:
    ```bash
    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
    ```

### Your first app
Create minimal application in `app.ts`:
```typescript
import { Application } from 'https://deno.land/x/kaksik/mod.ts'

const app = new Application({
  keyFile: '/path/to/key.pem',
  certFile: '/path/to/cert.pem',
})

app.use(ctx => {
  ctx.response.body = '# Hello World!'
})

await app.start()
```

Then run it:
```bash
deno run --allow-net --allow-read app.ts
```


### Other examples
See `examples` folder.


## Available middleware
### serveStatic
Serves static files from a directory to specified URL
```typescript
import { Application, serveStatic } from 'https://deno.land/x/kaksik/mod.ts'

const app = new Application({
  keyFile: '/path/to/key.pem',
  certFile: '/path/to/cert.pem',
})

app.use(serveStatic('./log/', '/gemlog/'))
app.use(serveStatic('./public/'))

await app.start()
```
Beware of ordering of `serveStatic` middleware usages: more generic URLs should occur
later that more specific, e.g., `/path/subpath/` must be before `/path/`.


### handleRoutes
Runs specified async function when request path matches configured route.

```typescript
import {
  Application,
  handleRoutes,
  Route,
} from 'https://deno.land/x/kaksik/mod.ts'

const app = new Application({
  keyFile: '/path/to/key.pem',
  certFile: '/path/to/cert.pem',
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
```

### handleRedirects
Sends either temporary or permanent redirect response when path matches configuration.
```typescript
import {
  Application,
  handleRedirects,
  handleRoutes,
  Redirect,
  Route,
} from 'https://deno.land/x/kaksik/mod.ts'

const app = new Application({
  keyFile: '/path/to/key.pem',
  certFile: '/path/to/cert.pem',
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
```

## Trivia
"Kaksik" means "twin" in Estonian.
