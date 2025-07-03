function getTypeLabel(type: string): string {
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

export default getTypeLabel;
