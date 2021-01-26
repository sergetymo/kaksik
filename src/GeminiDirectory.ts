import { Response } from './Response.ts'
import { GeminiFile, MIME_GEMINI } from './GeminiFile.ts'
import { ResponseOk } from './ResponseOk.ts'
import { Body } from './Body.ts'
import { GeminiText } from './GeminiText.ts'
import { LineLink } from './LineLink.ts'
import { LineHeading } from './LineHeading.ts'
import { LineText } from './LineText.ts'

function isGeminiIndexFile (name: string): boolean {
  return name === 'index.gmi' || name === 'index.gemini'
}

function isRootDir (path: string): boolean {
  return path === '/'
}

function join(...parts: Array<string>): string {
  return parts.join('/').replaceAll('//', '/')
}

export class GeminiDirectory {
  private entries: Array<string> = []

  constructor(
    private readonly root: string,
    private readonly path: string,
  ) {}

  private get systemPath (): string {
    return [this.root, this.path].join('')
  }

  private get links (): Array<LineLink> {
    return this.entries
      .sort()
      .map<LineLink>(entryPath =>
        new LineLink(join(this.path, entryPath), entryPath)
      )
  }

  public async response (): Promise<Response> {
    const info = await Deno.stat(this.systemPath)
    if (info.isFile) {
      return await new GeminiFile(this.systemPath).response()
    }
    if (!isRootDir(this.path)) this.entries.push('..')
    for await (const entry of Deno.readDir(this.systemPath)) {
      if (entry.isFile && isGeminiIndexFile(entry.name)) {
        return await new GeminiFile(
          join(this.systemPath, entry.name)
        ).response()
      }
      this.entries.push(entry.name + (entry.isDirectory ? '/' : ''))
    }
    return new ResponseOk(MIME_GEMINI, new Body(new GeminiText(
      new LineHeading(`Listing of ${this.path}`, 1),
      new LineText(),
      ...this.links,
    )))
  }
}
