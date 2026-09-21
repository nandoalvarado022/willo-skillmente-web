import nodemailer from "nodemailer";
import type { SendMailOptions, Transporter } from "nodemailer";

export type ContactEmailInput = {
  fullName: string;
  organization: string;
  role: string;
  email: string;
  phone?: string | null;
  interests: string[];
  message: string;
};

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: requiredEnv("SMTP_USER"),
      pass: requiredEnv("SMTP_PASS"),
    },
  });

  return transporter;
}

export async function sendMail(options: SendMailOptions) {
  const from = process.env.SMTP_FROM?.trim() || requiredEnv("SMTP_USER");
  return getTransporter().sendMail({
    from,
    ...options,
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendContactEmail(input: ContactEmailInput) {
  const to = process.env.CONTACT_TO?.trim() || requiredEnv("SMTP_USER");
  const interests = input.interests.map((item) => escapeHtml(item)).join(", ");
  const phone = input.phone?.trim() || "—";

  const text = [
    "Nueva solicitud de contacto — SkillMente",
    "",
    `Nombre: ${input.fullName}`,
    `Organización: ${input.organization}`,
    `Rol: ${input.role}`,
    `Email: ${input.email}`,
    `Teléfono: ${phone}`,
    `Intereses: ${input.interests.join(", ")}`,
    "",
    "Mensaje:",
    input.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#2c3649">
      <h2 style="margin:0 0 16px">Nueva solicitud de contacto</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(input.fullName)}</p>
      <p><strong>Organización:</strong> ${escapeHtml(input.organization)}</p>
      <p><strong>Rol:</strong> ${escapeHtml(input.role)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Intereses:</strong> ${interests}</p>
      <p><strong>Mensaje:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>
    </div>
  `;

  return sendMail({
    to,
    replyTo: input.email,
    subject: `Contacto SkillMente — ${input.organization}`,
    text,
    html,
  });
}
