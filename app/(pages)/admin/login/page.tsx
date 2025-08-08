"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import postSendOtp from "@/services/api/postSendOtp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const router = useRouter();

  const handleSendOtp = async () => {
    setError(null);
    if (!phoneNumber.match(/^09\d{9}$/)) {
      setError("Please enter a valid 11-digit phone number starting with 09.");
      return;
    }

    setLoading(true);
    const res = await postSendOtp({ phoneNumber });
    setLoading(false);

    if (res?.status && res.data) {
      // OTP sent successfully, go to OTP step
      console.log("OTP sent successfully");
      setStep("otp");
    } else {
      // Handling error response
      const errorMessage = res?.message || "Failed to send OTP";
      setError(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await axios.post("/api/auth/validate-otp", {
        phoneNumber,
        otpCode,
      });

      setLoading(false);
      if (result?.data?.status === false) {
        // اگر ریسپانس شامل خطا باشد، می‌توانید از message یا errors استفاده کنید.
        setError(result?.data?.message || "Invalid OTP or phone number");
        console.log(result?.data);
        // اگر errors وجود داشته باشد، می‌توانید از آن برای نمایش خطای جزئی‌تر استفاده کنید.
        if (result?.data?.errors?.length) {
          const errorMessages = result?.data?.errors
            .map((err: { message: string }) => err.message)
            .join(", ");
          setError(errorMessages);
        }
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        // برای خطاهای ناشی از axios
        setError(
          error?.response?.data?.message ||
            "An error occurred while logging in."
        );
        if (error?.response?.data?.errors?.length) {
          const errorMessages = error?.response?.data?.errors
            .map((err: { message: string }) => err.message)
            .join(", ");
          setError(errorMessages);
        }
      } else {
        // برای خطاهای دیگر (مثلاً مشکلات شبکه)
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm p-4">
        <CardHeader>
          <CardTitle className="text-center text-xl">ورود</CardTitle>
        </CardHeader>
        <CardContent>
          {step === "phone" && (
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <Label
                  htmlFor="phone-number"
                  className="block text-sm font-medium mb-2"
                >
                  شماره تلفن
                </Label>
                <Input
                  id="phone-number"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="09xxxxxxxxx"
                  className="ltr"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full"
              >
                {loading ? "درحال ارسال..." : "ارسال OTP"}
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="otp-code"
                  className="block text-sm font-medium mb-2"
                >
                  کد ارسال شده
                </Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    className="flex justify-center space-x-2"
                    onChange={(value) => setOtpCode(value)}
                  >
                    <InputOTPGroup className="ltr">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "درحال ورود..." : "ورود"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
