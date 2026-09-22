import type { ContactFormPayload } from "@/lib/contact-schema";

export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }
}
