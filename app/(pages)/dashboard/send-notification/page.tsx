"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";

const SendNotificationPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

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

      <Input
        placeholder="آیدی کاربر (userId)"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

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
