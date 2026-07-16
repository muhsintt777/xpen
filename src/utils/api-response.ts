export class ApiResponse {
  message: string;
  errorType: string | null;
  data: any;

  constructor(
    data: any,
    message: string = 'successfull',
    errorType: string | null = null,
  ) {
    this.message = message;
    this.data = data;
    this.errorType = errorType;
  }
}
