export type State = Record<string | number | symbol, any>
export type ServerConfiguration = Omit<Deno.ListenTlsOptions, 'transport'>
export type HeadingLevel = 1 | 2 | 3
