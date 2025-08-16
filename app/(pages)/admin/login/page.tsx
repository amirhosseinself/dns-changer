"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/auth/login", { email, password });

      setLoading(false);

      if (res.data?.token) {
        // ذخیره JWT در localStorage یا cookie
        localStorage.setItem("token", res.data.token);

        // هدایت کاربر به داشبورد
        router.push("/admin/dashboard");
      } else {
        setError(res.data?.error || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        // بررسی وجود پیام خطا از سرور
        setError(
          err?.response?.data?.error || "An error occurred during login."
        );
      } else {
        setError("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm p-4">
        <CardHeader>
          <CardTitle className="text-center text-xl">ورود با ایمیل</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium mb-2">
                ایمیل
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="ltr"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                رمز عبور
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="ltr"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "درحال ورود..." : "ورود"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
