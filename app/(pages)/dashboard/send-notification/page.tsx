"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
  id: string;
  name: string;
  email: string;
}

const SendNotificationPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/admin/users");
        setUsers(data);
      } catch (error) {
        toast.error("خطا در دریافت لیست کاربران");
        console.error("Error fetching users:", error);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSend = async () => {
    if (!title || !body || !userId) {
      toast.error("لطفاً تمام فیلدها را کامل کنید.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/fcm/send", {
        title,
        body,
        userId,
      });

      toast.success("نوتیفیکیشن با موفقیت ارسال شد.");
      setTitle("");
      setBody("");
      setUserId("");
    } catch (error) {
      console.error(error);
      toast.error("ارسال نوتیفیکیشن با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl pt-16 space-y-6">
      <h1 className="text-2xl font-semibold">ارسال نوتیفیکیشن</h1>

      {/* Select User */}
      {usersLoading ? (
        <Skeleton className="h-10 w-full rounded-md" />
      ) : (
        <Select value={userId} onValueChange={(value) => setUserId(value)}>
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کاربر" />
          </SelectTrigger>
          <SelectContent>
            {users.length === 0 ? (
              <div className="text-sm text-muted-foreground px-4 py-2">
                هیچ کاربری یافت نشد
              </div>
            ) : (
              users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name || user.email}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      )}

      <Input
        placeholder="عنوان نوتیفیکیشن"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="متن پیام نوتیفیکیشن"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <Button onClick={handleSend} disabled={loading}>
        {loading ? "در حال ارسال..." : "ارسال نوتیفیکیشن"}
      </Button>
    </div>
  );
};

export default SendNotificationPage;
