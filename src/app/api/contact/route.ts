import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid contact payload", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    await sendContactEmail({
      fullName: data.fullName,
      organization: data.organization,
      role: data.role,
      email: data.email,
      phone: data.phone || null,
      interests: data.interests,
      message: data.message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[SkillMente contact] failed to send email", error);
    return NextResponse.json(
      { ok: false, error: "Unable to send message" },
      { status: 500 },
    );
  }
}
