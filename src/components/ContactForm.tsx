"use client";

import { FormEvent, useState } from "react";

const INTEREST_KEYS = [
  "skillpath",
  "skillparenting",
  "pilot",
  "licensing",
  "ttt",
  "partnership",
  "other",
] as const;

type InterestKey = (typeof INTEREST_KEYS)[number];

type ContactFormProps = {
  labels: {
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
};

type FormErrors = Partial<Record<"fullName" | "organization" | "role" | "email" | "interests" | "message", string>>;

export function ContactForm({ labels }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [interests, setInterests] = useState<InterestKey[]>([]);

  function toggleInterest(key: InterestKey) {
    setInterests((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  }

  function validate(form: FormData): FormErrors {
    const next: FormErrors = {};
    const fullName = String(form.get("fullName") || "").trim();
    const organization = String(form.get("organization") || "").trim();
    const role = String(form.get("role") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!fullName) next.fullName = labels.required;
    if (!organization) next.organization = labels.required;
    if (!role) next.role = labels.required;
    if (!email) next.email = labels.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = labels.invalidEmail;
    if (interests.length === 0) next.interests = labels.selectInterest;
    if (!message) next.message = labels.required;

    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const payload = {
        fullName: String(formData.get("fullName")),
        organization: String(formData.get("organization")),
        role: String(formData.get("role")),
        email: String(formData.get("email")),
        phone: String(formData.get("phone") || ""),
        interests,
        message: String(formData.get("message")),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      formEl.reset();
      setInterests([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="surface-card p-6 sm:p-8">
        <h3 className="font-sans text-xl font-bold text-brand-navy">{labels.successTitle}</h3>
        <p className="mt-2 text-muted">{labels.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface-card space-y-5 p-6 sm:p-8" noValidate>
      <Field
        id="fullName"
        label={labels.fullName}
        error={errors.fullName}
        required
      />
      <Field
        id="organization"
        label={labels.organization}
        error={errors.organization}
        required
      />
      <Field id="role" label={labels.role} error={errors.role} required />
      <Field
        id="email"
        label={labels.email}
        type="email"
        error={errors.email}
        required
      />
      <Field id="phone" label={labels.phone} type="tel" />

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-brand-navy">
          {labels.interests}
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {INTEREST_KEYS.map((key) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--brand-navy)_12%,transparent)] bg-brand-cream/50 px-3 py-2.5 text-sm"
            >
              <input
                type="checkbox"
                checked={interests.includes(key)}
                onChange={() => toggleInterest(key)}
                className="accent-[var(--brand-orange)]"
              />
              {labels.interestOptions[key]}
            </label>
          ))}
        </div>
        {errors.interests ? (
          <p className="mt-2 text-sm text-brand-orange">{errors.interests}</p>
        ) : null}
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-brand-navy">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded-xl border border-[color-mix(in_srgb,var(--brand-navy)_18%,transparent)] bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-[var(--ring)]"
          required
        />
        {errors.message ? (
          <p className="mt-2 text-sm text-brand-orange">{errors.message}</p>
        ) : null}
      </div>

      {status === "error" ? (
        <div className="rounded-xl bg-brand-orange/10 px-4 py-3 text-sm text-brand-navy">
          <p className="font-semibold">{labels.errorTitle}</p>
          <p>{labels.errorBody}</p>
        </div>
      ) : null}

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? labels.sending : labels.submit}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required = false,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-brand-navy">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-xl border border-[color-mix(in_srgb,var(--brand-navy)_18%,transparent)] bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-[var(--ring)]"
      />
      {error ? <p className="mt-2 text-sm text-brand-orange">{error}</p> : null}
    </div>
  );
}
