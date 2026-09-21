"use client";

import {
  INTEREST_KEYS,
  useContactForm,
  type ContactFormLabels,
} from "@/hooks/useContactForm";

type ContactFormProps = {
  labels: ContactFormLabels;
};

export function ContactForm({ labels }: ContactFormProps) {
  const { status, errors, interests, toggleInterest, handleSubmit } =
    useContactForm(labels);

  if (status === "success") {
    return (
      <div className="surface-card p-6 sm:p-8">
        <h3 className="font-sans text-xl font-bold text-brand-navy">
          {labels.successTitle}
        </h3>
        <p className="mt-2 text-muted">{labels.successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="surface-card space-y-5 p-6 sm:p-8"
      noValidate
    >
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
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-brand-navy"
        >
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

      <button
        type="submit"
        className="btn btn-primary w-full sm:w-auto"
        disabled={status === "sending"}
      >
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
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-brand-navy"
      >
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
