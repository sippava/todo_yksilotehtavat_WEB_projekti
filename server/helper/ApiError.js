class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

export { ApiError }

// Lopuksi tein ApiError-luokan.
// ApiError perii JavaScriptin valmiin Error-luokan
// extends-avainsanalla.

// Näiden muutosten jälkeen testasin backendin uudelleen.
// toiminnot toimivat myös selaimessa normaalisti.