import axios from "axios";
import { DnsRecord } from "@prisma/client";

export const getDnsRecords = async (type?: string): Promise<DnsRecord[]> => {
  const url = type && type !== "ALL" ? `/api/dns?type=${type}` : `/api/dns`;
  const res = await axios.get(url);
  return res.data.data; // Accessing the actual data array
};

export const deleteDnsRecord = async (id: string) => {
  return axios.delete(`/api/dns/${id}`);
};

export const updateDnsRecord = async (dns: DnsRecord) => {
  return axios.patch(`/api/dns/${dns.id}`, dns);
};
