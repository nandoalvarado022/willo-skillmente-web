"use client";

import { FormEvent, useState } from "react";
import { submitContactForm } from "@/lib/contact-api";
import {
  INTEREST_KEYS,
  createContactFormSchema,
  mapContactFormErrors,
  type ContactFormErrors,
  type InterestKey,
} from "@/lib/contact-schema";

export type ContactFormLabels = {
  fullName: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  interests: string;
  interestOptions: Record<InterestKey, string>;
  message: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  required: string;
  invalidEmail: string;
  selectInterest: string;
};

export type ContactFormStatus = "idle" | "sending" | "success" | "error";

export { INTEREST_KEYS };
export type { InterestKey };

export function useContactForm(labels: ContactFormLabels) {
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [interests, setInterests] = useState<InterestKey[]>([]);

  function toggleInterest(key: InterestKey) {
    setInterests((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);

    const payload = {
      fullName: String(formData.get("fullName") || ""),
      organization: String(formData.get("organization") || ""),
      role: String(formData.get("role") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      interests,
      message: String(formData.get("message") || ""),
    };

    const schema = createContactFormSchema({
      required: labels.required,
      invalidEmail: labels.invalidEmail,
      selectInterest: labels.selectInterest,
    });

    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      setErrors(mapContactFormErrors(parsed.error));
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      await submitContactForm(parsed.data);
      setStatus("success");
      formEl.reset();
      setInterests([]);
    } catch {
      setStatus("error");
    }
  }

  return {
    status,
    errors,
    interests,
    toggleInterest,
    handleSubmit,
  };
}
