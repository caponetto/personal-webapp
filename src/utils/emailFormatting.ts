export function obfuscateEmailAddress(email: string): string {
  const [localPart = "", domainPart = ""] = email.split("@");
  return `${localPart} [at] ${domainPart.split(".").join(" [dot] ")}`.trim();
}
