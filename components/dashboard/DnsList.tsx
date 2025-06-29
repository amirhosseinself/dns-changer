"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

interface DnsRecord {
  id: string;
  label: string;
  ip1: string;
  ip2: string;
  type: string;
}

const types = [
  "ALL",
  "GENERAL",
  "RADAR",
  "SHEKAN",
  "IRANCELL",
  "HAMRAHAVAL",
  "GAMING",
  "TELECOM",
  "OTHER",
  "IPV6",
  "GOOGLE",
];

export default function DnsList() {
  const [dnsList, setDnsList] = useState<DnsRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("ALL");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const url = filter !== "ALL" ? `/api/dns?type=${filter}` : "/api/dns";
      const res = await axios.get(url);
      setDnsList(res.data);
    } catch {
      toast.error("خطا در دریافت داده‌ها");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {types.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={filter === t ? "default" : "outline"}
            onClick={() => setFilter(t)}
          >
            {getTypeLabel(t)}
          </Button>
        ))}
      </div>

      {loading && <p className="text-center my-4">در حال بارگذاری...</p>}

      <div className="space-y-4">
        {dnsList.map((dns) => (
          <div
            key={dns.id}
            className="p-4 rounded-lg shadow bg-white dark:bg-gray-900 border dark:border-gray-700 flex justify-between items-center"
          >
            <div>
              <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {dns.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {dns.ip1} | {dns.ip2}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {getTypeLabel(dns.type)}
              </div>
            </div>
            <Button variant="destructive" onClick={() => handleDelete(dns.id)}>
              حذف
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  async function handleDelete(id: string) {
    if (!confirm("آیا مطمئنی؟")) return;
    try {
      await axios.delete(`/api/dns/${id}`);
      toast.success("رکورد حذف شد");
      fetchData();
    } catch {
      toast.error("خطا در حذف رکورد");
    }
  }
}

function getTypeLabel(type: string) {
  const labels: Record<string, string> = {
    ALL: "همه",
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
