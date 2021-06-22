export class ApiError extends Error {
  constructor(axios_error) {
    super(axios_error.response.data.message)
    this.name = "ApiError"
    this.code = axios_error.response.data.code

    this.response = axios_error.response
    this.request = axios_error.request
  }
}

export function transform_4xx_error(error) {
  const { status } = error.response
  // 處理 4xx
  if (400 <= status && status < 500) {
    return Promise.reject(new ApiError(error))
  }

  return Promise.reject(error)
}
