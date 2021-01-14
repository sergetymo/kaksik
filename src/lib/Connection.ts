export default class Connection {
  private conn: Deno.Conn

  constructor (conn: Deno.Conn) {
    this.conn = conn
  }

  public async read (destination: Uint8Array): Promise<number | null> {
    return await this.conn.read(destination)
  }
  
  public async write (contents: Uint8Array): Promise<void> {
    // TODO: catch error throwed if heeader is missing
    await this.conn.write(contents)
    this.conn.close()
  }

}
