import Application from '../src/Application.ts'

const app = new Application({
  'hostname': 'localhost',
  'port': 1965,
  'keyFile': '../cert/key.pem',
  'certFile': '../cert/cert.pem',
})
