enum ResponseStatusCode {
  Input = 10,
  SensitiveInput = 11,
  Success = 20,
  TemporaryRedirect = 30,
  PermanentRedirect = 31,
  TemporaryFailure = 40,
  ServerUnavailable = 41,
  CGIError = 42,
  ProxyError = 43,
  SlowDown = 44,
  PermanentFailure = 50,
  NotFound = 51,
  Gone = 52,
  ProxyRequestRefused = 53,
  BadRequest = 59,
  ClientCertificateRequired = 60,
  CertificateNotAuthorized = 61,
  CertificateNotValid = 62
}

export default ResponseStatusCode
