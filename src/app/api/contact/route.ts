import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  fullName?: string;
  organization?: string;
  role?: string;
  email?: string;
  phone?: string;
  interests?: string[];
  message?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { fullName, organization, role, email, interests, message } = body;

    if (!fullName || !organization || !role || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    if (!Array.isArray(interests) || interests.length === 0) {
      return NextResponse.json({ ok: false, error: "Select at least one interest" }, { status: 400 });
    }

    // Placeholder for email delivery integration (Resend, SES, etc.)
    console.info("[SkillMente contact]", {
      fullName,
      organization,
      role,
      email,
      phone: body.phone || null,
      interests,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
