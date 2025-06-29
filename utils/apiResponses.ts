import { SuccessResponse, ErrorResponse } from "@/types/api";

/**
 * Generate a success response.
 * @param data - The data to include in the response.
 * @param message - Optional success message.
 * @returns SuccessResponse
 */
export function successResponse<T>(
  data: T,
  message: string = "Success"
): SuccessResponse<T> {
  return {
    status: true,
    errorCode: null,
    message,
    data,
  };
}

/**
 * Generate an error response.
 * @param errors - Array of error objects (e.g., { field: string; message: string }).
 * @param message - Optional error message.
 * @param errorCode - Optional error code for further debugging.
 * @returns ErrorResponse
 */
export function errorResponse(
  errors: Array<{ field?: string; message: string }> = [],
  message: string = "Error",
  errorCode: number | null = 1
): ErrorResponse {
  return {
    status: false,
    errorCode,
    message,
    data: {},
    errors,
  };
}
