export interface ApiResponse<T = unknown> {
  status: string;
  message: string;
  data: T;
  meta: APIPaginate | null;
  code: number;
}

export interface APIPaginate {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page: string | null;
  prev_page: string | null;
}

export interface ApiErroResponse {
  status: string;
  message: string;
  code: number;
  errors: string | Record<string, string[]>;
}

export class ApiError extends Error {
  public errorResponse: ApiErroResponse;

  constructor(errorResponse: ApiErroResponse) {
    super(errorResponse.message);
    this.errorResponse = errorResponse;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  public toJson() {
    return this.errorResponse;
  }

  public toString() {
    return `[${this.name}] ${this.errorResponse.message} (code: ${this.errorResponse.code}) - ${JSON.stringify(this.errorResponse.errors)}`;
  }
}
