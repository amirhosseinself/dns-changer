import { AxiosError } from "axios";
import { apiClient } from "./apiClient";

// تایپ داده ورودی و خروجی تابع
interface PostSendOtpProps {
  phoneNumber: string;
}

// تابع برای ارسال OTP
const postSendOtp = async ({ phoneNumber }: PostSendOtpProps) => {
  const url = "/auth/send-otp";

  try {
    const { data, status } = await apiClient.post(url, { phoneNumber });
    console.log("[postSendOtp] Response:", data, status);

    if (status === 200) {
      return { status: true, data };
    } else {
      console.error("[postSendOtp] Error:", data);
      return { status: false, data };
    }
  } catch (err) {
    const error = err as AxiosError;
    console.error("[postSendOtp] Axios error:", error.message);
    return {
      status: false,
      message: error.message || "An error occurred while sending OTP",
    };
  }
};

export default postSendOtp;
