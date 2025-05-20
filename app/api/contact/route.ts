import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.CONTACT_EMAIL,
      subject: `Perfect Strands | Contact Form Submission from ${name}`,
      text: message,
    });

    return NextResponse.json({success:true,message:"Message sent successfully!"});
  } catch (error) {
    console.log(`Error sending email: ${error}`);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
