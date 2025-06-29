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
        label: "الکترو",
        ip1: "78.157.42.100",
        ip2: "78.157.42.101",
        type: DnsType.GENERAL,
      },
      {
        label: "هاستیران",
        ip1: "172.29.2.100",
        ip2: "172.29.2.100",
        type: DnsType.GENERAL,
      },
      {
        label: "گیمینگ",
        ip1: "78.157.42.100",
        ip2: "185.43.135.1",
        type: DnsType.GAMING,
      },
      {
        label: "گیمینگ 2",
        ip1: "156.154.70.1",
        ip2: "156.154.71.1",
        type: DnsType.GAMING,
      },
      {
        label: "مخابرات / آسیاتک / رایتل",
        ip1: "91.239.100.100",
        ip2: "89.233.43.71",
        type: DnsType.TELECOM,
      },
      {
        label: "همراه اول",
        ip1: "208.67.220.200",
        ip2: "208.67.222.222",
        type: DnsType.HAMRAHAVAL,
      },
      {
        label: "ایرانسل",
        ip1: "109.69.8.51",
        ip2: "0.0.0.0",
        type: DnsType.IRANCELL,
      },
      {
        label: "ایرانسل 2",
        ip1: "74.82.42.42",
        ip2: "0.0.0.0",
        type: DnsType.IRANCELL,
      },
      {
        label: "مخابرات",
        ip1: "8.8.8.8",
        ip2: "8.8.4.4",
        type: DnsType.TELECOM,
      },
      {
        label: "مخابرات 2",
        ip1: "195.46.39.39",
        ip2: "195.46.39.40",
        type: DnsType.TELECOM,
      },
      {
        label: "مبین نت",
        ip1: "10.44.8.8",
        ip2: "8.8.8.8",
        type: DnsType.TELECOM,
      },
      {
        label: "سایر اپراتورها",
        ip1: "199.85.127.10",
        ip2: "199.85.126.10",
        type: DnsType.OTHER,
      },
      {
        label: "DNS اختصاصی",
        ip1: "94.207.17.51",
        ip2: "185.212.50.212",
        type: DnsType.OTHER,
      },
      {
        label: "IPv6 DNS",
        ip1: "2a02:2ae8:e566:da56:f033:ad45:a37c:ea59",
        ip2: "2a02:2ae8:f5e7:dcc3:9174:31f4:9212:32d1",
        type: DnsType.IPV6,
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
