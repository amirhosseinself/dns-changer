import { AxiosError } from "axios";
import { apiClient } from "./apiClient";
import type { SuccessResponse, ErrorResponse } from "@/types/api";

// تعریف تایپ اطلاعات کاربر
export interface UpdatedUser {
  id: string;
  phoneNumber: string;
  userName: string | null;
  fullName: string | null;
  profilePic: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

interface postUpdateUserInfoProps {
  updatingData: {
    userName: string;
    fullName: string;
    bio: string;
  };
}

const postUpdateUserInfo = async ({
  updatingData,
}: postUpdateUserInfoProps): Promise<
  SuccessResponse<UpdatedUser> | ErrorResponse
> => {
  const url = "/user/update-info";

  try {
    const { data, status } = await apiClient.put(url, {
      fullName: updatingData.fullName,
      userName: updatingData.userName,
      bio: updatingData.bio,
    });
    console.log("[postUpdateUserInfo] Response:", data, status);

    if (status === 200) {
      // فرض بر این است که ساختار داده دریافتی به صورت { status, errorCode, message, data } است.
      return {
        status: true,
        errorCode: null,
        data: data.data, // اینجا داده واقعی کاربر رو بر اساس تایپ UpdatedUser قرار می‌دهیم
      } as SuccessResponse<UpdatedUser>;
    } else {
      console.error("[postUpdateUserInfo] Error:", data);
      return {
        status: false,
        errorCode: data.errorCode || -1,
        message: data.message,
        data: null,
        errors: data.errors || [{ message: "An error occurred" }],
      } as ErrorResponse;
    }
  } catch (err) {
    const error = err as AxiosError;
    console.error("[postUpdateUserInfo] Axios error:", error.message);
    return {
      status: false,
      errorCode: -1,
      message: error.message || "An error occurred while sending OTP",
      data: null,
      errors: [
        { message: error.message || "An error occurred while sending OTP" },
      ],
    } as ErrorResponse;
  }
};

export default postUpdateUserInfo;
