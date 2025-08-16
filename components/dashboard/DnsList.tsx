"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getDnsRecords,
  deleteDnsRecord,
  updateDnsRecord,
} from "@/services/api/dnsService";
import { DnsRecord, DnsType } from "@prisma/client";

const types = ["ALL", ...Object.values(DnsType)] as const;

export default function DnsList() {
  const [dnsList, setDnsList] = useState<DnsRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [currentDns, setCurrentDns] = useState<DnsRecord | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const records = await getDnsRecords(filter);
      setDnsList(records);
    } catch (error) {
      console.error("Error fetching DNS records:", error);
      toast.error("خطا در دریافت داده‌ها");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = (dns: DnsRecord) => {
    setCurrentDns(dns);
  };

  const handleSave = async (updatedDns: DnsRecord) => {
    try {
      await updateDnsRecord(updatedDns);
      toast.success("رکورد با موفقیت ویرایش شد");
      fetchData();
    } catch {
      toast.error("خطا در ویرایش رکورد");
    }
  };

  async function handleDelete(id: string) {
    if (!confirm("آیا مطمئنی؟")) return;
    try {
      await deleteDnsRecord(id);
      toast.success("رکورد حذف شد");
      fetchData();
    } catch {
      toast.error("خطا در حذف رکورد");
    }
  }

  return (
    <div>
      {/* Filter Buttons */}
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

      {/* Loading Indicator */}
      {loading && <p className="text-center my-4">در حال بارگذاری...</p>}

      {/* DNS Records */}
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

            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={() => handleDelete(dns.id)}
              >
                حذف
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => handleEdit(dns)}>
                    ویرایش
                  </Button>
                </DialogTrigger>

                {currentDns?.id === dns.id && (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>ویرایش رکورد DNS</DialogTitle>
                      <DialogDescription>
                        اطلاعات رکورد DNS را ویرایش کنید.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSave(currentDns);
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label>برچسب</label>
                        <input
                          className="w-full border rounded px-2 py-1"
                          type="text"
                          value={currentDns.label}
                          onChange={(e) =>
                            setCurrentDns((prev) => ({
                              ...prev!,
                              label: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label>IP1</label>
                        <input
                          className="w-full border rounded px-2 py-1"
                          type="text"
                          value={currentDns.ip1}
                          onChange={(e) =>
                            setCurrentDns((prev) => ({
                              ...prev!,
                              ip1: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label>IP2</label>
                        {currentDns.ip2 ? (
                          <input
                            className="w-full border rounded px-2 py-1"
                            type="text"
                            value={currentDns.ip2}
                            onChange={(e) =>
                              setCurrentDns((prev) => ({
                                ...prev!,
                                ip2: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          <input
                            className="w-full border rounded px-2 py-1"
                            type="text"
                            value={currentDns.ip2 || ""}
                            onChange={(e) =>
                              setCurrentDns((prev) => ({
                                ...prev!,
                                ip2: e.target.value,
                              }))
                            }
                          />
                        )}
                      </div>
                      <div>
                        <label>نوع</label>
                        <select
                          className="w-full border rounded px-2 py-1"
                          value={currentDns.type}
                          onChange={(e) =>
                            setCurrentDns((prev) => ({
                              ...prev!,
                              type: e.target.value as DnsType, // 👈 fix here
                            }))
                          }
                        >
                          {types.map((type) => (
                            <option key={type} value={type}>
                              {getTypeLabel(type)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <Button type="submit" className="w-full">
                        ذخیره تغییرات
                      </Button>
                    </form>
                  </DialogContent>
                )}
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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
