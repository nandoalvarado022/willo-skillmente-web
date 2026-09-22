import { z } from "zod";

export const INTEREST_KEYS = [
  "skillpath",
  "skillparenting",
  "pilot",
  "licensing",
  "ttt",
  "partnership",
  "other",
] as const;

export type InterestKey = (typeof INTEREST_KEYS)[number];

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactValidationMessages = {
  required: string;
  invalidEmail: string;
  selectInterest: string;
};

const defaultMessages: ContactValidationMessages = {
  required: "Required",
  invalidEmail: "Invalid email",
  selectInterest: "Select at least one interest",
};

export function createContactFormSchema(
  messages: ContactValidationMessages = defaultMessages,
) {
  return z.object({
    fullName: z.string().trim().min(1, messages.required),
    organization: z.string().trim().min(1, messages.required),
    role: z.string().trim().min(1, messages.required),
    email: z
      .string()
      .trim()
      .min(1, messages.required)
      .regex(EMAIL_REGEX, messages.invalidEmail),
    phone: z.string().trim().optional().default(""),
    interests: z
      .array(z.enum(INTEREST_KEYS))
      .min(1, messages.selectInterest),
    message: z.string().trim().min(1, messages.required),
  });
}

export const contactFormSchema = createContactFormSchema();

export type ContactFormPayload = z.infer<typeof contactFormSchema>;

export type ContactFormField =
  | "fullName"
  | "organization"
  | "role"
  | "email"
  | "interests"
  | "message";

export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

export function mapContactFormErrors(
  error: z.ZodError,
): ContactFormErrors {
  const next: ContactFormErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (
      key === "fullName" ||
      key === "organization" ||
      key === "role" ||
      key === "email" ||
      key === "interests" ||
      key === "message"
    ) {
      if (!next[key]) next[key] = issue.message;
    }
  }
  return next;
}
