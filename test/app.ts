import Server from '../src/lib/Server.ts'

const server = new Server({
  'hostname': 'localhost',
  'port': 1965,
  'keyFile': '../cert/key.pem',
  'certFile': '../cert/cert.pem',
})
server.serve()
