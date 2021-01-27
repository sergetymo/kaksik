import { Response } from './Response.ts'
import { File } from './File.ts'
import { ResponseOk } from './ResponseOk.ts'
import { Gemtext } from './Gemtext.ts'
import { LineLink } from './LineLink.ts'
import { LineHeading } from './LineHeading.ts'
import { LineText } from './LineText.ts'

function isGeminiIndexFile (name: string): boolean {
  return name === 'index.gmi' || name === 'index.gemini'
}

function joinPath(...parts: Array<string>): string {
  return parts.join('/').replaceAll('//', '/')
}

function decorateDirname(entry: Deno.DirEntry): string {
  return entry.name + (entry.isDirectory ? '/' : '')
}

export class Directory {
  private entries: Array<string> = []

  constructor(
    private readonly dir: string,
    private path: string,
    private readonly alias: string
  ) {}

  private get systemPath (): string {
    return [this.dir, this.path.replace(this.alias, '')].join('')
  }

  private get links (): Array<LineLink> {
    return this.entries.sort().map<LineLink>(entryPath =>
      new LineLink(joinPath(this.path, entryPath), entryPath)
    )
  }

  private get isRootDir (): boolean {
    return this.path === this.alias
  }

  public async response (): Promise<Response> {
    const info = await Deno.stat(this.systemPath)
    if (info.isFile) {
      return await new File(this.systemPath).response()
    } else if (!this.path.endsWith('/')) {
      this.path += '/'
    }
    if (!this.isRootDir) this.entries.push('..')
    for await (const entry of Deno.readDir(this.systemPath)) {
      if (entry.isFile && isGeminiIndexFile(entry.name)) {
        return await new File(joinPath(this.systemPath, entry.name)).response()
      }
      this.entries.push(decorateDirname(entry))
    }
    return new ResponseOk(new Gemtext(
      new LineHeading(`Listing of ${this.path}`, 1),
      new LineText(),
      ...this.links,
    ))
  }
}
