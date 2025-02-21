import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactForm {
  name: string;
  email: string;
  company?: string;
  services: string;
  leadSource: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const data = await req.json() as ContactForm;
    
    // Validate required fields
    if (!data.name || !data.email || !data.services || !data.leadSource) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${data.name}" <${data.email}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: "New Inquiry from Website",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        <p><strong>Inquiry:</strong> ${data.services}</p>
        <p><strong>Lead Source:</strong> ${data.leadSource}</p>
        ${data.message ? `<p><strong>Additional Message:</strong> ${data.message}</p>` : ''}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
} 