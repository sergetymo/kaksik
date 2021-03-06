import { extname, lookup } from '../deps.ts'
import { Response } from './Response.ts'
import { ResponseOk } from './ResponseOk.ts'
import { Body } from './Body.ts'

export const MIME_GEMINI = 'text/gemini'
export const MIME_DEFAULT = 'text/plain'

function isGeminiExtension (ext: string): boolean {
  return ext === '.gmi' || ext === '.gemini'
}

export class File {
  private readonly mime: string
  constructor(private readonly systemPath: string) {
    isGeminiExtension(extname(systemPath))
      ? this.mime = MIME_GEMINI
      : this.mime = lookup(systemPath) || MIME_DEFAULT
  }

  public async response (): Promise<Response> {
    const contents = await Deno.readFile(this.systemPath)
    return new ResponseOk(new Body(contents), this.mime)
  }
}


