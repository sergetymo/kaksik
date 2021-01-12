export type ServerConfiguration = Omit<Deno.ListenTlsOptions, 'transport'>
