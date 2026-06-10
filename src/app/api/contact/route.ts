import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, phone, message, captchaToken } = await req.json();

    // Validate inputs
    if (!name?.trim() || !company?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/\s/g, "");
    if (!/^\d{10}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Invalid 10-digit phone number" },
        { status: 400 }
      );
    }

    if (!captchaToken) {
      return NextResponse.json(
        { error: "reCAPTCHA verification is required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.CAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    });

    const verifyData = await verifyResponse.json();
    if (!verifyData.success) {
      console.error("reCAPTCHA validation failed:", verifyData);
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("contact")
      .insert({
        name: name.trim(),
        company: company.trim(),
        email: email.trim(),
        phone: cleanPhone,
        message: message.trim(),
      })
      .select("id")
      .single();

    if (error) {
      console.error("Error inserting contact enquiry:", error);
      return NextResponse.json(
        { error: "Failed to save enquiry to database" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
