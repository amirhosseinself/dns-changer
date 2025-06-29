"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DnsType } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function DnsForm() {
  const [form, setForm] = useState({
    label: "",
    ip1: "",
    ip2: "",
    type: "GENERAL",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!form.label || !form.ip1 || !form.ip2) {
      toast.error("همه فیلدها باید پر شوند");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/dns", form);
      toast.success("DNS با موفقیت اضافه شد");
      setForm({ label: "", ip1: "", ip2: "", type: "GENERAL" });
      router.refresh();
    } catch (err) {
      console.error("Error adding DNS:", err);
      toast.error("خطا در افزودن DNS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white dark:bg-gray-900 shadow">
      <Input
        placeholder="عنوان (مثلاً DNS - شکن)"
        value={form.label}
        onChange={(e) => setForm({ ...form, label: e.target.value })}
      />
      <Input
        placeholder="IP اول"
        value={form.ip1}
        onChange={(e) => setForm({ ...form, ip1: e.target.value })}
      />
      <Input
        placeholder="IP دوم"
        value={form.ip2}
        onChange={(e) => setForm({ ...form, ip2: e.target.value })}
      />
      <select
        className="border rounded p-2 w-full"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="" disabled>
          انتخاب نوع DNS
        </option>
        {Object.values(DnsType).map((type) => (
          <option key={type} value={type}>
            {getTypeLabel(type)}
          </option>
        ))}
      </select>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "در حال افزودن..." : "افزودن DNS"}
      </Button>
    </div>
  );
}

function getTypeLabel(type: string) {
  const labels: Record<string, string> = {
    GENERAL: "عمومی",
    RADAR: "رادار",
    SHEKAN: "شکن",
    IRANCELL: "ایرانسل",
    HAMRAHAVAL: "همراه اول",
    GAMING: "گیمینگ",
    TELECOM: "مخابرات",
    OTHER: "سایر",
    IPV6: "IPv6",
    GOOGLE: "گوگل",
  };
  return labels[type] || type;
}
