import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;

  await resend.emails.send({
    from: "no-reply@yourdomain.com", // یا دامنه تأیید شده
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Welcome 🎉</h2>
      <p>Click below to verify your email:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
    `,
  });
}
