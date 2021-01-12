import { ServerConfiguration } from '../types.d.ts'

export default class Server {
  #configuration: ServerConfiguration
  constructor (configuration: ServerConfiguration) {
    this.#configuration = configuration
    console.log(this.#configuration.keyFile)
  }

  public async serve() {
    console.log('Serving...')
    const encoder = new TextEncoder()
    const listener = Deno.listenTls(this.#configuration)
    while (true) {
      try {
        for await (const connection of listener) {
          console.log(connection)
          const header: Uint8Array = encoder.encode('20 text/gemini\r\n')
          const body: Uint8Array = encoder.encode('# Hello World!')
          const encodedResponse = new Uint8Array(header.length + body.length)
          encodedResponse.set(header)
          encodedResponse.set(body, header.length)
          console.log(encodedResponse)
          await connection.write(encodedResponse)
          connection.close()
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
