# Kaksik
Middleware application microframework for [Gemini](https://gemini.circumlunar.space) protocol
on top of [Deno](https://deno.land) runtime, written in TypeScript.

Heavily inspired by [oak](https://github.com/oakserver/oak) and [denoscuri](https://github.com/caranatar/denoscuri).

## Features
Soon

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

## Roadmap
Soon.

## Trivia
"Kaksik" means "twin" in Estonian.
