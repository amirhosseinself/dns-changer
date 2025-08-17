// prisma/seed.ts
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Our DNS providers data
const dnsProviders = [
  {
    name: "Google",
    ipv4: ["8.8.8.8", "8.8.4.4"],
    ipv6: ["2001:4860:4860::8888", "2001:4860:4860::8844"],
  },
  {
    name: "Cloudflare",
    ipv4: ["1.1.1.1", "1.0.0.1"],
    ipv6: ["2606:4700:4700::1111", "2606:4700:4700::1001"],
  },
  {
    name: "OpenDNS",
    ipv4: ["208.67.222.222", "208.67.220.220"],
    ipv6: ["2620:119:35::35", "2620:119:53::53"],
  },
  {
    name: "Quad9",
    ipv4: ["9.9.9.9", "149.112.112.112"],
    ipv6: ["2620:fe::fe", "2620:fe::9"],
  },
  {
    name: "Yandex",
    ipv4: ["77.88.8.8", "77.88.8.1"],
    ipv6: ["2a02:6b8::feed:0ff", "2a02:6b8:0:1::feed:0ff"],
  },
  {
    name: "Verisign",
    ipv4: ["64.6.64.6", "64.6.65.6"],
    ipv6: ["2620:74:1b::1:1", "2620:74:1c::2:2"],
  },
  {
    name: "G-Core",
    ipv4: ["95.85.95.85", "2.56.220.2", "2a03:90c0:999d::1"],
    ipv6: ["2a03:90c0:999d::1", "2a03:90c0:9992::1"],
  },
  {
    name: "OpenNIC",
    ipv4: [
      "134.195.4.2",
      "80.78.132.79",
      "51.77.149.139",
      "185.121.177.177",
      "169.239.202.202",
    ],
    ipv6: [
      "2604:ffc0::",
      "2a0d:2146:2404::1069",
      "2001:41d0:404:200:0:0:0:976",
    ],
  },
  {
    name: "AdGuard DNS",
    ipv4: ["94.140.14.14", "94.140.15.15"],
    ipv6: [
      "2a10:50c0::ad1:ff",
      "2a10:50c0::ad2:ff",
      "2a10:50c0::bad1:ff",
      "2a10:50c0::bad2:ff",
    ],
  },
  {
    name: "CleanBrowsing",
    ipv4: [
      "185.228.168.9",
      "185.228.169.9",
      "185.228.168.168",
      "185.228.169.168",
    ],
    ipv6: [
      "2a0d:2a00:1::2",
      "2a0d:2a00:2::2",
      "2a0d:2406:1801::",
      "2a0d:2406:1802::",
    ],
  },
  {
    name: "Control D",
    ipv4: ["76.76.2.0", "76.76.10.0", "198.101.242.72"],
    ipv6: [
      "2606:4700:4700::1111",
      "2606:4700:4700::1001",
      "2001:470:1f0f:1::2",
      "2001:470:1f0f:2::2",
    ],
  },
  {
    name: "Neustar",
    ipv4: ["64.6.64.6", "64.6.65.6", "156.154.70.1", "156.154.71.1"],
    ipv6: ["2620:74:1b::1:1", "2620:74:1c::2:2"],
  },
  {
    name: "Freenom World",
    ipv4: ["80.80.80.80", "80.80.81.81"],
    ipv6: ["2001:67c:28a4::1", "2001:67c:28a4::2"],
  },
  {
    name: "114DNS",
    ipv4: ["114.114.114.114", "114.114.115.115"],
    ipv6: ["240c::6666", "240c::6644"],
  },
  {
    name: "CFIEC",
    ipv4: ["240C::6666", "240C::6644"],
    ipv6: ["240C::6666", "240C::6644"],
  },
  {
    name: "Comodo Secure DNS",
    ipv4: ["8.26.56.26", "8.20.247.20"],
    ipv6: [],
  },
  {
    name: "UncensoredDNS",
    ipv4: ["91.239.100.100", "89.233.43.71"],
    ipv6: ["2001:67c:28a4::", "2a0d:2146:2404::1069"],
  },
  {
    name: "DNS0.EU",
    ipv4: ["193.110.81.0", "185.253.5.0", "193.110.81.254", "185.253.5.254"],
    ipv6: ["2a0f:fc80::", "2a0f:fc81::", "2a0f:fc80::ffff", "2a0f:fc81::ffff"],
  },
  {
    name: "Dyn (Oracle)",
    ipv4: ["216.146.35.35", "216.146.36.36"],
    ipv6: [],
  },
  {
    name: "Amazon Route 53",
    ipv4: ["205.251.192.0", "205.251.193.0"],
    ipv6: [],
  },
  {
    name: "Azure DNS",
    ipv4: ["168.63.129.16", "168.63.129.17"],
    ipv6: [],
  },
  {
    name: "Akamai Edge DNS",
    ipv4: ["23.218.0.1", "23.218.0.2"],
    ipv6: [],
  },
  {
    name: "DigitalOcean DNS",
    ipv4: ["167.71.0.1", "167.71.0.2"],
    ipv6: [],
  },
  {
    name: "No-IP",
    ipv4: ["64.90.182.55", "64.90.183.55"],
    ipv6: [],
  },
  {
    name: "Telindus DNS",
    ipv4: ["194.78.99.99", "194.78.100.100"],
    ipv6: [],
  },
  {
    name: "UltraDNS",
    ipv4: ["156.154.70.1", "156.154.71.1"],
    ipv6: [],
  },
  {
    name: "Alibaba Cloud DNS",
    ipv4: ["223.5.5.5", "223.6.6.6"],
    ipv6: [],
  },
  {
    name: "Oracle Cloud DNS",
    ipv4: ["137.254.0.1", "137.254.0.2"],
    ipv6: [],
  },
  {
    name: "EasyDNS",
    ipv4: ["198.41.192.2", "198.41.192.3"],
    ipv6: [],
  },
  {
    name: "Mullvad DNS",
    ipv4: ["194.242.2.2", "194.242.0.1", "10.8.0.1", "10.8.0.2"],
    ipv6: ["2a07:e340::2", "2a07:e340::1", "2a0d:2a00:1::1", "2a0d:2a00:1::2"],
  },
  {
    name: "Foundation for Applied Privacy",
    ipv4: ["146.255.56.98"],
    ipv6: ["2a01:4f8:c0c:83ed::1"],
  },
  {
    name: "NWPS.fi",
    ipv4: ["95.217.11.63", "135.181.103.31"],
    ipv6: ["2a01:4f9:c012:25a0::1", "2a01:4f9:c011:aa31::1"],
  },
  {
    name: "Lightning Wire Labs",
    ipv4: ["81.3.27.54"],
    ipv6: ["2001:678:b28::54"],
  },
  {
    name: "MSK-IX DNS Server",
    ipv4: ["62.76.76.62", "62.76.62.76"],
    ipv6: ["2001:6d0:6d0::2001", "2001:6d0:d6::2001"],
  },
  {
    name: "NSDI",
    ipv4: ["195.208.4.1", "195.208.5.1"],
    ipv6: ["2a0c:a9c7:8::1", "2a0c:a9c7:9::1"],
  },
  {
    name: "DNS.SB",
    ipv4: ["185.222.222.222", "45.11.45.11"],
    ipv6: ["2a09::", "2a11::"],
  },
  {
    name: "NextDNS",
    ipv4: ["5.182.208.0"],
    ipv6: ["2a0d:2406:1801::"],
  },
  {
    name: "Level3",
    ipv4: ["209.244.0.3", "209.244.0.4"],
    ipv6: [],
  },
  {
    name: "Hurricane Electric",
    ipv4: ["74.82.42.42"],
    ipv6: [],
  },
  {
    name: "DNS.WATCH",
    ipv4: ["84.200.69.80", "84.200.70.40"],
    ipv6: [],
  },
  {
    name: "SafeDNS",
    ipv4: ["195.46.39.39", "195.46.39.40"],
    ipv6: [],
  },
  {
    name: "FreeDNS",
    ipv4: ["37.235.1.174", "37.235.1.177"],
    ipv6: [],
  },
  {
    name: "Alternate DNS",
    ipv4: ["76.76.19.19", "76.223.122.150", "198.101.242.72", "23.253.163.53"],
    ipv6: ["2602:fcbc::ad", "2602:fcbc:2::ad"],
  },
  {
    name: "OpenDNS FamilyShield",
    ipv4: ["208.67.222.123", "208.67.220.123"],
    ipv6: ["2620:119:35::123", "2620:119:53::123"],
  },
  {
    name: "OpenDNS Sandbox",
    ipv4: ["208.67.222.220", "208.67.220.222"],
    ipv6: ["2620:0:ccc::2", "2620:0:ccd::2"],
  },
  {
    name: "شکن",
    ipv4: ["178.22.122.100", "185.51.200.2"],
    ipv6: [],
  },
  {
    name: "۴۰۳",
    ipv4: ["10.202.10.102", "10.202.10.202"],
    ipv6: [],
  },
  {
    name: "رادار",
    ipv4: ["10.202.10.10", "10.202.10.11"],
    ipv6: [],
  },
  {
    name: "بگذر",
    ipv4: ["185.55.226.26", "185.55.225.25"],
    ipv6: [],
  },
  {
    name: "آسیاتک",
    ipv4: ["194.36.174.161", "178.22.122.100"],
    ipv6: [],
  },
  {
    name: "پارس آنلاین",
    ipv4: ["99.101.12.1", "99.101.12.2"],
    ipv6: [],
  },
  {
    name: "پیشگامان",
    ipv4: ["202.100.101.101", "202.100.101.102"],
    ipv6: [],
  },
  {
    name: "رسانه پرداز سپاهان",
    ipv4: ["186.242.161.1", "186.242.161.2"],
    ipv6: [],
  },
  {
    name: "شاتل موبایل",
    ipv4: ["91.239.100.100", "89.233.43.71"],
    ipv6: [],
  },
  {
    name: "ایرانسل",
    ipv4: ["109.69.8.51", "0.0.0.0"],
    ipv6: [],
  },
  {
    name: "همراه اول",
    ipv4: ["208.67.220.200", "208.67.222.222"],
    ipv6: [],
  },
  {
    name: "رایتل",
    ipv4: ["91.239.100.100", "89.233.43.71"],
    ipv6: [],
  },
  {
    name: "مخابرات",
    ipv4: ["217.218.155.155", "217.218.127.127"],
    ipv6: [],
  },
  {
    name: "Baidu DNS",
    ipv4: ["180.76.76.76"],
    ipv6: [],
  },
  {
    name: "Alibaba DNS",
    ipv4: ["223.5.5.5", "223.6.6.6"],
    ipv6: [],
  },
  {
    name: "Tencent DNS",
    ipv4: ["120.53.53.198"],
    ipv6: [],
  },
  {
    name: "China Telecom DNS",
    ipv4: ["202.101.98.55"],
    ipv6: [],
  },
  {
    name: "China Unicom DNS",
    ipv4: ["202.101.98.55"],
    ipv6: [],
  },
  {
    name: "China Mobile DNS",
    ipv4: ["211.138.145.194"],
    ipv6: [],
  },
  {
    name: "China Education Network DNS",
    ipv4: ["202.112.144.30"],
    ipv6: [],
  },
  {
    name: "China Science and Technology Network DNS",
    ipv4: ["159.226.8.6"],
    ipv6: [],
  },
  {
    name: "DigitalCourage",
    ipv4: [],
    ipv6: ["2a02:2970:1002::18"],
  },
  {
    name: "Hetzner Online",
    ipv4: [],
    ipv6: ["2a01:4f8:151:34aa::198"],
  },
  {
    name: "Probe Networks",
    ipv4: [],
    ipv6: ["2a01:4f8:141:316d::117"],
  },
  {
    name: "Deutsche Telekom",
    ipv4: [],
    ipv6: ["2001:1608:10:25::1c04:b12f"],
  },
  {
    name: "diva-e Datacenters",
    ipv4: [],
    ipv6: ["2a0d:2406:1801::"],
  },
  {
    name: "Contabo GmbH",
    ipv4: [],
    ipv6: ["2a01:4f8:1c1e:a6a8::1", "2a01:4f8:c010:b4fc::1"],
  },
  {
    name: "Doruk",
    ipv4: ["78.135.102.232"],
    ipv6: ["2a02:2f0f:2::2"],
  },
  {
    name: "Superonline",
    ipv4: ["213.153.224.29"],
    ipv6: ["2a02:2f0f:2::3"],
  },
  {
    name: "TTNet",
    ipv4: ["78.186.191.171"],
    ipv6: ["2a02:2f0f:2::4"],
  },
  {
    name: "Cizgi Telekom",
    ipv4: ["94.73.156.76"],
    ipv6: ["2a02:2f0f:2::5"],
  },
  {
    name: "Teknet",
    ipv4: ["31.7.36.36"],
    ipv6: ["2a02:2f0f:2::6"],
  },
  {
    name: "Ooredoo Oman",
    ipv4: ["188.135.60.222", "91.132.64.87"],
    ipv6: [],
  },
  {
    name: "Awaser Oman",
    ipv4: ["89.147.180.107"],
    ipv6: [],
  },
  {
    name: "Oman Telecommunications Company",
    ipv4: ["134.0.202.105"],
    ipv6: [],
  },
  {
    name: "Akamai Vantio CacheServe",
    ipv4: ["46.40.245.248"],
    ipv6: [],
  },
  {
    name: "Emirates Integrated Telecommunications Company",
    ipv4: ["94.206.42.74", "94.206.47.14"],
    ipv6: [],
  },
  {
    name: "Emirates Telecommunications Corporation",
    ipv4: [
      "213.42.43.226",
      "213.42.52.22",
      "94.56.151.22",
      "213.42.20.20",
      "195.229.241.222",
      "5.193.214.223",
      "5.32.55.10",
      "87.201.133.18",
      "94.200.137.30",
      "91.74.90.206",
      "94.206.42.82",
      "91.72.184.234",
      "91.72.185.26",
      "91.73.167.42",
      "91.74.88.86",
      "87.201.133.74",
      "94.200.81.142",
      "80.227.38.26",
      "94.205.245.133",
      "94.200.113.238",
      "94.206.42.74",
      "94.200.80.94",
      "80.227.67.106",
      "94.200.113.250",
      "5.193.137.249",
      "80.227.67.30",
      "217.164.255.36",
      "5.32.90.30",
      "87.201.133.14",
      "94.205.212.140",
      "20.203.17.58",
      "94.205.51.210",
      "94.205.52.106",
    ],
    ipv6: [],
  },
  {
    name: "Saudi Telecom Company",
    ipv4: ["94.97.253.127"],
    ipv6: ["2001:16a0:6000:4001::11"],
  },
  {
    name: "Etihad Etisalat",
    ipv4: ["86.51.39.250"],
    ipv6: [],
  },
  {
    name: "Integrated Telecom Company",
    ipv4: ["5.42.254.85"],
    ipv6: [],
  },
  {
    name: "Ooredoo Qatar",
    ipv4: [
      "178.153.15.79",
      "89.211.60.76",
      "78.100.236.124",
      "78.101.157.63",
      "78.101.71.168",
      "37.210.226.217",
      "37.211.150.188",
      "78.101.73.142",
    ],
    ipv6: [],
  },
  {
    name: "Qatar Telecom",
    ipv4: ["94.200.113.238"],
    ipv6: [],
  },
  {
    name: "Batelco",
    ipv4: [
      "89.148.55.251",
      "77.69.238.215",
      "77.69.141.243",
      "84.255.173.210",
      "77.69.233.71",
    ],
    ipv6: [],
  },
  {
    name: "ViaCloud Telecom",
    ipv4: ["87.252.99.92"],
    ipv6: [],
  },
  {
    name: "STC Bahrain",
    ipv4: ["37.131.7.83"],
    ipv6: [],
  },
  {
    name: "Kalaam Telecom",
    ipv4: ["81.22.26.6"],
    ipv6: [],
  },
  {
    name: "Amazon EC2",
    ipv4: ["15.184.149.131", "157.175.242.142", "157.175.58.241"],
    ipv6: [],
  },
  {
    name: "Bezeq International",
    ipv4: ["82.80.232.24", "82.80.219.220"],
    ipv6: [],
  },
  {
    name: "Partner Communications",
    ipv4: ["213.8.5.220", "213.8.161.189"],
    ipv6: [],
  },
  {
    name: "Cellcom",
    ipv4: ["212.235.99.195", "212.143.39.198"],
    ipv6: [],
  },
  {
    name: "012 Smile",
    ipv4: ["80.179.88.82", "80.179.226.56"],
    ipv6: [],
  },
  {
    name: "Orange Israel",
    ipv4: ["2.55.96.176", "2.55.108.39"],
    ipv6: [],
  },
  {
    name: "Cybernet",
    ipv4: ["59.103.138.68"],
    ipv6: [],
  },
  {
    name: "Multinet Pakistan",
    ipv4: ["59.103.243.83"],
    ipv6: [],
  },
  {
    name: "Wateen Telecom",
    ipv4: ["110.38.74.58"],
    ipv6: [],
  },
  {
    name: "Connect Communications",
    ipv4: ["118.103.236.13"],
    ipv6: [],
  },
  {
    name: "Comsats Internet Services",
    ipv4: ["210.56.8.8"],
    ipv6: [],
  },
  {
    name: "CubeXS",
    ipv4: ["202.63.197.114"],
    ipv6: [],
  },
  {
    name: "National Telecommunication Corporation",
    ipv4: ["202.83.175.188"],
    ipv6: [],
  },
  {
    name: "KK Networks Pvt Ltd",
    ipv4: ["103.155.62.8"],
    ipv6: [],
  },
  {
    name: "MIAN SIDDIQUE NETWORKS PRIVATE LIMITED",
    ipv4: ["103.152.101.135"],
    ipv6: [],
  },
  {
    name: "GERRYS INFORMATION TECHNOLOGY PVT LTD",
    ipv4: ["202.166.171.254"],
    ipv6: [],
  },
  {
    name: "KPN",
    ipv4: ["193.78.240.12", "193.78.240.13"],
    ipv6: [],
  },
  {
    name: "VodafoneZiggo",
    ipv4: ["213.125.136.58", "213.125.136.59"],
    ipv6: [],
  },
  {
    name: "T-Mobile Netherlands",
    ipv4: ["87.213.100.113", "87.213.100.114"],
    ipv6: [],
  },
  {
    name: "DNS0.eu",
    ipv4: ["185.107.232.232", "185.107.232.233"],
    ipv6: ["2a13:1001::86:54:11:1", "2a13:1001::86:54:11:201"],
  },
];

async function main() {
  for (const provider of dnsProviders) {
    // Insert IPv4 records
    for (let i = 0; i < provider.ipv4.length; i++) {
      await prisma.dnsRecord.create({
        data: {
          label: provider.name,
          ip1: provider.ipv4[i],
          ip2: provider.ipv4[i + 1] ?? null, // اگر آی‌پی بعدی باشه بذاریم تو ip2
          type: "IPv4",
        },
      });
      break; // چون ما ip1 و ip2 رو گرفتیم، از حلقه بیرون میایم
    }

    // Insert IPv6 records
    for (let i = 0; i < provider.ipv6.length; i++) {
      await prisma.dnsRecord.create({
        data: {
          label: provider.name,
          ip1: provider.ipv6[i],
          ip2: provider.ipv6[i + 1] ?? null,
          type: "IPv6",
        },
      });
      break;
    }
  }
}

main()
  .then(async () => {
    console.log("✅ DNS Records seeded successfully!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seeding DNS Records:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
