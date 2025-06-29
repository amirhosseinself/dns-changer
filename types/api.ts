// Generic response type for APIs
export type ApiResponse<DataType = unknown> = {
  status: boolean; // Success or failure
  errorCode: number | null; // Error code (null if successful)
  message?: string;
  data: DataType; // Response data
  errors?: Array<{ field?: string; message: string }>;
};

export interface SuccessResponse<T> extends ApiResponse<T> {
  status: true;
  errorCode: null;
}

export interface ErrorResponse extends ApiResponse<unknown> {
  status: false;
  errors: Array<{ field?: string; message: string }>;
}
