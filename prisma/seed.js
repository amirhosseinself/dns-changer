// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient, DnsType } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.dnsRecord.createMany({
    data: [
      {
        label: "DNS 1",
        ip1: "3.33.242.199",
        ip2: "15.197.238.60",
        type: DnsType.GENERAL,
      },
      {
        label: "OpenDNS",
        ip1: "208.67.222.220",
        ip2: "8.20.247.20",
        type: DnsType.GENERAL,
      },
      {
        label: "رادار",
        ip1: "10.202.10.10",
        ip2: "10.202.10.11",
        type: DnsType.RADAR,
      },
      {
        label: "403 سامانه",
        ip1: "10.202.10.202",
        ip2: "10.202.10.102",
        type: DnsType.OTHER,
      },
      {
        label: "بگذر",
        ip1: "185.55.226.26",
        ip2: "185.55.225.25",
        type: DnsType.OTHER,
      },
      {
        label: "شکن",
        ip1: "178.22.122.100",
        ip2: "185.51.200.2",
        type: DnsType.SHEKAN,
      },
      {
        label: "کلودفلر",
        ip1: "1.1.1.1",
        ip2: "1.0.0.1",
        type: DnsType.GENERAL,
      },
      {
        label: "گوگل",
        ip1: "8.8.8.8",
        ip2: "8.8.4.4",
        type: DnsType.GENERAL,
      },
      {
        label: "اوپن دی ان اس",
        ip1: "208.67.222.222",
        ip2: "208.67.220.220",
        type: DnsType.GENERAL,
      },
      {
        label: "یاندکس",
        ip1: "77.88.8.8",
        ip2: "77.88.8.1",
        type: DnsType.GENERAL,
      },
      {
        label: "DNS IPv6",
        ip1: "2001:4860:4860::8888",
        ip2: "2001:4860:4860::8844",
        type: DnsType.IPV6,
      },
      {
        label: "Cloudflare",
        ip1: "1.1.1.1",
        ip2: "1.0.0.1",
        type: DnsType.GENERAL,
      },
      {
        label: "Google",
        ip1: "8.8.8.8",
        ip2: "8.8.4.4",
        type: DnsType.GENERAL,
      },
      {
        label: "OpenDNS",
        ip1: "208.67.222.222",
        ip2: "208.67.220.220",
        type: DnsType.GENERAL,
      },
      {
        label: "Quad9",
        ip1: "9.9.9.9",
        ip2: "149.112.112.112",
        type: DnsType.GENERAL,
      },
      {
        label: "Yandex",
        ip1: "77.88.8.8",
        ip2: "77.88.8.1",
        type: DnsType.GENERAL,
      },
      {
        label: "G-Core Labs",
        ip1: "95.85.95.85",
        ip2: "2a03:90c0:999d::1",
        type: DnsType.GENERAL,
      },
      {
        label: "Verisign",
        ip1: "64.6.64.6",
        ip2: "64.6.65.6",
        type: DnsType.GENERAL,
      },
      {
        label: "OpenNIC",
        ip1: "134.195.4.2",
        ip2: "80.78.132.79",
        type: DnsType.GENERAL,
      },
      {
        label: "AdGuard DNS",
        ip1: "94.140.14.14",
        ip2: "94.140.15.15",
        type: DnsType.GENERAL,
      },
      {
        label: "CleanBrowsing",
        ip1: "185.228.168.9",
        ip2: "185.228.169.9",
        type: DnsType.GENERAL,
      },
      {
        label: "Control D",
        ip1: "76.76.2.0",
        ip2: "76.76.10.0",
        type: DnsType.GENERAL,
      },
      {
        label: "Neustar",
        ip1: "64.6.64.6",
        ip2: "64.6.65.6",
        type: DnsType.GENERAL,
      },
      {
        label: "Freenom World",
        ip1: "80.80.80.80",
        ip2: "80.80.81.81",
        type: DnsType.GENERAL,
      },
      {
        label: "114DNS",
        ip1: "114.114.114.114",
        ip2: "114.114.115.115",
        type: DnsType.GENERAL,
      },
      {
        label: "CFIEC Public DNS",
        ip1: "240C::6666",
        ip2: "240C::6644",
        type: DnsType.GENERAL,
      },
      {
        label: "Comodo Secure DNS",
        ip1: "8.26.56.26",
        ip2: "8.20.247.20",
        type: DnsType.GENERAL,
      },
      {
        label: "CDNetworks DNS",
        ip1: "8.8.8.8",
        ip2: "8.8.4.4",
        type: DnsType.GENERAL,
      },
      {
        label: "UncensoredDNS",
        ip1: "91.239.100.100",
        ip2: "89.233.43.71",
        type: DnsType.GENERAL,
      },
      {
        label: "DNS0.EU",
        ip1: "193.110.81.0",
        ip2: "185.253.5.0",
        type: DnsType.GENERAL,
      },
      {
        label: "Dyn (Oracle)",
        ip1: "216.146.35.35",
        ip2: "216.146.36.36",
        type: DnsType.GENERAL,
      },
      {
        label: "Amazon Route 53",
        ip1: "205.251.192.0",
        ip2: "205.251.193.0",
        type: DnsType.GENERAL,
      },
      {
        label: "Azure DNS",
        ip1: "168.63.129.16",
        ip2: "168.63.129.17",
        type: DnsType.GENERAL,
      },
      {
        label: "Akamai Edge DNS",
        ip1: "23.218.0.1",
        ip2: "23.218.0.2",
        type: DnsType.GENERAL,
      },
      {
        label: "DigitalOcean DNS",
        ip1: "167.71.0.1",
        ip2: "167.71.0.2",
        type: DnsType.GENERAL,
      },
      {
        label: "No-IP",
        ip1: "64.90.182.55",
        ip2: "64.90.183.55",
        type: DnsType.GENERAL,
      },
      {
        label: "Telindus DNS",
        ip1: "194.78.99.99",
        ip2: "194.78.100.100",
        type: DnsType.GENERAL,
      },
      {
        label: "UltraDNS",
        ip1: "156.154.70.1",
        ip2: "156.154.71.1",
        type: DnsType.GENERAL,
      },
      {
        label: "Alibaba Cloud DNS",
        ip1: "223.5.5.5",
        ip2: "223.6.6.6",
        type: DnsType.GENERAL,
      },
      {
        label: "Oracle Cloud DNS",
        ip1: "137.254.0.1",
        ip2: "137.254.0.2",
        type: DnsType.GENERAL,
      },
      {
        label: "Mullvad DNS",
        ip1: "194.242.2.2",
        ip2: "194.242.0.1",
        type: DnsType.GENERAL,
      },
      {
        label: "Foundation for Applied Privacy",
        ip1: "146.255.56.98",
        ip2: "",
        type: DnsType.GENERAL,
      },
    ],
  });

  console.log("✅ DNS data seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
